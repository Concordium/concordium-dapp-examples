import { useMemo, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import * as constants from '@/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert } from '@/components/Alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChangeItem, CreateItem, getItemCreatedEvent, getItemStatusChangedEvents } from '@/lib/itemEvents';
import { bytesToObject, getPinataData, parseCoordinates, ToTokenIdU64 } from '@/lib/utils';
import { MapContainer, TileLayer, CircleMarker, Popup, Polyline, Circle } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { PinataSDK } from 'pinata';
import { getItemState } from '@/track_and_trace_contract';

interface Props {
    pinata: PinataSDK;
}

export function Explorer(props: Props) {
    const { pinata } = props;

    interface FormType {
        itemID: string;
    }
    const form = useForm<FormType>({ mode: 'all', defaultValues: { itemID: '' } });

    const [error, setError] = useState<string | undefined>(undefined);

    const [itemChanged, setItemChanged] = useState<ChangeItem[] | undefined>(undefined);
    const [itemCreated, setItemCreated] = useState<CreateItem | undefined>(undefined);

    const [productImageUrl, setProductImageUrl] = useState<string | undefined>(undefined);
    const tracePath = useMemo<LatLngExpression[] | undefined>(() => {
        if (!itemCreated) {
            return;
        }
        const coordinates: LatLngExpression[] = [];

        if (itemCreated.additional_data.bytes.length > 0) {
            const locationRaw = bytesToObject<{ location: string | undefined }>(itemCreated.additional_data.bytes).location
            if (locationRaw) {
                coordinates.push(parseCoordinates(locationRaw));
            }
        }
        
        if (itemChanged && itemChanged.length > 0) {
            itemChanged.forEach((item) => {
                if (item.additional_data.bytes.length > 0) {
                    const locationRaw = bytesToObject<{ location: string | undefined }>(item.additional_data.bytes).location
                    if (locationRaw) {
                        coordinates.push(parseCoordinates(locationRaw));
                    }
                }
            });
        }
        return coordinates;
    }, [itemChanged, itemCreated]);

    async function onSubmit(values: FormType) {
        setError(undefined);
        setItemChanged(undefined);
        setItemCreated(undefined);

        if (values.itemID === '') {
            setError(`'itemID' input field is undefined`);
            throw Error(`'itemID' input field is undefined`);
        }
        try {
            await getItemCreatedEvent(Number(values.itemID), setItemCreated);
            await getItemStatusChangedEvents(Number(values.itemID), setItemChanged);

            const itemState = await getItemState(ToTokenIdU64(Number(values.itemID)));

            if (itemState.metadata_url.type === 'Some') {
                const metadata = await getPinataData(itemState.metadata_url.content.url, pinata);
                if (metadata && !(metadata instanceof Blob) && metadata.imageUrl) {
                    const imageData = await getPinataData(metadata.imageUrl as string, pinata);
                    if (imageData instanceof Blob) {
                        const blobUrl = URL.createObjectURL(imageData);
                        setProductImageUrl(blobUrl);
                    }
                }
            }
        } catch (error) {
            setError(`Couldn't get data from database. Orginal error: ${(error as Error).message}`);
        }
    }

    return (
        <div className="h-full w-full flex flex-col items-center py-16 px-2">
            <Card className="w-full max-w-md mb-4">
                <CardHeader>
                    <CardTitle>Track The Journey Of Your Products</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                            <FormField
                                control={form.control}
                                name="itemID"
                                rules={{ required: 'Item ID is required' }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Item ID</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Enter the tracking number ID"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className='min-w-24'>Search</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <div className="fixed bottom-4">{error && <Alert destructive title="Error" description={error} />}</div>
            {itemChanged !== undefined && itemCreated !== undefined && (
                <div className="grid md:grid-cols-2 gap-1 w-full max-w-2xl p-2 border rounded-lg">
                    <div className="relative border rounded-lg">
                        {productImageUrl ? (
                            <img src={productImageUrl} alt="product-image" className="h-60 mx-auto" crossOrigin="anonymous" />
                        ) : (
                            <div className="h-full flex items-center justify-center">
                                <p className="text-[0.8rem] text-muted-foreground">No product images avalaible.</p>
                            </div>
                        )}
                    </div>
                    <div className="relative border rounded-lg">
                        {tracePath && tracePath.length > 0 ? (
                            <MapContainer center={tracePath.at(-1)!} zoom={8} className="h-60">
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Circle center={tracePath.at(0)!} pathOptions={{ fillColor: 'green' }} radius={20} />
                                <CircleMarker center={tracePath.at(0)!} pathOptions={{ color: 'green' }} radius={20}>
                                    <Popup>Origin</Popup>
                                </CircleMarker>
                                <Circle center={tracePath.at(-1)!} pathOptions={{ fillColor: 'red' }} radius={20} />
                                <CircleMarker center={tracePath.at(-1)!} pathOptions={{ color: 'red' }} radius={20}>
                                    <Popup>Current</Popup>
                                </CircleMarker>
                                <Polyline pathOptions={{ color: 'blue' }} positions={tracePath} />
                            </MapContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center">
                                <p className="text-[0.8rem] text-muted-foreground">No tracking locations avalaible.</p>
                            </div>
                        )}
                    </div>
                    <div className="md:col-span-2 border-t mt-2">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Timestamp</TableHead>
                                    <TableHead>Transaction Hash</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">
                                        {new Date(itemCreated.block_time).toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        <a
                                            className="link"
                                            target="_blank"
                                            rel="noreferrer"
                                            href={`${constants.CCD_EXPLORER_URL}/transaction/${itemCreated.transaction_hash}`}
                                        >
                                            {itemCreated.transaction_hash.slice(0, 5)}...
                                            {itemCreated.transaction_hash.slice(-5)}
                                        </a>
                                    </TableCell>
                                    <TableCell>{itemCreated.initial_status}</TableCell>
                                </TableRow>

                                {itemChanged.map((event, parentIndex) => (
                                    <TableRow key={parentIndex}>
                                        <TableCell className="font-medium">
                                            {new Date(event.block_time).toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            <a
                                                className="link"
                                                target="_blank"
                                                rel="noreferrer"
                                                href={`${constants.CCD_EXPLORER_URL}/transaction/${event.transaction_hash}`}
                                            >
                                                {event.transaction_hash.slice(0, 5)}...
                                                {event.transaction_hash.slice(-5)}
                                            </a>
                                        </TableCell>
                                        <TableCell>{event.new_status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}
        </div>
    );
}

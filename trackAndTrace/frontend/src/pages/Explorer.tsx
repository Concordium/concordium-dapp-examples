import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as constants from '../constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert } from '@/components/Alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChangeItem, CreateItem, getItemCreatedEvent, getItemStatusChangedEvents } from '@/lib/itemEvents';
import { bytesToObject, getPinataSignedUrl, parseCoordinates, ToTokenIdU64 } from '@/lib/utils';
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

    const [productImageSignedUrl, setProductImageSignedUrl] = useState<string | undefined>(undefined);
    const tracePath = useMemo<LatLngExpression[] | undefined>(() => {
        if (!itemCreated) {
            return;
        }
        const coordinates: LatLngExpression[] = [];
        coordinates.push(
            parseCoordinates(bytesToObject<{ location: string }>(itemCreated.additional_data.bytes).location),
        );
        if (itemChanged && itemChanged.length > 0) {
            itemChanged.forEach((item) => {
                coordinates.push(
                    parseCoordinates(bytesToObject<{ location: string }>(item.additional_data.bytes).location),
                );
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
                const imageSignedUrl = await getPinataSignedUrl(itemState.metadata_url.content.url, pinata);
                setProductImageSignedUrl(imageSignedUrl);
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
                        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                            <div className="flex justify-end mt-4">
                                <Button type="submit">Search</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <div className="fixed bottom-4">{error && <Alert destructive title="Error" description={error} />}</div>
            {itemChanged !== undefined && itemCreated !== undefined && (
                <div className="grid md:grid-cols-2 gap-1 w-full max-w-2xl p-2 border rounded-lg">
                    <div className="relative border rounded-lg">
                        {productImageSignedUrl ? (
                            <img src={productImageSignedUrl} alt="" className="h-60 mx-auto" crossOrigin="anonymous" />
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
                                            href={`${constants.CCD_SCAN_URL}/?dcount=1&dentity=transaction&dhash=${itemCreated.transaction_hash}`}
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
                                                href={`${constants.CCD_SCAN_URL}/?dcount=1&dentity=transaction&dhash=${event.transaction_hash}`}
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

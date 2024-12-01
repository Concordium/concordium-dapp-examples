import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { WalletConnection } from '@concordium/wallet-connectors';
import { AccountAddress } from '@concordium/web-sdk';

import { TxHashLink } from '@/components/CCDScanLinks';
import { addRole, removeRole, getAddressesByRole } from '../track_and_trace_contract';
import * as TrackAndTraceContract from '../../generated/module_track_and_trace';
import { validateAccountAddress } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert } from '@/components/Alert';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ReturnValueGetAddressesByRole } from '../../generated/module_track_and_trace';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LucideTrash } from 'lucide-react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

interface Props {
    connection: WalletConnection | undefined;
    accountAddress: string | undefined;
    activeConnectorError: string | undefined;
}

export function AdminChangeRoles(props: Props) {
    const { connection, accountAddress, activeConnectorError } = props;

    interface FormType {
        address: string;
    }
    const form = useForm<FormType>({
        mode: 'all',
        defaultValues: {
            address: '',
        },
    });

    const [txHash, setTxHash] = useState<string | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);
    const [currentAdmins, setCurrentAdmins] = useState<ReturnValueGetAddressesByRole | undefined>();

    useEffect(() => {
        const parameter: TrackAndTraceContract.GetAddressesByRoleParameter = { type: 'Admin' };
        getAddressesByRole(parameter)
            .then((result) => {
                setCurrentAdmins(result);
            })
            .catch((e) => {
                setError((e as Error).message);
            });
    }, []);

    function handleRemoveRole(address: string) {
        const parameter: TrackAndTraceContract.RevokeRoleParameter = {
            address: { type: 'Account', content: AccountAddress.fromBase58(address) },
            role: { type: 'Admin' },
        };

        if (accountAddress && connection) {
            // Send transaction
            removeRole(connection, AccountAddress.fromBase58(accountAddress), parameter)
                .then((txHash: string) => {
                    setTxHash(txHash);
                })
                .catch((e) => {
                    setError((e as Error).message);
                });
        } else {
            setError(`Wallet is not connected. Click 'Connect Wallet' button.`);
        }
    }
    function onSubmit(values: FormType) {
        setError(undefined);

        if (values.address === '') {
            setError(`'address' input field is undefined`);
            throw Error(`'address' input field is undefined`);
        }

        const parameter: TrackAndTraceContract.RevokeRoleParameter = {
            address: { type: 'Account', content: AccountAddress.fromBase58(values.address) },
            role: { type: 'Admin' },
        };

        if (accountAddress && connection) {
            // Send transaction
            addRole(connection, AccountAddress.fromBase58(accountAddress), parameter)
                .then((txHash: string) => {
                    setTxHash(txHash);
                })
                .catch((e) => {
                    setError((e as Error).message);
                });
        } else {
            setError(`Wallet is not connected. Click 'Connect Wallet' button.`);
        }
    }
    return (
        <div className="h-full w-full flex flex-col items-center py-16 px-2">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Grant Admin Role to an Address</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="address"
                                rules={{ required: 'Address is required', validate: validateAccountAddress }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="4bbdAUCDK2D6cUvUeprGr4FaSaHXKuYmYVjyCa4bXSCu3NUXzA"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end mt-4">
                                <Button type="submit">Add</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <Table className="max-w-2xl mx-auto mt-8 border-t">
                <TableHeader>
                    <TableRow>
                        <TableHead className="flex-1">Address</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentAdmins ? (
                        currentAdmins.map((admin, parentIndex) => (
                            <TableRow key={parentIndex}>
                                <TableCell>
                                    <p>{admin.content.toString()}</p>
                                </TableCell>
                                <TableCell>
                                    <Dialog>
                                        <DialogTrigger>
                                            <Button>
                                                <LucideTrash />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Are you sure?</DialogTitle>
                                                <DialogDescription className="py-4">
                                                    {`This will revoke Admin role to the account ${admin.content.toString()}.`}
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <DialogClose className="space-x-2">
                                                    <Button>Cancel</Button>
                                                    <Button
                                                        className="bg-blue-500"
                                                        onClick={() => handleRemoveRole(admin.content.toString())}
                                                    >
                                                        Confirm
                                                    </Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <p>No admins found.</p>
                    )}
                </TableBody>
            </Table>
            <div className="fixed bottom-4">
                {error && <Alert destructive title="Error" description={error} />}
                {activeConnectorError && (
                    <Alert
                        destructive
                        title="Connect Error"
                        description={
                            <>
                                <p>{activeConnectorError}</p>
                                <p>Refresh page if you have the browser wallet installed.</p>
                            </>
                        }
                    />
                )}
                {txHash && <Alert title="Transaction Result" description={<TxHashLink txHash={txHash} />} />}
            </div>
        </div>
    );
}

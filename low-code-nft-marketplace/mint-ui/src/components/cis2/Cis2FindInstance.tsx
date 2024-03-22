import { Cis2ContractInfo } from 'common-ui';

import React, { FormEvent, useState } from 'react';

import { CIS0, cis0Supports, ConcordiumGRPCClient, ContractAddress } from '@concordium/web-sdk';
import { Button, Stack, TextField, Typography } from '@mui/material';

function Cis2FindInstance(props: {
    grpcClient: ConcordiumGRPCClient;
    contractInfo: Cis2ContractInfo;
    address?: ContractAddress;
    onDone: (address: ContractAddress) => void;
}) {
    const [state, setState] = useState({
        error: '',
        checking: false,
    });
    const [form, setForm] = useState({
        index: props.address?.index.toString() ?? '0',
        subindex: props.address?.subindex.toString() ?? '0',
    });

    function setFormValue(key: string, value: string) {
        setForm({ ...form, [key]: value });
    }

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setState({ ...state, error: '', checking: true });

        const index = BigInt(form.index);
        const subindex = BigInt(form.subindex);

        if (!(index >= 0)) {
            setState({ ...state, error: 'Invalid Contract Index' });
            return;
        }

        if (!(subindex >= 0)) {
            setState({ ...state, error: 'Invalid Contract Subindex' });
            return;
        }

        const address = { index, subindex };
        props.grpcClient
            .getInstanceInfo(address)
            .then(() => cis0Supports(props.grpcClient, address, 'CIS-2'))
            .then((supports) => {
                if (!supports) {
                    setState({ ...state, checking: false, error: 'Could not check if contract supports CIS-2' });
                    return;
                }

                switch (supports?.type) {
                    case CIS0.SupportType.Support:
                        setState({ ...state, checking: false, error: '' });
                        props.onDone(address);
                        break;
                    case CIS0.SupportType.SupportBy:
                    case CIS0.SupportType.NoSupport:
                        setState({ ...state, checking: false, error: 'Contract does not support CIS-2' });
                        break;
                }
            })
            .catch((e: Error) => {
                setState({ ...state, checking: false, error: e.message });
            });
    }

    return (
        <Stack component={'form'} spacing={2} onSubmit={submit} autoComplete={'true'}>
            <TextField
                id="contract-index"
                name="contractIndex"
                label="Contract Index"
                variant="standard"
                type={'number'}
                value={form.index.toString()}
                onChange={(e) => setFormValue('index', e.target.value)}
                disabled={state.checking}
            />
            <TextField
                id="contract-subindex"
                name="contractSubindex"
                label="Contract Sub Index"
                variant="standard"
                type={'number'}
                disabled={state.checking}
                value={form.subindex.toString()}
                onChange={(e) => setFormValue('subindex', e.target.value)}
            />
            {state.error && (
                <Typography component="div" color="error">
                    {state.error}
                </Typography>
            )}
            {state.checking && <Typography component="div">Checking..</Typography>}
            <Button
                type="submit"
                variant="contained"
                disabled={state.checking}
                fullWidth
                size="large"
                sx={{ maxWidth: '100px' }}
            >
                Find
            </Button>
        </Stack>
    );
}

export default Cis2FindInstance;

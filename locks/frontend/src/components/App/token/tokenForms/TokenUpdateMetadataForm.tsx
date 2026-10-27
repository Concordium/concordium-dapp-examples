import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { OperationType, TokenOperationType } from '@concordium/web-sdk';
import { useForm } from 'react-hook-form';

import { ErrorMessage } from '../../components/ErrorMessage.tsx';
import { FormCard } from '../../components/FormCard.tsx';
import { SubmitButton } from '../../components/SubmitButton.tsx';
import { TextInput } from '../../components/TextInput.tsx';
import { tokenIdExistsValidation } from '../../lock/validation.ts';
import { defaultStatus, operationTitle, parseError, requireValue, toHexBytes, toTokenId } from '../../utils.ts';

import type { LookupContext, Status } from '../../types.ts';

interface TokenUpdateMetadataState {
    tokenId: string;
    metadataUrl: string;
    metadataChecksum: string;
}

const blankTokenUpdateMetadataState: TokenUpdateMetadataState = {
    tokenId: '',
    metadataUrl: '',
    metadataChecksum: '',
};

export function TokenUpdateMetadataForm({ context }: { context: LookupContext }) {
    const [status, setStatus] = useState<Status>(defaultStatus);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TokenUpdateMetadataState>({ defaultValues: blankTokenUpdateMetadataState });

    const submit = handleSubmit((state) => {
        setStatus({ type: 'loading', message: 'Adding operation...' });

        try {
            const tokenId = requireValue(state.tokenId, 'Token ID');
            const metadataUrl = requireValue(state.metadataUrl, 'Metadata URL');
            const metadataChecksum = state.metadataChecksum;

            toHexBytes(metadataChecksum);

            context.addOperation({
                type: operationTitle(TokenOperationType.UpdateMetadata),
                preview: [
                    { label: 'Token ID', value: tokenId },
                    { label: 'Metadata URL', value: metadataUrl },
                    { label: 'Checksum', value: metadataChecksum || '-' },
                ],
                build: () => {
                    return {
                        [OperationType.TokenUpdateMetadata]: {
                            url: metadataUrl,
                            ...(metadataChecksum ? { checksumSha256: toHexBytes(metadataChecksum) } : {}),
                            token: toTokenId(tokenId),
                        },
                    };
                },
            });

            setStatus(defaultStatus);
        } catch (caughtError) {
            setStatus({ type: 'error', message: parseError(caughtError) });
        }
    });

    return (
        <FormCard title={operationTitle(TokenOperationType.UpdateMetadata)} className="token-operation-card">
            <Form onSubmit={submit}>
                <TextInput
                    label="Token ID"
                    registration={register('tokenId', tokenIdExistsValidation(context))}
                    error={errors.tokenId?.message}
                />
                <TextInput
                    label="Metadata URL"
                    registration={register('metadataUrl', { required: 'Metadata URL is required' })}
                    error={errors.metadataUrl?.message}
                />
                <TextInput
                    label="Metadata checksum"
                    placeholder="Optional 32-byte hex"
                    registration={register('metadataChecksum', {
                        validate: (value) => {
                            try {
                                toHexBytes(value);
                                return true;
                            } catch (caughtError) {
                                return parseError(caughtError);
                            }
                        },
                    })}
                    error={errors.metadataChecksum?.message}
                />
                <ErrorMessage message={status.type === 'error' ? status.message : undefined} />
                <SubmitButton loading={status.type === 'loading'} isSubmitting={isSubmitting}>
                    Add
                </SubmitButton>
            </Form>
        </FormCard>
    );
}

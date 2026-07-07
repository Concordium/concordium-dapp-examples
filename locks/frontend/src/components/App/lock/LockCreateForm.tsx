import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { CborEpoch, LockController, MetaUpdateOperationType, TransactionExpiry } from '@concordium/web-sdk';
import { useForm } from 'react-hook-form';

import { FormCard } from '../components/FormCard';
import { ErrorMessage } from '../components/ErrorMessage';
import { MemoInput } from '../components/MemoInput';
import { RepeatableTextList } from '../components/RepeatableTextList';
import { RoleCheckboxes } from '../components/RoleCheckboxes';
import { TextInput } from '../components/TextInput';
import { blankLockCreateState, LOCK_ROLES } from '../constants';
import {
    commaList,
    expiryDateTimeToFutureMinutes,
    formatDateTimePreview,
    getCurrentDateTimeInputValue,
    operationTitle,
    optionalMemo,
    parseError,
    toCborAccount,
    toTokenId,
} from '../utils';
import {
    accountListExistsValidation,
    controllerGrantAccountsExistValidation,
    supportedTokenIdsExistValidation,
} from './validation';

import type { ControllerGrantForm, LockCreateState, LookupContext } from '../types';

export function LockCreateForm({ context }: { context: LookupContext }) {
    const { connectedAccount, addOperation, getAccountInfo, getEstimatedLockId, getTokenInfo } = context;
    const [error, setError] = useState('');
    const {
        register,
        handleSubmit,
        watch,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<LockCreateState>({
        defaultValues: blankLockCreateState(connectedAccount),
    });

    const state = watch();

    useEffect(() => {
        register(
            'recipients',
            accountListExistsValidation(
                { getAccountInfo },
                'At least one recipient account is required',
                () => !getValues('anyRecipient'),
            ),
        );
        register('controllerGrants', controllerGrantAccountsExistValidation({ getAccountInfo }));
        register('supportedTokens', supportedTokenIdsExistValidation({ getTokenInfo }));
    }, [getAccountInfo, getTokenInfo, getValues, register]);

    useEffect(() => {
        const controllerGrants = getValues('controllerGrants');
        const firstGrant = controllerGrants[0];
        if (!connectedAccount || firstGrant?.account) {
            return;
        }

        setValue(
            'controllerGrants',
            [{ account: connectedAccount, roles: [...LOCK_ROLES] }, ...controllerGrants.slice(1)],
            { shouldDirty: true, shouldValidate: true },
        );
    }, [connectedAccount, getValues, setValue]);

    const updateGrant = (index: number, grant: ControllerGrantForm) => {
        setValue(
            'controllerGrants',
            state.controllerGrants.map((item, currentIndex) => (currentIndex === index ? grant : item)),
            { shouldDirty: true, shouldValidate: true },
        );
    };

    const addGrant = () => {
        setValue('controllerGrants', [...state.controllerGrants, { account: '', roles: [] }], {
            shouldDirty: true,
            shouldValidate: true,
        });
    };

    const removeGrant = (index: number) => {
        setValue(
            'controllerGrants',
            state.controllerGrants.length === 1
                ? [{ account: '', roles: [] }]
                : state.controllerGrants.filter((_, currentIndex) => currentIndex !== index),
            { shouldDirty: true, shouldValidate: true },
        );
    };

    const submit = handleSubmit(async (state) => {
        setError('');

        try {
            const expiryMinutes = expiryDateTimeToFutureMinutes(state.expiryDate);
            const estimatedLockId = await getEstimatedLockId();

            const recipientAccounts = state.recipients.map((recipient) => recipient.trim()).filter(Boolean);
            const recipients = state.anyRecipient ? 'any' : recipientAccounts.map(toCborAccount);

            if (!state.anyRecipient && recipients.length === 0) {
                throw new Error('At least one recipient is required');
            }

            const grants = state.controllerGrants.map((grant, index) => {
                if (!grant.roles.length) {
                    throw new Error(`Controller account ${index + 1} must have at least one role`);
                }

                return {
                    account: toCborAccount(grant.account),
                    roles: grant.roles,
                };
            });

            const supportedTokenIds = state.supportedTokens.map((tokenId) => tokenId.trim()).filter(Boolean);
            const supportedTokens = supportedTokenIds.map(toTokenId);
            if (!supportedTokens.length) {
                throw new Error('At least one supported token is required');
            }

            const previewRecipients = state.anyRecipient ? 'any' : commaList(recipientAccounts);
            const previewGrants = state.controllerGrants
                .map((grant) => `${grant.account || '-'}\n(${grant.roles.map(operationTitle).join(', ') || '-'})`)
                .join('\n; ');

            addOperation({
                type: 'LockCreate',
                preview: [
                    { label: 'Lock ID (estimated)', value: estimatedLockId },
                    { label: 'Recipients', value: previewRecipients },
                    { label: 'Expires at', value: formatDateTimePreview(state.expiryDate) },
                    { label: 'Controller grants', value: previewGrants },
                    { label: 'Supported tokens', value: commaList(supportedTokenIds) },
                    { label: 'Keep alive', value: state.keepAlive ? 'Yes' : 'No' },
                    { label: 'Memo', value: state.memo || '-' },
                ],
                build: () => ({
                    [MetaUpdateOperationType.LockCreate]: {
                        recipients,
                        expiry: CborEpoch.fromTransactionExpiry(TransactionExpiry.futureMinutes(expiryMinutes)),
                        controller: LockController.simpleV0(grants, supportedTokens, {
                            keepAlive: state.keepAlive,
                            memo: optionalMemo(state.memo),
                        }),
                    },
                }),
            });
        } catch (caughtError) {
            setError(parseError(caughtError));
        }
    });

    return (
        <FormCard title="Create lock (LockCreate)" className="lock-create-card">
            <Form onSubmit={submit}>
                <div className="lock-create-grid">
                    <div className="lock-create-column">
                        <section className="lock-create-group">
                            <h4>Recipients</h4>
                            <Form.Check
                                id="any-recipient"
                                label="Any recipient"
                                checked={state.anyRecipient}
                                onChange={(event) =>
                                    setValue('anyRecipient', event.target.checked, {
                                        shouldDirty: true,
                                        shouldValidate: true,
                                    })
                                }
                            />
                            <RepeatableTextList
                                label="Recipient accounts"
                                values={state.recipients}
                                placeholder="Account address"
                                disabled={state.anyRecipient}
                                onChange={(recipients) =>
                                    setValue('recipients', recipients, { shouldDirty: true, shouldValidate: true })
                                }
                            />
                            {errors.recipients?.message && (
                                <div className="invalid-feedback d-block">{errors.recipients.message}</div>
                            )}
                        </section>

                        <section className="lock-create-group">
                            <h4>Controllers</h4>
                            <div className="controller-list">
                                {state.controllerGrants.map((grant, index) => (
                                    <div key={index} className="controller-row">
                                        <Form.Label>Controller account</Form.Label>
                                        <div className="repeatable-row">
                                            <Form.Control
                                                value={grant.account}
                                                placeholder="Controller account"
                                                onChange={(event) =>
                                                    updateGrant(index, { ...grant, account: event.target.value })
                                                }
                                            />
                                            <Button type="button" variant="outline-secondary" onClick={addGrant}>
                                                +
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline-secondary"
                                                onClick={() => removeGrant(index)}
                                            >
                                                -
                                            </Button>
                                        </div>
                                        <Form.Label className="mt-2">Account roles</Form.Label>
                                        <RoleCheckboxes
                                            className="controller-roles"
                                            roles={LOCK_ROLES}
                                            selected={grant.roles}
                                            name={`lock-role-${index}`}
                                            onChange={(roles) => updateGrant(index, { ...grant, roles })}
                                        />
                                    </div>
                                ))}
                            </div>
                            {errors.controllerGrants?.message && (
                                <div className="invalid-feedback d-block">{errors.controllerGrants.message}</div>
                            )}
                        </section>
                    </div>

                    <div className="lock-create-column">
                        <section className="lock-create-group">
                            <h4>Date and time</h4>
                            <Form.Check
                                id="keep-alive"
                                label="Keep alive"
                                checked={state.keepAlive}
                                onChange={(event) =>
                                    setValue('keepAlive', event.target.checked, {
                                        shouldDirty: true,
                                        shouldValidate: true,
                                    })
                                }
                            />
                            <TextInput
                                label="Expiry date and time"
                                type="datetime-local"
                                min={getCurrentDateTimeInputValue()}
                                registration={register('expiryDate', {
                                    required: 'Expiry date and time is required',
                                    validate: (value) => {
                                        try {
                                            expiryDateTimeToFutureMinutes(value);
                                            return true;
                                        } catch (caughtError) {
                                            return parseError(caughtError);
                                        }
                                    },
                                })}
                                error={errors.expiryDate?.message}
                            />
                        </section>

                        <section className="lock-create-group">
                            <h4>Supported tokens</h4>
                            <RepeatableTextList
                                label="Token IDs"
                                values={state.supportedTokens}
                                placeholder="Token ID"
                                onChange={(supportedTokens) =>
                                    setValue('supportedTokens', supportedTokens, {
                                        shouldDirty: true,
                                        shouldValidate: true,
                                    })
                                }
                            />
                            {errors.supportedTokens?.message && (
                                <div className="invalid-feedback d-block">{errors.supportedTokens.message}</div>
                            )}
                            <MemoInput registration={register('memo')} />
                        </section>
                    </div>

                    <div className="lock-create-footer"></div>

                    <div className="lock-create-actions">
                        <ErrorMessage message={error} />
                        <Button type="submit">Add</Button>
                    </div>
                </div>
            </Form>
        </FormCard>
    );
}

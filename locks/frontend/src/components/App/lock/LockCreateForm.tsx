import { FormEvent, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { CborEpoch, LockController, MetaUpdateOperationType, TransactionExpiry } from '@concordium/web-sdk';

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

import type { ControllerGrantForm, LookupContext } from '../types';

export function LockCreateForm({
    connectedAccount,
    addOperation,
}: Pick<LookupContext, 'connectedAccount' | 'addOperation'>) {
    const [state, setState] = useState(() => blankLockCreateState(connectedAccount));
    const [error, setError] = useState('');

    useEffect(() => {
        setState((current) => {
            const firstGrant = current.controllerGrants[0];
            if (!connectedAccount || firstGrant?.account) {
                return current;
            }

            return {
                ...current,
                controllerGrants: [
                    { account: connectedAccount, roles: [...LOCK_ROLES] },
                    ...current.controllerGrants.slice(1),
                ],
            };
        });
    }, [connectedAccount]);

    const updateGrant = (index: number, grant: ControllerGrantForm) => {
        setState((current) => ({
            ...current,
            controllerGrants: current.controllerGrants.map((item, currentIndex) =>
                currentIndex === index ? grant : item,
            ),
        }));
    };

    const addGrant = () => {
        setState((current) => ({
            ...current,
            controllerGrants: [...current.controllerGrants, { account: '', roles: [] }],
        }));
    };

    const removeGrant = (index: number) => {
        setState((current) => ({
            ...current,
            controllerGrants:
                current.controllerGrants.length === 1
                    ? [{ account: '', roles: [] }]
                    : current.controllerGrants.filter((_, currentIndex) => currentIndex !== index),
        }));
    };

    const submit = (event: FormEvent) => {
        event.preventDefault();
        setError('');

        try {
            const expiryMinutes = expiryDateTimeToFutureMinutes(state.expiryDate);

            const recipients = state.anyRecipient
                ? 'any'
                : state.recipients.map((recipient) => toCborAccount(recipient)).filter(Boolean);

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

            const supportedTokens = state.supportedTokens.map(toTokenId);
            if (!supportedTokens.length) {
                throw new Error('At least one supported token is required');
            }

            const previewRecipients = state.anyRecipient ? 'any' : commaList(state.recipients);
            const previewGrants = state.controllerGrants
                .map((grant) => `${grant.account || '-'}\n(${grant.roles.map(operationTitle).join(', ') || '-'})`)
                .join('\n; ');

            addOperation({
                type: 'LockCreate',
                preview: [
                    { label: 'Recipients', value: previewRecipients },
                    { label: 'Expires at', value: formatDateTimePreview(state.expiryDate) },
                    { label: 'Controller grants', value: previewGrants },
                    { label: 'Supported tokens', value: commaList(state.supportedTokens) },
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
    };

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
                                    setState((current) => ({ ...current, anyRecipient: event.target.checked }))
                                }
                            />
                            <RepeatableTextList
                                label="Recipient accounts"
                                values={state.recipients}
                                placeholder="Account address"
                                disabled={state.anyRecipient}
                                onChange={(recipients) => setState((current) => ({ ...current, recipients }))}
                            />
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
                                    setState((current) => ({ ...current, keepAlive: event.target.checked }))
                                }
                            />
                            <TextInput
                                label="Expiry date and time"
                                type="datetime-local"
                                value={state.expiryDate}
                                min={getCurrentDateTimeInputValue()}
                                onChange={(expiryDate) => setState((current) => ({ ...current, expiryDate }))}
                            />
                        </section>

                        <section className="lock-create-group">
                            <h4>Supported tokens</h4>
                            <RepeatableTextList
                                label="Token IDs"
                                values={state.supportedTokens}
                                placeholder="Token ID"
                                onChange={(supportedTokens) => setState((current) => ({ ...current, supportedTokens }))}
                            />
                            <MemoInput
                                value={state.memo}
                                onChange={(memo) => setState((current) => ({ ...current, memo }))}
                            />
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

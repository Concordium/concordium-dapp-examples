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
import { commaList, operationTitle, optionalMemo, parseError, requireValue, toCborAccount, toTokenId } from '../utils';
import { LockCreateSubsection } from './LockCreateSubsection';

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
            const expiryMinutes = Number(requireValue(state.expiryMinutes, 'Expire in minutes'));
            if (!Number.isFinite(expiryMinutes) || expiryMinutes <= 0) {
                throw new Error('Expire in minutes must be a positive number');
            }

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
                .map((grant) => `${grant.account || '-'}: \n${grant.roles.map(operationTitle).join(', ') || '-'}`)
                .join('\n; ');

            addOperation({
                type: 'LockCreate',
                preview: [
                    { label: 'Recipients', value: previewRecipients },
                    { label: 'Expire in minutes', value: state.expiryMinutes },
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
        <FormCard title="LockCreate" className="lock-create-card">
            <Form onSubmit={submit}>
                <div className="lock-create-stack">
                    <LockCreateSubsection title="Recipients">
                        <div className="recipient-mode-toggle" role="group" aria-label="Recipient mode">
                            <Button
                                type="button"
                                variant={state.anyRecipient ? 'outline-secondary' : 'secondary'}
                                onClick={() => setState((current) => ({ ...current, anyRecipient: false }))}
                            >
                                Specific recipients
                            </Button>
                            <Button
                                type="button"
                                variant={state.anyRecipient ? 'secondary' : 'outline-secondary'}
                                onClick={() => setState((current) => ({ ...current, anyRecipient: true }))}
                            >
                                Any recipient
                            </Button>
                        </div>
                        {!state.anyRecipient && (
                            <RepeatableTextList
                                label="Recipient accounts"
                                values={state.recipients}
                                placeholder="Account address"
                                onChange={(recipients) => setState((current) => ({ ...current, recipients }))}
                            />
                        )}
                    </LockCreateSubsection>

                    <LockCreateSubsection title="Controllers">
                        <div className="controller-list">
                            {state.controllerGrants.map((grant, index) => (
                                <div key={index} className="controller-row">
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
                    </LockCreateSubsection>

                    <LockCreateSubsection title="Supported tokens">
                        <RepeatableTextList
                            label="Token IDs"
                            values={state.supportedTokens}
                            placeholder="Token ID"
                            onChange={(supportedTokens) => setState((current) => ({ ...current, supportedTokens }))}
                        />
                    </LockCreateSubsection>

                    <LockCreateSubsection title="Options">
                        <div className="lock-options-row">
                            <TextInput
                                label="Expire in minutes"
                                type="number"
                                value={state.expiryMinutes}
                                onChange={(expiryMinutes) => setState((current) => ({ ...current, expiryMinutes }))}
                            />
                            <Form.Check
                                type="checkbox"
                                id="keep-alive"
                                label="Keep alive"
                                checked={state.keepAlive}
                                onChange={(event) =>
                                    setState((current) => ({ ...current, keepAlive: event.target.checked }))
                                }
                            />
                            <MemoInput
                                value={state.memo}
                                onChange={(memo) => setState((current) => ({ ...current, memo }))}
                            />
                        </div>
                    </LockCreateSubsection>

                    <div className="lock-create-actions">
                        <ErrorMessage message={error} />
                        <Button type="submit">Add</Button>
                    </div>
                </div>
            </Form>
        </FormCard>
    );
}

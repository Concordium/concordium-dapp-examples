import { 
    ConcordiumGRPCClient, 
    ContractAddress, 
    ContractName, 
    deserializeTypeValue, 
    EntrypointName, 
    ReceiveName, 
    SmartContractTypeValues, 
    toBuffer 
} from '@concordium/web-sdk';
import { REGISTRY_CONTRACT_REGISTRY_METADATA_RETURN_VALUE_SCHEMA } from '../../constants';
import { useEffect, useState, ChangeEvent } from 'react';

export function parseIssuers(s: string): bigint[] {
    return s
        .split(',')
        .filter((x) => x.trim().length != 0)
        .map((x) => {
            try {
                return BigInt(parseInt(x));
            } catch (e) {
                return undefined;
            }
        })
        .filter((x) => x != undefined)
        .map((x) => x as bigint);
}

export function Issuers(
    indexes: string,
    client: ConcordiumGRPCClient
): [{ value: string; label: string }[], React.JSX.Element] {
    const issuers = parseIssuers(indexes);

    const [tags, setTags] = useState<{ value: string; label: string }[]>([
        { value: 'Dummy', label: 'Dummy value for testing' },
    ]);

    useEffect(() => {
        const fetchContracts = async () => {
            setTags([{ value: 'Dummy', label: 'Dummy value for testing' }]);
            for (let i = 0; i < issuers.length; i++) {
                const addr = { index: issuers[i], subindex: BigInt(0) };
                try {
                    const ci = await client.getInstanceInfo(ContractAddress.create(addr.index, addr.subindex));
                    const name = ContractName.fromInitName(ci.name);
                    const response = await client.invokeContract({
                        contract: ContractAddress.create(issuers[i], 0),
                        method: ReceiveName.create(name, EntrypointName.fromString('registryMetadata')),
                    });
                    switch (response.tag) {
                        case 'failure':
                            console.log(`Failed to get registry metadata for ${issuers[i]}`);
                            continue;
                        case 'success':
                            const metadata = deserializeTypeValue(
                                response.returnValue!.buffer,
                                toBuffer(REGISTRY_CONTRACT_REGISTRY_METADATA_RETURN_VALUE_SCHEMA, 'base64')
                            ) as {
                                [key: string]: SmartContractTypeValues;
                            };

                            const schema_url = metadata['credential_schema'] as { schema_ref: { url: string } };
                            console.log(schema_url.schema_ref.url);
                            const schema_response = await fetch(schema_url.schema_ref.url);
                            if (schema_response.ok) {
                                const schema = (await schema_response.json()) as {
                                    name: string;
                                    properties: {
                                        credentialSubject: {
                                            properties: {
                                                attributes: {
                                                    properties: object;
                                                };
                                            };
                                        };
                                    };
                                };
                                const attributes = schema.properties.credentialSubject.properties.attributes.properties;
                                Object.entries(attributes).map(([tag, v]) => {
                                    setTags((oldTags) => {
                                        if (
                                            oldTags.find(({ label }) => {
                                                return label == tag;
                                            })
                                        ) {
                                            return oldTags;
                                        } else {
                                            let { type } = v as { type: string };
                                            if (type === 'object') {
                                                type = (v as { properties: { type: { const: string } } }).properties
                                                    .type.const;
                                            }

                                            return [
                                                {
                                                    value: (v as { title: string }).title,
                                                    label: tag,
                                                    type,
                                                },
                                                ...oldTags,
                                            ];
                                        }
                                    });
                                });
                            } else {
                                console.log(`Unable to get schema from ${schema_url}`);
                            }
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        };

        fetchContracts().catch((err) => console.log(err));
    }, [indexes]);
    return [
        tags,
        <ul>
            {issuers.map((idx) => (
                <li> &lt;{idx.toString()},0&gt; </li>
            ))}
        </ul>,
    ];
}

export function IdentityProviders({ idps }: { idps: { name: string; id: number }[] }): [number[], React.JSX.Element[]] {
    const [checked, setChecked] = useState<number[]>([]);
    const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
        let updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, parseInt(event.target.value)];
        } else {
            updatedList.splice(checked.indexOf(parseInt(event.target.value)), 1);
        }
        setChecked(updatedList);
    };

    return [
        checked,
        idps.map(({ name, id }) => (
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    value={id}
                    id="flexCheckChecked"
                    onChange={handleCheck}
                    checked={checked.includes(id)}
                />
                <label className="form-check-label">{name}</label>
            </div>
        )),
    ];
}
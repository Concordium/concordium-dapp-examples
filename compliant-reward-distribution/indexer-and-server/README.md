## Compliant-Reward-Distribution Indexer And Server

There are two binaries in this project. An `indexer` that indexes data into a database and a `server` that provides API endpoints to post/get data to/from the database.

## Prerequisites

- `PostgreSQL` installed or running it in a docker container: https://www.postgresql.org/download/
-  A database connection to `PostgreSQL`: If you use the default connection `host=localhost dbname=indexer user=postgres password=password port=5432`, make sure you have created the database `indexer` as follows:

Open a terminal-based front-end to PostgreSQL:
```
sudo -u postgres psql
```

Create the `indexer` database:
```
CREATE DATABASE indexer;
```

Alternatively, you can run the Postgres database in a docker container. The command below will create an indexer db automatically:
```
docker run -p 5432:5432 -e POSTGRES_PASSWORD=password -e POSTGRES_DB="indexer" --rm postgres
```

## Build the `indexer` and `server`

To build the tools make sure you have the repository submodules initialized

```console
git submodule update --init --recursive
```

The tools can be built by running

```console
cargo build --release
```

This will produce two binaries (`indexer` and `server`) in the `target/release` directory.

# The `indexer` binary

It is a tool for indexing newly created accounts on Concordium into a postgres database. The database is configured with the tables from the file `../resources/schema.sql`. A table `settings` exists to store global configurations.

The global configurations are set when the indexer is started for the first time. Restarting the indexer will check if its current settings are compatible with the stored indexer settings to prevent corrupting the database. In addition, the settings can be queried by the frontend to check compatibility.

When the indexer is started for the first time, it will look up the current block height and start indexing from that block. When the indexer is re-started with the same database settings, it resumes indexing from the `latest_processed_block_height+1` as stored in the database.

All newly created accounts in a block are atomically added in one database transaction to postgres. This ensures a simple recovery process since we always process the complete block or roll back the database to the beginning of the block. In addition, the indexer has a re-try logic and will try to re-connect to the database pool and re-submit any failed database transaction.

## Run the `indexer`

```console
cargo run --bin indexer -- --node https://grpc.testnet.concordium.com:20000 --log-level debug
```

## Configure the `indexer`

There are a few options to configure the indexer:

- `--node (env: CCD_INDEXER_NODE)` is the endpoint to the Concordium node grpc v2 API. If not specified, the default value `https://grpc.testnet.concordium.com:20000` is used.

- `--db-connection (env: CCD_INDEXER_DB_CONNECTION)` should specify your postgreSQL database connection. If not specified, the default value `host=localhost dbname=indexer user=postgres password=password port=5432` is used.
Note: In production, you should use the environment variable and not pass the database connection containing a password via a command-line argument since the value could be read by other processes.

- `--log-level (env: CCD_INDEXER_LOG_LEVEL)` specifies the maximum log level. Possible values are: `trace`, `debug`, `info`, `warn`, and `error`. If not specified, the default value `info` is used.

You can open the help menu as follows:

```console
cargo run --bin indexer -- --help
```

# The `server` binary

The server has several endpoints to read/write from/to the database. The authorization to write data to the database is either granted by verifying a signature from an admin/user or by verifying a ZK proof from the user.

## Run the `server`

```console
cargo run --bin server -- --admin_accounts "47b6Qe2XtZANHetanWKP1PbApLKtS3AyiCtcXaqLMbypKjCaRw" --admin_accounts "4eDtVqZrkmcNEFziEMSs8S2anvkH5KnsYK4MhwedwGWK1pmjZe"
```

## Configure the `server`

There are a few options to configure the server:

- `--listen-address (env: CCD_SERVER_LISTEN_ADDRESS)` is the listen address where the server will be listen on. If not specified, the default value `0.0.0.0:8080` is used.

- `--db-connection (env: CCD_SERVER_DB_CONNECTION)` should specify your postgreSQL database connection. If not specified, the default value `host=localhost dbname=indexer user=postgres password=password port=5432` is used.
Note: In production, you should use the environment variable and not pass the database connection containing a password via a command-line argument since the value could be read by other processes.

- `--log-level (env: CCD_SERVER_LOG_LEVEL)` specifies the maximum log level. Possible values are: `trace`, `debug`, `info`, `warn`, and `error`. If not specified, the default value `info` is used.

- `--node (env: CCD_SERVER_NODE)` specifies the gRPC interface of a Concordium node, the default value `https://grpc.testnet.concordium.com:20000` is used.

- `--admin_accounts (env: CCD_SERVER_ADMIN_ACCOUNTS)` are allowed to read all data from the database and set the `claimed` flag in the database. Admin accounts have elevated permission and the flag can be re-used to set several admin accounts.

- `--claim_expiry_duration_days (env: CCD_SERVER_CLAIM_EXPIRY_DURATION_DAYS)` is the duration after creating a new account during which the account is eligible to claim the reward, the default value `60` is used.

You can open the help menu as follows:

```console
cargo run --bin server -- --help
```

## API endpoints of the `server`

- The `/api/getZKProofStatements` endpoint expects no JSON body.

An example response of this endpoint:
``` json
{
    "data": [
        {
            "type": "RevealAttribute",
            "attributeTag": "nationalIdNo"
        },
        {
            "type": "RevealAttribute",
            "attributeTag": "nationality"
        },
        {
            "type": "AttributeInRange",
            "attributeTag": "dob",
            "lower": "18000101",
            "upper": "20060802"
        },
        {
            "type": "AttributeNotInSet",
            "attributeTag": "countryOfResidence",
            "set": [
                "KP",
                "US"
            ]
        }
    ]
}
```

This endpoint needs no authorization and should be queried by the front end to get the ZK statements for the request to the wallet to create a ZK proof.

- The `/health` endpoint expects no JSON body.

An example response of this endpoint:
``` json
{
    "version":"0.1.0"
}
```

This endpoint needs no authorization and can be queried for monitoring purposes and to check the version of the server.

- The `/api/canClaim` endpoint expects a JSON body with the fields shown in the example below:

``` json
{
    "accountAddress": "3cGEB7tTdQBFxJ9sn5JyGPNay2MSmRSKm4133UVqmKoFg4MXJ1"
}
```

An example response of this endpoint:
``` json
{
    "data": {
        "claimed": false,
        "pendingApproval": false,
        "tweetValid": true,
        "zkProofValid": false
    }
}
```

This endpoint needs no authorization and can be queried by the front end to display the missing steps that the user has to complete before the reward is paid out.

- The `/api/getPendingApprovals` endpoint expects a JSON body with the fields shown in the example below:

``` json
{
    "signingData": {
        "signer": "47b6Qe2XtZANHetanWKP1PbApLKtS3AyiCtcXaqLMbypKjCaRw",
        "message": {
            "limit": 10,
            "offset": 0
        },
        "signature": "4e68a9f9a671f4b62963cbade295c1b47b74838dabf78c451740c1e060ab00694e68a9f9a671f4b62963cbade295c1b47b74838dabf78c451740c1e060ab0069",
        "blockHeight": 3
    }
}
```

An example response of this endpoint:
``` json
{
    "data": [
        {
            "id": 1,
            "blockTime": "2024-07-23T10:04:59.916Z",
            "transactionHash": "36491adcec0fb7cb1374e39e588c442890ded9b6443c35168fa5f9fe49be5941",
            "claimed": false,
            "pendingApproval": true
        }
    ]
}
```

This endpoint needs authorization and can be queried by an admin account (providing a valid signature) to read the list of accounts from the database that need manual verification before releasing the rewards. Account data with the `pending_approval==true` are returned by this endpoint.

- The `/api/getAccountData` endpoint expects a JSON body with the fields shown in the example below:

``` json
{
    "signingData": {
        "signer": "47b6Qe2XtZANHetanWKP1PbApLKtS3AyiCtcXaqLMbypKjCaRw",
        "message": {
            "accountAddress": "3cGEB7tTdQBFxJ9sn5JyGPNay2MSmRSKm4133UVqmKoFg4MXJ1"
        },
        "signature": "4e68a9f9a671f4b62963cbade295c1b47b74838dabf78c451740c1e060ab00694e68a9f9a671f4b62963cbade295c1b47b74838dabf78c451740c1e060ab0069",
        "blockHeight": 3
    }
}
```

Some example responses of this endpoint:

``` json
{
    "data": {
        "id": 1,
        "blockTime": "2024-07-23T10:04:59.916Z",
        "transactionHash": "36491adcec0fb7cb1374e39e588c442890ded9b6443c35168fa5f9fe49be5941",
        "claimed": false,
        "pendingApproval": false,
        "tweetId": "ABCDabcd123456789",
        "tweetValid": true,
        "tweetVerificationVersion": 1,
        "tweetSubmitTime": "2024-08-08T07:48:16.476071Z",
        "uniquenessHash": null,
        "zkProofValid": null,
        "zkProofVerificationVersion": null,
        "zkProofVerificationSubmitTime": null
    }
}
```

or

``` json
{
    "data": {
        "id": 1,
        "blockTime": "2024-07-23T10:04:59.916Z",
        "transactionHash": "36491adcec0fb7cb1374e39e588c442890ded9b6443c35168fa5f9fe49be5941",
        "claimed": false,
        "pendingApproval": false,
        "tweetId": null,
        "tweetValid": null,
        "tweetVerificationVersion": null,
        "tweetSubmitTime": null,
        "uniquenessHash": "720ec3951259c2fcd2e901c7eecda5dc24e07afa94575c64f5b6bea35be9a0ee",
        "zkProofValid": true,
        "zkProofVerificationVersion": 1,
        "zkProofVerificationSubmitTime": "2024-08-11T08:15:41.542234Z"
    }
}
```

or

``` json
{
    "data": {
        "id": 1,
        "blockTime": "2024-07-23T10:04:59.916Z",
        "transactionHash": "36491adcec0fb7cb1374e39e588c442890ded9b6443c35168fa5f9fe49be5941",
        "claimed": false,
        "pendingApproval": true,
        "tweetId": "ABCDabcd123456789",
        "tweetValid": true,
        "tweetVerificationVersion": 1,
        "tweetSubmitTime": "2024-08-11T08:15:13.241390Z",
        "uniquenessHash": "720ec3951259c2fcd2e901c7eecda5dc24e07afa94575c64f5b6bea35be9a0ee",
        "zkProofValid": true,
        "zkProofVerificationVersion": 1,
        "zkProofVerificationSubmitTime": "2024-08-11T08:15:41.542234Z"
    }
}
```

This endpoint needs authorization and can be queried by an admin account (providing a valid signature) to read account data from the database for a specific user. This endpoint can be invoked to investigate the state of a user in the database in case of complaints/problems/issues raised or before releasing the rewards to the user.

- The `/api/setClaimed` endpoint expects a JSON body with the fields shown in the example below:

``` json
{
    "signingData": {
        "signer": "47b6Qe2XtZANHetanWKP1PbApLKtS3AyiCtcXaqLMbypKjCaRw",
        "message": {
            "accountAddresses": [
                "47b6Qe2XtZANHetanWKP1PbApLKtS3AyiCtcXaqLMbypKjCaRw",
                "3cGEB7tTdQBFxJ9sn5JyGPNay2MSmRSKm4133UVqmKoFg4MXJ1"
            ]
        },
        "signature": "4e68a9f9a671f4b62963cbade295c1b47b74838dabf78c451740c1e060ab00694e68a9f9a671f4b62963cbade295c1b47b74838dabf78c451740c1e060ab0069",
        "blockHeight": 3
    }
}
```

This endpoint needs authorization and can be invoked by an admin account (providing a valid signature) to set the `claimed` boolean in the database to true for a list of accounts. This endpoint should be invoked by an admin after the reward payouts have been completed on chain for the list of accounts.

- The `/api/postZKProof` endpoint expects a JSON body with the fields shown in the example below:

``` json
{
    "blockHeight": 3,
    "presentation": {
        "presentationContext": "d2db9b790c3c8257c5a591963c802c4673c6327966407ece603319a350ec7b32",
        "proof": {
            "created": "2024-08-01T21:05:50.426Z",
            "proofValue": [],
            "type": "ConcordiumWeakLinkingProofV1"
        },
        "type": "VerifiablePresentation",
        "verifiableCredential": [
            {
                "credentialSubject": {
                    "id": "did:ccd:testnet:cred:af521c107ee686b2e60da2e71fbf60e29cff4f6a29aed86a0752a3913e7abc663ecd30e07e14b50662b7b51ab14bc64d",
                    "proof": {
                        "created": "2024-08-01T21:05:50.425Z",
                        "proofValue": [
                            {
                                "attribute": "N-1234",
                                "proof": "06bbf27d5a8c0ff88e7333b4d1f4f6f58cdaa9b8daf966daf4dbb950435c57a22a2f466e59e7a92052af4a8428118334cd85aff3cede542d501f17c9fc5423c7",
                                "type": "RevealAttribute"
                            },
                            {
                                "attribute": "DK",
                                "proof": "e96e90b2252dd4dbc7d4397d552fb246d8568b21da9968e0a0249ee2685fdd95559661d5454bb2d4e3a95f30265a4e164848161c48abb274df7c862010b217ca",
                                "type": "RevealAttribute"
                            },
                            {
                                "proof": "b841f20dcdda4118fd727bb6332066479f0dcc32e6d3cb0b1e41b8c0f0cb580ac1b134663118647bf777e798fe37172f9775db6d055ee0679d27c929187de82effbba2f65840456fd92f44e2973004a1d2a3a00aaf04689c83ca86a669b3fb0ea2ef45296d6e770d533c13b2347e06920acbe29180fecefdb90d9d40c95afedd07b7eac8eb5323063ac0b4c58418ad8ab1cc20540e95520dd20516d1b61b2bb4d6eb66aa5697d4b577aad4a27c8a1da7de56ca4ac1e5ef79bf50e41bf86a48044c9060ec15329cf9400ba2956065850a0ef5971684e61fb86ff46fb33a7bcc442703761bb2019616c6425adf4a4bcc29aede39e1becc73783a3d2e75967ef4946387a5d54ba35053a6421b2f4250f6d23d70c7632df37080ea7910037fe4b78000000007814b3b4990c7d9fd4f20c9aebd5d5e54c604e1f0b8fda61f9638bef8d5980e0cdae6dfa69f5838e44bfbed1bdd2ae2fd963ec740eeddaa4be359d1cd4de86a7b3dfdd24646630576581bcb3fcb09876a6a245839d7514f3397a9ab233cf9cd38ae9efdfceb831fcfa758e7bb75eb0fe7dc94524b9128aad0ddd40d08c96a442d5fcdfcefbeaedad70639b4fbd526b91bae16fc64a13cba15156cf25e7c27874d18aff61cb283c8902d761ec25302d29c579780532b958120b9733f523a1eb73da6c5eba2956da92f95caac80b9a4a6b78e6caf547caffe6ffb4e11785c5f6bdbae2ba25b2acda02e856ee003020f8262b158869289dc3b1abd6a49e4da506fec0e8eedb10e4efc01317f986d4d727601719caf70e383e35d626ddd66845cd9cf87ce746f187aae12fcbf482ffbb4721721f0ac747e8576e83285eb1da70f5565a5175f8930ef3e608c6c6b1fc698dd7ba145fd8c820a6f3f36878cc3a282ad3cca65fa550e3b3d6a0c11d862fba9d96f9d68425ecfa1b117a3509d57ca96b80b8eb83f1eb858f26cfabe749e5ae0697d5253355acb0499e5ccfa9a9ecaa8a802db01533cf64e2aeeedc4a6adb41b2c09a39a31f0f3ee5c126f52525309aac542f3f529b68868b37daaa992c70ce33867cfda03bb5a8406b9c85444710f23ac94832d9824fe359cfe9a8ce118699dec60e01c2c6a842cf19230a08e74ce115ca32c2d36caee6d7cf588172cd2c5bb563a899371b97bd8cc91fc8d2a4b4b5f75de3c007c31b4abfd8a8de787a4b8c4ea483b580d1c2ba4b8c4b8ec399ff22828d4a52b7527a101d2a14008056cb09d06780c401459ae27c6344465233858cc136c88e9a73aa9e7f944cd0844437f46d032b93d36ab7ad911d5d886b7895cf9644edf8bf17db6592b473cf5ffa4ad4cb8da015ac3fd07d49f89d26fad9ed437fec11bc6217f22a53e64006a021e11b58ee4f0d0686d919a41cc8bc97a8f568874ac1421cb79c1964bf8db8215202edaf23297b8bc3c35184071531de8fd198f8f2f",
                                "type": "AttributeInRange"
                            },
                            {
                                "proof": "86aeeb7aba255d278e4c925255354b286ad6e078e5570fd24b7bac51610d0db9f677bbc5f0fc9ebc5b750adff9320bfc90822580ea43a650b3a57930dc07b0f0ae44ae054e6d5d5581861491d8635ced5343cd58fd488a6f95717fde4640a0c1a921a6744ff898050b6920d529f3b5cd12bb7cd237e4c92ed5aa744fb93ce9d178534fbd713a8f5f22d9f4792cbb95a6a9390c4630f16a6f74a5555831a0555b142304b8a1da45d9ed8c0ee0c4d1dbf72be3f321ade90eeed83a60c284a948036f9ee0d1c5d4fa479e78fdcb03317516c8c84c4784ddadf36b1579eb1e9e066d6fa3f300d55f4eee8a56ea8109d3987dace8d569d3e6f0e92170c24a0c3285741ba67d40510356fd995710eaff37cedfd651e3504d651c5f1ac022270a7e0ccb000000019392a7da2231ee75b57155277d0bc4a3917746596fea55df22b11ae1f5a795553cb532a322857fa5c6a080158c781f18b2786218b8a8124666c75be9f750db9857915c011e605f1df280006bad22fc0d50b4f577c2dc997461320b040aacbb645b11a80d5b53248029cc8043eaf7718df409426c7f24cced137480d5fcf57aad672fa2b22a6be2c61709a6af17cdc4a022ba936fa029e5c607c152713dda77d9",
                                "type": "AttributeNotInSet"
                            }
                        ],
                        "type": "ConcordiumZKProofV3"
                    },
                    "statement": [
                        {
                            "attributeTag": "nationalIdNo",
                            "type": "RevealAttribute"
                        },
                        {
                            "attributeTag": "nationality",
                            "type": "RevealAttribute"
                        },
                        {
                            "attributeTag": "dob",
                            "lower": "18000101",
                            "type": "AttributeInRange",
                            "upper": "20060802"
                        },
                        {
                            "attributeTag": "countryOfResidence",
                            "set": [
                                "KP",
                                "US"
                            ],
                            "type": "AttributeNotInSet"
                        }
                    ]
                },
                "issuer": "did:ccd:testnet:idp:0",
                "type": [
                    "VerifiableCredential",
                    "ConcordiumVerifiableCredential"
                ]
            }
        ]
    }
}
```

This endpoint needs authorization and can be invoked by a user account (providing a valid ZK proof) to prove the legal requirements necessary to receive the reward payout.

- The `/api/postTweet` endpoint expects a JSON body with the fields shown in the example below:

``` json
{
    "signingData": {
        "signer": "3cGEB7tTdQBFxJ9sn5JyGPNay2MSmRSKm4133UVqmKoFg4MXJ1",
        "message": {
            "tweet": "ABCDabcd123456789"
        },
        "signature": "4e68a9f9a671f4b62963cbade295c1b47b74838dabf78c451740c1e060ab00694e68a9f9a671f4b62963cbade295c1b47b74838dabf78c451740c1e060ab0069",
        "blockHeight": 3
    }
}
```

This endpoint needs authorization and can be invoked by a user account (providing a valid signature) to submit a tweet containing tags to promote Concordium. This is a necessary task to be completed by the user to receive the reward payout.

### `Curl` command examples

After running the server, you can invoke its endpoints with e.g. the following `curl` commands:

```
curl -GET "http://localhost:8080/health" -H "Content-Type: application/json" -v
```

```
curl -GET "http://localhost:8080/api/getZKProofStatements" -H "Content-Type: application/json" -v
```

```
curl -POST "http://localhost:8080/api/canClaim" -H "Content-Type: application/json" --data '{"accountAddress": "3cGEB7tTdQBFxJ9sn5JyGPNay2MSmRSKm4133UVqmKoFg4MXJ1"}' -v
```

```
curl -POST "http://localhost:8080/api/setClaimed" -H "Content-Type: application/json" --data '{"signingData":{"signer":"47b6Qe2XtZANHetanWKP1PbApLKtS3AyiCtcXaqLMbypKjCaRw","message":{"accountAddresses":["47b6Qe2XtZANHetanWKP1PbApLKtS3AyiCtcXaqLMbypKjCaRw","3cGEB7tTdQBFxJ9sn5JyGPNay2MSmRSKm4133UVqmKoFg4MXJ1"]},"signature":"4e68a9f9a671f4b62963cbade295c1b47b74838dabf78c451740c1e060ab00694e68a9f9a671f4b62963cbade295c1b47b74838dabf78c451740c1e060ab0069","blockHeight": 3}}' -v
```

```
curl -POST "http://localhost:8080/api/getAccountData" -H "Content-Type: application/json" --data '{"signingData":{"signer":"47b6Qe2XtZANHetanWKP1PbApLKtS3AyiCtcXaqLMbypKjCaRw","message":{"accountAddress":"3cGEB7tTdQBFxJ9sn5JyGPNay2MSmRSKm4133UVqmKoFg4MXJ1"},"signature":"4e68a9f9a671f4b62963cbade295c1b47b74838dabf78c451740c1e060ab00694e68a9f9a671f4b62963cbade295c1b47b74838dabf78c451740c1e060ab0069","blockHeight": 3}}' -v
```

```
curl -POST "http://localhost:8080/api/getPendingApprovals" -H "Content-Type: application/json" --data '{"signingData":{"signer":"47b6Qe2XtZANHetanWKP1PbApLKtS3AyiCtcXaqLMbypKjCaRw","message":{"limit":10,"offset":0},"signature":"4e68a9f9a671f4b62963cbade295c1b47b74838dabf78c451740c1e060ab00694e68a9f9a671f4b62963cbade295c1b47b74838dabf78c451740c1e060ab0069","blockHeight": 3}}' -v
```

```
curl -POST "http://localhost:8080/api/postTweet" -H "Content-Type: application/json" --data '{"signingData":{"signer":"3cGEB7tTdQBFxJ9sn5JyGPNay2MSmRSKm4133UVqmKoFg4MXJ1","message":{"tweet":"ABCDabcd123456789"},"signature":"4e68a9f9a671f4b62963cbade295c1b47b74838dabf78c451740c1e060ab00694e68a9f9a671f4b62963cbade295c1b47b74838dabf78c451740c1e060ab0069","blockHeight": 3}}' -v
```

```
curl -POST "http://localhost:8080/api/postZKProof" -H "Content-Type: application/json" --data '{"blockHeight":3,"presentation":{"presentationContext":"d2db9b790c3c8257c5a591963c802c4673c6327966407ece603319a350ec7b32","proof":{"created":"2024-08-01T21:05:50.426Z","proofValue":[],"type":"ConcordiumWeakLinkingProofV1"},"type":"VerifiablePresentation","verifiableCredential":[{"credentialSubject":{"id":"did:ccd:testnet:cred:af521c107ee686b2e60da2e71fbf60e29cff4f6a29aed86a0752a3913e7abc663ecd30e07e14b50662b7b51ab14bc64d","proof":{"created":"2024-08-01T21:05:50.425Z","proofValue":[{"attribute":"N-1234","proof":"06bbf27d5a8c0ff88e7333b4d1f4f6f58cdaa9b8daf966daf4dbb950435c57a22a2f466e59e7a92052af4a8428118334cd85aff3cede542d501f17c9fc5423c7","type":"RevealAttribute"},{"attribute":"DK","proof":"e96e90b2252dd4dbc7d4397d552fb246d8568b21da9968e0a0249ee2685fdd95559661d5454bb2d4e3a95f30265a4e164848161c48abb274df7c862010b217ca","type":"RevealAttribute"},{"proof":"b841f20dcdda4118fd727bb6332066479f0dcc32e6d3cb0b1e41b8c0f0cb580ac1b134663118647bf777e798fe37172f9775db6d055ee0679d27c929187de82effbba2f65840456fd92f44e2973004a1d2a3a00aaf04689c83ca86a669b3fb0ea2ef45296d6e770d533c13b2347e06920acbe29180fecefdb90d9d40c95afedd07b7eac8eb5323063ac0b4c58418ad8ab1cc20540e95520dd20516d1b61b2bb4d6eb66aa5697d4b577aad4a27c8a1da7de56ca4ac1e5ef79bf50e41bf86a48044c9060ec15329cf9400ba2956065850a0ef5971684e61fb86ff46fb33a7bcc442703761bb2019616c6425adf4a4bcc29aede39e1becc73783a3d2e75967ef4946387a5d54ba35053a6421b2f4250f6d23d70c7632df37080ea7910037fe4b78000000007814b3b4990c7d9fd4f20c9aebd5d5e54c604e1f0b8fda61f9638bef8d5980e0cdae6dfa69f5838e44bfbed1bdd2ae2fd963ec740eeddaa4be359d1cd4de86a7b3dfdd24646630576581bcb3fcb09876a6a245839d7514f3397a9ab233cf9cd38ae9efdfceb831fcfa758e7bb75eb0fe7dc94524b9128aad0ddd40d08c96a442d5fcdfcefbeaedad70639b4fbd526b91bae16fc64a13cba15156cf25e7c27874d18aff61cb283c8902d761ec25302d29c579780532b958120b9733f523a1eb73da6c5eba2956da92f95caac80b9a4a6b78e6caf547caffe6ffb4e11785c5f6bdbae2ba25b2acda02e856ee003020f8262b158869289dc3b1abd6a49e4da506fec0e8eedb10e4efc01317f986d4d727601719caf70e383e35d626ddd66845cd9cf87ce746f187aae12fcbf482ffbb4721721f0ac747e8576e83285eb1da70f5565a5175f8930ef3e608c6c6b1fc698dd7ba145fd8c820a6f3f36878cc3a282ad3cca65fa550e3b3d6a0c11d862fba9d96f9d68425ecfa1b117a3509d57ca96b80b8eb83f1eb858f26cfabe749e5ae0697d5253355acb0499e5ccfa9a9ecaa8a802db01533cf64e2aeeedc4a6adb41b2c09a39a31f0f3ee5c126f52525309aac542f3f529b68868b37daaa992c70ce33867cfda03bb5a8406b9c85444710f23ac94832d9824fe359cfe9a8ce118699dec60e01c2c6a842cf19230a08e74ce115ca32c2d36caee6d7cf588172cd2c5bb563a899371b97bd8cc91fc8d2a4b4b5f75de3c007c31b4abfd8a8de787a4b8c4ea483b580d1c2ba4b8c4b8ec399ff22828d4a52b7527a101d2a14008056cb09d06780c401459ae27c6344465233858cc136c88e9a73aa9e7f944cd0844437f46d032b93d36ab7ad911d5d886b7895cf9644edf8bf17db6592b473cf5ffa4ad4cb8da015ac3fd07d49f89d26fad9ed437fec11bc6217f22a53e64006a021e11b58ee4f0d0686d919a41cc8bc97a8f568874ac1421cb79c1964bf8db8215202edaf23297b8bc3c35184071531de8fd198f8f2f","type":"AttributeInRange"},{"proof":"86aeeb7aba255d278e4c925255354b286ad6e078e5570fd24b7bac51610d0db9f677bbc5f0fc9ebc5b750adff9320bfc90822580ea43a650b3a57930dc07b0f0ae44ae054e6d5d5581861491d8635ced5343cd58fd488a6f95717fde4640a0c1a921a6744ff898050b6920d529f3b5cd12bb7cd237e4c92ed5aa744fb93ce9d178534fbd713a8f5f22d9f4792cbb95a6a9390c4630f16a6f74a5555831a0555b142304b8a1da45d9ed8c0ee0c4d1dbf72be3f321ade90eeed83a60c284a948036f9ee0d1c5d4fa479e78fdcb03317516c8c84c4784ddadf36b1579eb1e9e066d6fa3f300d55f4eee8a56ea8109d3987dace8d569d3e6f0e92170c24a0c3285741ba67d40510356fd995710eaff37cedfd651e3504d651c5f1ac022270a7e0ccb000000019392a7da2231ee75b57155277d0bc4a3917746596fea55df22b11ae1f5a795553cb532a322857fa5c6a080158c781f18b2786218b8a8124666c75be9f750db9857915c011e605f1df280006bad22fc0d50b4f577c2dc997461320b040aacbb645b11a80d5b53248029cc8043eaf7718df409426c7f24cced137480d5fcf57aad672fa2b22a6be2c61709a6af17cdc4a022ba936fa029e5c607c152713dda77d9","type":"AttributeNotInSet"}],"type":"ConcordiumZKProofV3"},"statement":[{"attributeTag":"nationalIdNo","type":"RevealAttribute"},{"attributeTag":"nationality","type":"RevealAttribute"},{"attributeTag":"dob","lower":"18000101","type":"AttributeInRange","upper":"20060802"},{"attributeTag":"countryOfResidence","set":["KP","US"],"type":"AttributeNotInSet"}]},"issuer":"did:ccd:testnet:idp:0","type":["VerifiableCredential","ConcordiumVerifiableCredential"]}]}}' -v
```

## ZK Statements

The server uses the 4 ZK statements:

1. Proof: Reveal attribute proof ("nationalIdNo" attribute) using the Sigma protocol.

2. Proof: Reveal attribute proof ("nationality" attribute) using the Sigma protocol.

3. Proof: Range proof ("dob=dateOfBirth" attribute) using the Bulletproof protocol. User is older than 18 years.

4. Proof: Not set membership proof ("countryOfResidence" attribute) using the Bulletproof protocol. User is not from the USA or North Korea. Countries are represented by 2 letters (ISO 3166-1 alpha-2).

```
[
    {
        "type": "RevealAttribute",
        "attributeTag": "nationalIdNo"
    },
    {
        "type": "RevealAttribute",
        "attributeTag": "nationality"
    },
    {
        "type": "AttributeInRange",
        "attributeTag": "dob",
        "lower": "18000101",
        "upper": "20060802"
    },
    {
        "type": "AttributeNotInSet",
        "attributeTag": "countryOfResidence",
        "set": [
            "US", "KP"
        ]
    }
]
```

## Expiry of signatures and proofs.

Proofs and signatures have to be generated including a recent `block_hash` (either as the challenge or as part of the message signed).
Since `block_hashes` cannot be predicted much in advance, this ensures that proofs and signatures are generated on the spot and
expiry after `SIGNATURE_AND_PROOF_EXPIRY_DURATION_BLOCKS` (constant in the `server.rs` file). The corresponding `block_height`
is passed to the backend (while not part of the proof or part of the message signed), the `block_height` eases the check for
expiry and the backend looks up the corresponding `block_hash` included in the proof/signature.

This verification relies on the front end (via the wallet) and back end being connected to reliable nodes that are caught up to the
top of the chain. The front end should look up some recent `block_hash` (not the most recent) to give the backend a small window of
being delayed. The backend server should only be run in conjunction with a reliable node connection otherwise, the verification of
expired signatures/proofs is not correct.

## Replaying of signatures and proofs.

Replaying a signature or ZK proof in this service is possible for a short window (until they expire based on the
`SIGNATURE_AND_PROOF_EXPIRY_DURATION_BLOCKS` variable). Since resubmitting a signature or ZK proof is idempotent in this service,
this is not an issue here. Replaying a signature or ZK proof across different Concordium services is not possible since Concordium
uses a different `CONTEXT_STRING` (constant in the `server.rs` file) in each of its services. The `CONTEXT_STRING` is added as part of
the message signed or as part of the ZK challenge. If a third-party service uses the same ZK statements or signature structure
(with the same `CONTEXT_STRING`) for authentication then replaying of a signature or ZK proof could be possible across the services
but none of the signatures or ZK proofs sent to this backend are made public/accessible or stored in the database.

## Versioning

The ZK proof verification logic and the tweet verification logic are versioned with the `CURRENT_ZK_PROOF_VERIFICATION_VERSION` and
`CURRENT_TWEET_VERIFICATION_VERSION` (constants in the `server.rs` file), respectively.

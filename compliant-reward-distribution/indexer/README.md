## Compliant-Reward-Distribution Indexer

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

## Build the `indexer`

To build the tools make sure you have the repository submodules initialized

```console
git submodule update --init --recursive
```

The tool can be built by running

```console
cargo build --release
```

This will produce the binaries (`indexer`) in the `target/release` directory.

# The `indexer` binary

It is a tool for indexing newly created accounts on Concordium into a postgres database. The database is configured with the tables from the file `../resources/schema.sql`. A table `settings` exists to store global configurations.

The global configurations are set when the indexer is started for the first time. Re-starting the indexer will check if its current settings are compatible will the stored indexer settings to prevent corrupting the database. In addition, the settings can be queried by the front end to check compatibility.

When the indexer is started for the first time, it will look up the current block height and start indexing from that block. When the indexer is re-started with the same database settings, it resumes indexing from the `latest_processed_block_height+1` as stored in the database.

All newly created accounts in a block are atomically added in one database transaction to postgres. This ensures a simple recovery process since we always process the complete block or roll back the database to the beginning of the block. In addition, the indexer has a re-try logic and will try to re-connect to the database pool and re-submit any failed database transaction.

## Run the `indexer`

```console
cargo run --bin indexer -- --node https://grpc.testnet.concordium.com:20000 --log-level debug
```

## Configure the `indexer`

There are a few options to configure the indexer:

- `--node` is the endpoint to the Concordium node grpc v2 API. If not specified, the default value `https://grpc.testnet.concordium.com:20000` is used.

- `--db-connection` should specify your postgreSQL database connection. If not specified, the default value `host=localhost dbname=indexer user=postgres password=password port=5432` is used.

- `--log-level` specifies the maximum log level. Possible values are: `trace`, `debug`, `info`, `warn`, and `error`. If not specified, the default value `info` is used.

You can open the help menu as follows:

```console
cargo run --bin indexer -- --help

## Configure the `server`

```console
cargo run --bin server -- --zk_statements "$(<./zk_statements_config.json)" --admin_accounts "47b6Qe2XtZANHetanWKP1PbApLKtS3AyiCtcXaqLMbypKjCaRw" --admin_accounts "4KjE4rptF1o3QX6XuSaQzm6w9KLYYQTbKm2Zd4NooarH6YwfxS"
```

```
curl -POST "http://localhost:8080/api/canClaim" -H "Content-Type: application/json" --data '{"accountAddress": "3cGEB7tTdQBFxJ9sn5JyGPNay2MSmRSKm4133UVqmKoFg4MXJ1"}' -v
```

```
curl -POST "http://localhost:8080/api/getAccountData" -H "Content-Type: application/json" --data '{"accountAddress":"3cGEB7tTdQBFxJ9sn5JyGPNay2MSmRSKm4133UVqmKoFg4MXJ1","signingData":{"signer":"47b6Qe2XtZANHetanWKP1PbApLKtS3AyiCtcXaqLMbypKjCaRw","message":{"blockHash":"4e68a9f9a671f4b62963cbade295c1b47b74838dabf78c451740c1e060ab0069","blockHeight":3},"signature":"4e68a9f9a671f4b62963cbade295c1b47b74838dabf78c451740c1e060ab00694e68a9f9a671f4b62963cbade295c1b47b74838dabf78c451740c1e060ab0069"}}' -v
```

Proof statements:

1.Proof: Reveal "nationalIdNo"

2.Proof: Reveal "nationality"

3.Proof: Range proof (older than 18 years)

4.Proof: Not set membership proof (countryOfResidence is not in USA or North Korea -> https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)


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

An example proof for the above statement:

```
curl -POST "http://localhost:8080/api/postZKProof" -H "Content-Type: application/json" --data '{"presentation":{"presentationContext":"e4ebb397c3200236e62899926dead2437b5510bc38535f1d7412acd3108bf176","proof":{"created":"2024-08-01T15:30:38.714Z","proofValue":[],"type":"ConcordiumWeakLinkingProofV1"},"type":"VerifiablePresentation","verifiableCredential":[{"credentialSubject":{"id":"did:ccd:testnet:cred:8280babfd0a412ea2aeb2f707193e804a6104d150c5e095343c8b225ba496ad6c208a9e6bf54990a966f7d0b54cfed2e","proof":{"created":"2024-08-01T15:30:38.714Z","proofValue":[{"attribute":"N-1234","proof":"9460bcbed089cb2b982c5eaea5d384ea115a6e2bb64626b5a8ee63e506f210c71b63731561d539787c515e54b8dc9a03a2d76c4fd84c2f6628baf837a7ffd7f6","type":"RevealAttribute"},{"attribute":"DK","proof":"3e634eb45e9ea9eef5dbf870a2278d3415835acec501cdb2256f15da1f9873f067e88f10e69ccf2c9b68d5cbe54613fe28986fb7285ccf9c5a7b4e0831434f8f","type":"RevealAttribute"},{"proof":"9531e090941c3097bc93316340f7a5ca6eb5b753381cb9cdeae662feb0b238217daf3177dc0e814f6dc6f9751159cccf90e18307bdc0f987e599e6968e4deb7988bd02096728caaf09630b7ad97bc8dca4cf977222fe528439d419a7f08921088cbefa7d467d4e68d3881b188c89ec0c833cbe57c8eacd9f94313392148d019ed1d02dc21fd7f790b58b0425d064243e81498d32a58910f305ac088fdfaa5f540ce459c10072c8736840d7271d38b130eefa91eae56745cb94acc0e5e9a8d10464137eca11b5df9ffe0cea4fa44164c253f11204bf1b8b83781f77d5c29a26d61dcf28512e3622e36f5ae21f39463e4f44595d6a5df0e90a776e187c608952163deee44f8a55f694fac36bf7e1d8b8cc2c249819319b3fe45aa4f6b4947dacbb00000007b3359516fd5904cc76254824f39c7eeac50e70be9d9c4dbc70492d63ae694d21f8393f72254d2cc5cc598362a8238356a6d1f47e3760ee6c4b3e96178504b846eaeac90445288dcdeaa77fbbb04a066fc9152d35e9605707978ed7efc18a77c5a6cf91c37b14b451c54aa889aed60dc9f87fdfc48951094a16f7df50725360f6413a077cf3c02ec42e693bcb2116d932a784a1b1fc03a45f050364f28c753ac47d214f1d9f3c9a895766ae4b844341d5b66d592db2fedcd8d1e26ea294b0be20b3ca63fbf12b6de00f072710142c3ce4cec841962ad9e4cb86cfeb858096acaaf3cd82207826c904f823c6185c4466caa0645945a07a95f3543cd07e29188f683d8b5d9533c60165cd2d9b5bf36bfe535ddb2762c1ca1ca99d804bced24fdc678031463916aaf3b9f1b4d058c1c56078623a8758747ac8bf5ac5bad38b16540f5b721c68ffac9109943d1ed22d63a7dd837d9775dfa254ecbea3ecce4a72850a1ec214797d12591cc765ead961ac8b4518e4210e0f48bde9cc16c5c8a2453a74826cb59d10efc2331ad4e64c30e503ce05cda02434974519fd759268501b5ff64e390ac6535dde688ae46deae40c9d46b6a740ab2ae47e2a5abb7b5cd4f5e7292e54b51f1d77beab83520b3093493f5550b0583a5c65955ce7b9c1810707d30587788e386820723ab62382a1ea0c4d049befa891f4da04fd3a73632f6474dacac97e2dd1655fef6ed18f4d3a94a556b8aae09e7698cf09179a35d9c44344826a8fa11e8d2cbdd8c2f9493d990fc71a7daf77d58833f20c251e32246c7a5242adb33a535f1e2a5ecb452400b0ea0ca468828a99aeb0e7ec315513a949f63c3aebe7dae589b802533a0799b72f4c62df4ea324469e0fcbb29c378edd32ef97222bfddf37ef14547604abb012800ef39dbe3a5b41dc960345e5e2476af869d68c03387a87ec92c8432dfe9e7519d78b7f89337eb6d02ff256833efb79d24d96bfd106fe802f53b0d1883af0faea50d3f4d8201e9d699c1a3a5c232bdb7390bf1ff2","type":"AttributeInRange"},{"proof":"8a6ca0735cc329e7492121aae961d36fddfd00cdbe3ca6b1938da6d46ddc8a1cfcf42bdf18566c93d0d605b46d51d0a39987b60fb81533500c449d7374e8654278bcf770b01b34ab0c796fe7aa634588d22023ee989bd490c7d8e032e467c5e19999967add875f9ea7775c62aa16c8e193203f5f4790b6dbff19f9c2ea7a91e9c3ea7ab86f20b8afd9d8b442c38c66b190aa70eb2919015a5efa395db9c3eac339c18d01782bade45813535a01c81bdaa94aaeca917016aeee641fdce01ccdcb701d79bb0892dffb11cca8f1643cbfa21c240712ac852782f9655260008d0e0d2dba8d31369434f55f522e17ff9c3e069ba70f63e3eb9c5c2d539e583d81842b3c503d9599b92f2899af5cd9ff3d7d7089343a1fdf2e6374a9a63c5ddd97a0b700000001aa5dae6529b7d62c8173ce1cbd1a05364d37cdf0d5a2d38938f63db50c4d6ec9e65450b016de4fe5526d65261880cbc7ae800c250342895617158c1fab6f7fdcd138f39a7555ebb27f8a91e9619da1c959333e718bb6dfcb509ec6ef2fee692531d28f499093c9993089b585e314aea83e67e7a01fa7fe08ae51e07b259e285802a726fcd15271517d46c4899ca31241c95a66707bfc60850940f508bd3a6ef5","type":"AttributeNotInSet"}],"type":"ConcordiumZKProofV3"},"statement":[{"attributeTag":"nationalIdNo","type":"RevealAttribute"},{"attributeTag":"nationality","type":"RevealAttribute"},{"attributeTag":"dob","lower":"18000101","type":"AttributeInRange","upper":"20060802"},{"attributeTag":"countryOfResidence","set":["KP","US"],"type":"AttributeNotInSet"}]},"issuer":"did:ccd:testnet:idp:0","type":["VerifiableCredential","ConcordiumVerifiableCredential"]}]}}' -v
```

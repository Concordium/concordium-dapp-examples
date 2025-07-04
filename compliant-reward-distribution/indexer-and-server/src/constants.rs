/// The maximum number of rows allowed in a request to the database.
pub const MAX_REQUEST_LIMIT: u32 = 40;

/// The testnet genesis block hash.
pub const TESTNET_GENESIS_BLOCK_HASH: [u8; 32] = [
    66, 33, 51, 45, 52, 225, 105, 65, 104, 194, 160, 192, 179, 253, 15, 39, 56, 9, 97, 44, 177, 61,
    0, 13, 92, 46, 0, 232, 95, 80, 247, 150,
];

/// The string "CONCORDIUM_COMPLIANT_REWARD_DISTRIBUTION_DAPP" is used
/// as context for signing messages and generating ZK proofs. The same account
/// can be used in different Concordium services without the risk of re-playing
/// signatures/zk-proofs across the different services due to this context
/// string.
pub const CONTEXT_STRING: &str = "CONCORDIUM_COMPLIANT_REWARD_DISTRIBUTION_DAPP";

/// The number of blocks after that a generated signature or ZK proof is
/// considered expired.
pub const SIGNATURE_AND_PROOF_EXPIRY_DURATION_BLOCKS: u64 = 200;

/// Current version of the verification logic used when submitting a ZK proof.
/// Update this version if you want to introduce a new ZK proof-verification logic.
pub const CURRENT_ZK_PROOF_VERIFICATION_VERSION: u16 = 1;
/// Current version of the verification logic used when submitting a tweet.
/// Update this version if you want to introduce a new tweet verification logic.
pub const CURRENT_TWEET_VERIFICATION_VERSION: u16 = 1;

/// 1. Proof: Reveal attribute proof ("nationalIdNo" attribute).
/// 2. Proof: Reveal attribute proof ("nationality" attribute).
/// 3. Proof: Range proof ("dob=dateOfBirth" attribute). User is older than 18 years.
/// 4. Proof: Not set membership proof ("countryOfResidence" attribute). User is not from the USA or North Korea.
///    Countries are represented by 2 letters (ISO 3166-1 alpha-2).
pub const ZK_STATEMENTS: &str = r#"[
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
]"#;

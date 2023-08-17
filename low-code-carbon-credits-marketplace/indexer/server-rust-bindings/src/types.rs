use concordium_base::{
    common::*,
    id::{curve_arithmetic::Pairing, ps_sig::SigRetrievalRandomness},
};

#[derive(SerdeSerialize, SerdeDeserialize)]
#[serde(bound(serialize = "P: Pairing", deserialize = "P: Pairing"))]
pub struct RandomnessWrapper<P: Pairing> {
    #[serde(
        rename = "randomness",
        serialize_with = "base16_encode",
        deserialize_with = "base16_decode"
    )]
    pub randomness: SigRetrievalRandomness<P>,
}

pub type JsonString = String;
pub type HexString = String;
pub type Base58String = String;

use crate::types::*;
use anyhow::{anyhow, Result};
use concordium_base::contracts_common::{schema::VersionedModuleSchema, Cursor};
use hex;

/// Given the bytes of a receive function's return value, deserialize them to a
/// json object, using the provided schema.
pub fn deserialize_event_aux(
    event_bytes: HexString,
    schema: HexString,
    contract_name: &str,
    schema_version: Option<u8>,
) -> Result<JsonString> {
    let module_schema = VersionedModuleSchema::new(&hex::decode(schema)?, &schema_version)?;
    let event_schema = match module_schema {
        VersionedModuleSchema::V0(_) => Err(anyhow!("only v3 module is supported")),
        VersionedModuleSchema::V1(_) => Err(anyhow!("only v3 module is supported")),
        VersionedModuleSchema::V2(_) => Err(anyhow!("only v3 module is supported")),
        VersionedModuleSchema::V3(module_v3) => Ok(module_v3
            .contracts
            .get(contract_name)
            .and_then(|contract| contract.event.clone())
            .ok_or_else(|| anyhow!("Event schema not present"))),
    }??;
    let mut rv_cursor = Cursor::new(hex::decode(event_bytes)?);
    match event_schema.to_json(&mut rv_cursor) {
        Ok(rv) => Ok(rv.to_string()),
        Err(e) => Err(anyhow!(e.to_string())),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_deserialize_event_aux() {
        let event_bytes =
            "fe010101008f2e8d57ce3bce5703664fa76f7752e781bdcefbf77363266c03ddc636e11622";
        let schema = "ffff030300000014000000636172626f6e5f6372656469745f6d61726b657401041400010000000a000000636f6d6d697373696f6e03150d0000000b0000005061727365506172616d73021100000043616c6c6564427941436f6e7472616374020e000000546f6b656e4e6f744c6973746564020f00000043697332436c69656e744572726f720101000000150400000013000000496e766f6b65436f6e74726163744572726f72020b0000005061727365506172616d73020b0000005061727365526573756c740211000000436f6c6c656374696f6e4e6f74436973320211000000496e76616c6964416d6f756e745061696402130000004…04000000536f6d650101000000132000000002080000005472616e73666572010100000014000400000008000000746f6b656e5f69641d0006000000616d6f756e741b250000000400000066726f6d1502000000070000004163636f756e7401010000000b08000000436f6e747261637401010000000c02000000746f1502000000070000004163636f756e7401010000000b08000000436f6e747261637401010000000c06000000526574697265010100000014000200000008000000746f6b656e5f69641d00050000006f776e65721502000000070000004163636f756e7401010000000b08000000436f6e747261637401010000000c";
        let res = deserialize_event_aux(
            event_bytes.to_owned(),
            schema.to_owned(),
            "project_token",
            None,
        );
        assert!(res.is_ok());
    }
}

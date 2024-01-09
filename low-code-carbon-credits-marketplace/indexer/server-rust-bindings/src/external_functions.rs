use crate::{aux_functions::*, types::*};
use wasm_bindgen::prelude::*;

#[wasm_bindgen(js_name = deserializeEventValue)]
pub fn deserialize_event_value(
    return_value_bytes: HexString,
    module_schema: HexString,
    contract_name: &str,
    schema_version: Option<u8>,
) -> JsonString {
    match deserialize_event_aux(
        return_value_bytes,
        module_schema,
        contract_name,
        schema_version,
    ) {
        Ok(s) => s,
        Err(e) => format!("{e}"),
    }
}

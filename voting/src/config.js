import moment from 'moment';

export const MODULE_REF = '9ee6fcfbb1c210a1c920f692a7db0cfd0cfe3c78df45873ab339234be7d5279b';
export const CONTRACT_NAME = 'voting';
export const RAW_SCHEMA_BASE64 =
    '//8DAQAAAAYAAAB2b3RpbmcBABQAAwAAAAsAAABkZXNjcmlwdGlvbhYCBwAAAG9wdGlvbnMQAhYCCAAAAGRlYWRsaW5lDQMAAAAQAAAAZ2V0TnVtYmVyT2ZWb3RlcwIWAgQEAAAAdmlldwEUAAMAAAALAAAAZGVzY3JpcHRpb24WAgcAAABvcHRpb25zEAIWAggAAABkZWFkbGluZQ0EAAAAdm90ZQQWAhUGAAAADQAAAFBhcnNpbmdGYWlsZWQCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIOAAAAVm90aW5nRmluaXNoZWQCCwAAAEludmFsaWRWb3RlAg0AAABDb250cmFjdFZvdGVyAgEUAAIAAAAFAAAAdm90ZXILBgAAAG9wdGlvbhYC';
export const BASE_URL = 'http://localhost:3000/';
export const REFRESH_INTERVAL = moment.duration(10, 'seconds');
// The TESTNET_GENESIS_BLOCK_HASH is used to check that the user has its browser wallet connected to testnet and not to mainnet.
export const TESTNET_GENESIS_BLOCK_HASH = '4221332d34e1694168c2a0c0b3fd0f273809612cb13d000d5c2e00e85f50f796';

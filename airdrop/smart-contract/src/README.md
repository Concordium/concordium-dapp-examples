*Overview:*

Contract name: airdrop_project
Module reference: 0edbd695743789ac415289c31391ec66e66958efbaa1ea826b37ddcdeea74e7e

The base64 conversion of the schema is:
//8DAQAAAA8AAABhaXJkcm9wX3Byb2plY3QBABQACQAAAAkAAAB3aGl0ZWxpc3QQAhYCCQAAAG5mdF9saW1pdAQVAAAAbmZ0X2xpbWl0X3Blcl9hZGRyZXNzBA4AAABuZnRfdGltZV9saW1pdAUHAAAAcmVzZXJ2ZQQIAAAAYmFzZV91cmwWAggAAABtZXRhZGF0YRYCDgAAAHdoaXRlbGlzdF9maWxlFgIOAAAAc2VsZWN0ZWRfaW5kZXgBBgAAAAoAAABiYWxhbmNlX29mAhQAAgAAAAYAAABfZHVtbXkIBAAAAG5vZGULBAsAAABjaGVja19vd25lcgIUAAEAAAAFAAAAdG9rZW4dABQAAQAAAAcAAABhZGRyZXNzFQIAAAAEAAAATm9uZQIEAAAAU29tZQEBAAAAFgIJAAAAY2xhaW1fbmZ0BBQABQAAAAUAAABwcm9vZhACFgIEAAAAbm9kZQsLAAAAbm9kZV9zdHJpbmcWAg4AAABzZWxlY3RlZF90b2tlbh0AEAAAAGFtb3VudF9vZl90b2tlbnMEFQgAAAAPAAAATkZUTGltaXRSZWFjaGVkAhUAAABBZGRyZXNzTm90T25XaGl0ZWxpc3QCEAAAAEFpcmRyb3BOb3dDbG9zZWQCEwAAAE1pbnRpbmdMb2dNYWxmb3JtZWQCDgAAAE1pbnRpbmdMb2dGdWxsAhQAAABNZXRhRGF0YUxvZ01hbGZvcm1lZAIPAAAATWV0YURhdGFMb2dGdWxsAhMAAABJbmRleEFscmVhZHlDbGFpbWVkAg4AAABjdXJyZW50X3N1cHBseQEEDAAAAHRvdGFsX3N1cHBseQEEBAAAAHZpZXcBFAADAAAACAAAAG1ldGFkYXRhFgIJAAAAd2hpdGVsaXN0FgIOAAAAbnVtYmVyX29mX25mdHMEAA

Please see https://www.youtube.com/watch?v=J-SP_ptKu_I&t=1999s for an example on how to use these contracts.

*External contract functions:*

Init:  This initialises the nft.    

This takes an InitParams structure which contains:
    whitelist - a vector of address.  Leave empty if there is no whitelist required.
    nft_limit - the maximum amount of nfts that can be claimed.  Leave 0 for no limit.
    nft_limit_per_address - the maximum amount of nfts that can be claimed per address.  Leave 0 for no limit.
    nft_time_limit - the time at which the airdrop will end.
    reserve - the amount of nfts which will be held back for the whitelist.  Leave 0 for no reserve.
    base_url - the base url for the nft
    metadata - the IPFS link for the metadata file
    whitelist_file - the IPFS link for the whitelist file
    selected_index - boolean which determines whether claimined specific NFTs is supported


contract_claim_nft:  this claims a specified amount of tokens.

This takes a MintParams structure which contains:
    proof - the merkle proof for the claiming node.  Can be blank if no whitelist is in use for this claim.
    node - the address of the claiming node
    node_string - the address of the claiming node in string format
    selected_token - the ID of the token being claimed
    amount_of_tokens - the amount of tokens being claimed

view:   Returns the metadata, whiteslist and number of claimed NFTs

balance_of: Returns the amount of tokens claimed by the specified address.

This takes a BalanceParam structure which contains:
    dummy: an integer which is always set to 0
    node: the address being queries

total_supply: Returns the amount of claimable tokens

current_supply: Returns the amount of tokens that are currently claimable

check_owner: Returns the owner of the specified token

This takes a TokenParam structure which contains:
    token - the token ID being queried.

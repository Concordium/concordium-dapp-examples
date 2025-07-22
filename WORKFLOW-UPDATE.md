## Questions

### Directories triggering docker builds 

The build of gallery, sponsoredTransactions, and sponsoredTransactionsAuction docker images uses `.` as the working directory - do builds of these need to trigger based on changes in the repo root or only from their own directory? 

gallery, sponsoredTransactions, sponsoredTransactionsAuction: it looks like these use `.deps/concordium-rust-sdk`


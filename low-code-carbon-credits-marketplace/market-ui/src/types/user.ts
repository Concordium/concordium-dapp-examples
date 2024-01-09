export type User = {
    account: string;
    accountType: AccountType;
    email: string
}

export type AccountType = "wallet" | "email" | "";
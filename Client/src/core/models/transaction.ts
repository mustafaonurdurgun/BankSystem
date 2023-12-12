import { Account } from "./account";
import { Entity } from "./entity.model";
import { UserTransactions } from "./usertransactions";

export class Transaction extends Entity<number> {
    amount?: number;
    description?: string;
    accountID?: number;
    account?: Account;
    userTransactions?: UserTransactions[];
}
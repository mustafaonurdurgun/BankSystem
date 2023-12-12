import { Transaction } from "./transaction";
import { User } from "./user.model";

export class UserTransactions {
    userTransactionsID?: number;
    userID?: number;
    user?: User;
    transactionID?: number;
    transaction?: Transaction;
}
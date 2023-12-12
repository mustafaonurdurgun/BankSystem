import { Entity } from "./entity.model";
import { Transaction } from "./transaction";
import { User } from "./user.model";

export class Account extends Entity<number> {
  balance?: number;
  userId?: number;
  user?: User;
  transactions?: Transaction[];
}
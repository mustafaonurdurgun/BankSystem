import { Account } from "./account";
import { Entity } from "./entity.model";
import { UserTransactions } from "./usertransactions";

export class User extends Entity<number> {
  email?: string;
  userName?: string;
  firstName?: string;
  age?: number;
  lastName?: string;
  imagePath?: string;
  identityNumber?: string;
  password?:string
  userType?: UserType;
  userTransactions?: UserTransactions[];
  accounts?: Account[];
}

export enum UserType {
  Admin,
  User,
  Employee
}
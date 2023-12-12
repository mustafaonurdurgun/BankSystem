export interface RegisterRequest {
  Email: string;
  UserName: string;
  FirstName: string;
  LastName: string;
  Age: number;
  Password: string;
  imagePath: string;
  identityNumber:string;
  UserType: UserType;
}
export enum UserType {
  Admin,
  User,
  Employee
}

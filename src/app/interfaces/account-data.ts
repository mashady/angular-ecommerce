import { Address } from "./address";

export interface AccountData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: Address;
  role: string;
}

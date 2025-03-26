import { Address } from "./address";

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  provider: string;
  role: string;
  isVerified: boolean;
  AdministrativeStatus: string;
  address: Address[];
  orders: any[];
  reviews: any[];
  store: any | null;
  createdAt: string;
  updatedAt: string;
}

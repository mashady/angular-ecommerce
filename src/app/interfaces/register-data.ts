import { Address } from "./address";

export interface RegisterData {
  firstName: string;
    lastName: string;
    email: string;
    password: string;
    rePassword?: string;
    phoneNumber: string;
    address: Address;
    role: 'user' | 'seller';
}

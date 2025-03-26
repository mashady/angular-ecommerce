import { Address } from "./address";

export interface UpdateAccountData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  role?: string;
  isVerified?: boolean;
  AdministrativeStatus?: string;
  address?: Address[];
}

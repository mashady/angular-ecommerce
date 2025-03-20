export interface Account {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  store: null;
  provider: string;
  role: string;
  isVerified: boolean;
  AdministrativeStatus: string;
  createdAt: Date;
  updatedAt: Date;
  orders: any[];
  reviews: any[];
}

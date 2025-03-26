export interface Coupon {
    _id?: string;
    name: string;
    value: number;
    addedBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CouponResponse {
    Message: string;
    Promocodes: Coupon[];
}

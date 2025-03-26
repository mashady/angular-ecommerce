export interface Banner {
    _id?: string;
    title: string;
    description: string;
    images: string[];
    addedBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface BannerResponse {
    Message: string;
    banners: Banner[];
}
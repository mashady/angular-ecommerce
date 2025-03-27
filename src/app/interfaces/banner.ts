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

export interface BannersResponse {
    Message: string;
    banners: Banner[];
}

export interface BannerResponse {
  message: string;
  reqBanner: Banner;
}

export interface BannerIdResponse {
  message: string;
  existingBanner: Banner;
}

export interface updateBannerResponse {
    message: string;
    updatedBanner: Banner;
}

export interface deleteBannerResponse {
    message: string;
    deletedBanner: Banner;
}

export interface addBannerResponse {
    message: string;
    addedBanner: Banner;
}
    

    
  
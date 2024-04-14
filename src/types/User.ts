export  type ProfileImage = {
    id: number;
    urls: {
      additionalProp1: string;
      additionalProp2: string;
      additionalProp3: string;
    };
  };

  export type User = {
    id: string;
    name: string;
    email: string;
    phone: string;
    username: string;
    timezone: string;
    is_active: boolean;
    last_presence: {
      date: string;
      time_ago: string;
    };
    created_at: string;
    updated_at: string;
    deleted_at: string;
    profile_image: ProfileImage | null;
    access_token: string;
    refresh_token: string;
  };
export interface Profile {
  id: string;
  created_at: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface AddProfile {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface UpdateProfile {
  id: string;
  user: Profile;
}

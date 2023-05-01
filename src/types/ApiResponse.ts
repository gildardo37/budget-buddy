export interface Profile {
  id: string;
  created_at: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface AddProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface UpdateProfile {
  id: string;
  user: Profile;
}

export interface Login {
  email: string;
  password: string;
}

export interface Budget {
  id: string;
  created_at: Date;
  description: string;
  ammount: number;
  profile_id: string;
}

export interface AddBudget {
  description: string;
  ammount: number;
}

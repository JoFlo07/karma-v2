export interface Action {
  action: string;
  category: string;
  difficulty: string;
  exp_points: number;
}

export interface User {
  username: string;
  email: string;
  password: string;
}

export interface ToGetUsers {
  id: number;
  username: string;
  password: string;
  token?: string;
}

export interface UserInfo {
  username: string;
  password: string;
}

export interface ForToken {
  authorization: string;
}

export interface IntoGetUsers {
  message: string;
  data: null | Array<ToGetUsers> | ToGetUsers;
}

export interface ToServiceGetusers {
  json: IntoGetUsers;
  status: number;
}

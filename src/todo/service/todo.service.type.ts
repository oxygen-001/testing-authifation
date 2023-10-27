export interface ToGetTodos {
  id: number;
  title: string;
  text: string;
  isCompleted: boolean;
  photo: string;
}

export interface IntoGetUsers {
  message: string;
  data: null | Array<ToGetTodos> | ToGetTodos | [];
}

export interface ToServiceGetTodos {
  json: IntoGetUsers;
  status: number;
}

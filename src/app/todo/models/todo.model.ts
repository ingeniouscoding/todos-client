export interface Todo {
  id: string;
  content: string;
  isComplete: boolean;
}

export interface CreateTodoDto {
  content: string;
}

export interface UpdateTodoDto {
  content?: string;
  isComplete?: string;
}

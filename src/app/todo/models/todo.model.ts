export interface TodoDto {
  id: string;
  content: string;
  isComplete: boolean;
}

export interface Todo extends TodoDto {
  isPending?: boolean;
}

export interface CreateTodoDto {
  content: string;
}

export interface UpdateTodoDto {
  id: string;
  content?: string;
  isComplete?: boolean;
}

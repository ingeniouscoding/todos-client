export interface TodoDto {
  id: string;
  content: string;
  isComplete: boolean;
}

export interface Todo extends TodoDto {
  isPending?: boolean;
  errorMessage: string | null;
}

export interface CreateTodoDto {
  id: string;
  content: string;
}

export interface UpdateTodoDto {
  id: string;
  content?: string;
}

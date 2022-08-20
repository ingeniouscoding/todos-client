export interface TodoDto {
  guid: string;
  content: string;
  isComplete: boolean;
}

export interface Todo extends TodoDto {
  isPending?: boolean;
  error?: string;
}

export interface CreateTodoDto {
  guid: string;
  content: string;
}

export interface UpdateTodoDto {
  guid: string;
  content?: string;
  isComplete?: boolean;
}

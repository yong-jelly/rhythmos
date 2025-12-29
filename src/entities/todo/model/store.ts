import { create } from "zustand";
import type { Todo } from "@/shared/types";

interface TodoState {
  todos: Todo[];
  isLoading: boolean;
  addTodo: (content: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  fetchTodos: () => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  isLoading: false,
  addTodo: (content: string) => {
    const newTodo: Todo = {
      id: Math.random().toString(36).substring(7),
      content,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ todos: [newTodo, ...state.todos] }));
  },
  toggleTodo: (id: string) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  },
  deleteTodo: (id: string) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },
  fetchTodos: () => {
    set({ isLoading: true });
    // 초기 모의 데이터
    const mockTodos: Todo[] = [
      { id: "1", content: "비타민 챙겨먹기", completed: true, createdAt: new Date().toISOString() },
      { id: "2", content: "부모님께 안부 전화하기", completed: false, createdAt: new Date().toISOString() },
      { id: "3", content: "오늘의 일기 한 줄 작성", completed: false, createdAt: new Date().toISOString() },
    ];
    set({ todos: mockTodos, isLoading: false });
  },
}));


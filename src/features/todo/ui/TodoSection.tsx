import { useEffect, useState } from "react";
import { useTodoStore } from "@/entities/todo";
import { TodoItem } from "./TodoItem";
import { Input } from "@/shared/ui";
import { Plus } from "lucide-react";

export function TodoSection() {
  const { todos, fetchTodos, addTodo, toggleTodo, deleteTodo } = useTodoStore();
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo("");
    }
  };

  return (
    <div className="px-6 mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[20px] font-black tracking-tight">오늘의 할일</h2>
        <span className="text-[13px] font-bold text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
          {todos.filter(t => !t.completed).length}개 남음
        </span>
      </div>

      <div className="bg-white rounded-[32px] p-4 shadow-sm border border-border/40">
        <form onSubmit={handleAdd} className="flex gap-2 mb-4">
          <Input 
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="새로운 할일을 입력하세요..."
            className="flex-1 rounded-2xl h-12 bg-secondary/30 border-none focus-visible:ring-1"
          />
          <button 
            type="submit"
            className="w-12 h-12 rounded-2xl bg-foreground text-background flex items-center justify-center hover:scale-105 transition-transform"
          >
            <Plus className="h-6 w-6" />
          </button>
        </form>

        <div className="space-y-1">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <TodoItem 
                key={todo.id} 
                todo={todo} 
                onToggle={toggleTodo} 
                onDelete={deleteTodo} 
              />
            ))
          ) : (
            <p className="text-center py-8 text-muted-foreground text-[14px]">
              오늘 할일이 아직 없어요. 새로운 리듬을 시작해보세요!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}


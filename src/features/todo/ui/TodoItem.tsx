import type { Todo } from "@/shared/types";
import { Checkbox } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { Trash2 } from "lucide-react";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center justify-between group py-3 px-4 rounded-2xl transition-colors hover:bg-secondary/50">
      <div className="flex items-center gap-4 flex-1">
        <Checkbox 
          checked={todo.completed} 
          onCheckedChange={() => onToggle(todo.id)} 
        />
        <span className={cn(
          "text-[15px] font-bold transition-all",
          todo.completed ? "text-muted-foreground line-through opacity-50" : "text-foreground"
        )}>
          {todo.content}
        </span>
      </div>
      <button 
        onClick={() => onDelete(todo.id)}
        className="p-2 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive transition-all"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}


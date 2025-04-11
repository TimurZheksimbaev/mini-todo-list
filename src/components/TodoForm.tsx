import { useState, useCallback, memo } from "react";
import { Plus } from "lucide-react";

interface TodoFormProps {
  onAddTodo: (text: string) => void;
}

// компонент для добавления новой задачи
export const TodoForm = memo(({ onAddTodo }: TodoFormProps) => {
  const [text, setText] = useState("");

  const handleSubmit = useCallback(() => {
    if (text.trim() === "") return;

    onAddTodo(text.trim());
    setText("");
  }, [text, onAddTodo]);

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
    },
    []
  );

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return (
    <div className="mb-6 flex">
      <input
        type="text"
        placeholder="Добавить новую задачу..."
        value={text}
        onChange={handleTextChange}
        onKeyDown={handleKeyPress}
        className="flex-1 py-2 px-3 rounded-l border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 flex items-center"
      >
        <Plus size={18} className="mr-1" /> Добавить
      </button>
    </div>
  );
});

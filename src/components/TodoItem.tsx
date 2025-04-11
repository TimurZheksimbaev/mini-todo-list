import { useState, memo, useCallback } from "react";
import { CheckCircle, Circle, Edit, Trash2, Save, X } from "lucide-react";
import { Todo } from "../types/";

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

// компонент для отображения задания
export const TodoItem = memo(
  ({ todo, onToggleComplete, onDelete, onEdit }: TodoItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    // Используем useCallback для предотвращения лишних рендеров
    const handleToggle = useCallback(() => {
      onToggleComplete(todo.id);
    }, [todo.id, onToggleComplete]);

    const handleDelete = useCallback(() => {
      onDelete(todo.id);
    }, [todo.id, onDelete]);

    const startEditing = useCallback(() => {
      setIsEditing(true);
      setEditText(todo.text);
    }, [todo.text]);

    const cancelEditing = useCallback(() => {
      setIsEditing(false);
    }, []);

    const saveEdit = useCallback(() => {
      if (editText.trim() === "") return;
      onEdit(todo.id, editText.trim());
      setIsEditing(false);
    }, [editText, todo.id, onEdit]);

    const handleTextChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditText(e.target.value);
      },
      []
    );

    // Отображаем инпут когда редактируем задание
    if (isEditing) {
      return (
        <li className="flex items-center justify-between p-3 border rounded bg-white">
          <div className="flex-1 flex items-center space-x-2">
            <input
              type="text"
              value={editText}
              onChange={handleTextChange}
              className="flex-1 py-1 px-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              autoFocus
            />
            <button
              onClick={saveEdit}
              className="text-green-500 hover:text-green-700"
            >
              <Save size={18} />
            </button>
            <button
              onClick={cancelEditing}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={18} />
            </button>
          </div>
        </li>
      );
    }

    return (
      <li
        className={`flex items-center justify-between p-3 border-1 border-gray-200 shadow-xl rounded-xl ${
          todo.completed ? "bg-gray-50" : "bg-white"
        }`}
      >
        <div className="flex items-center flex-1">
          <button onClick={handleToggle} className="mr-2">
            {todo.completed ? (
              <CheckCircle size={20} className="text-green-500" />
            ) : (
              <Circle size={20} className="text-gray-400" />
            )}
          </button>
          <span
            className={`flex-1 ${
              todo.completed ? " text-gray-500" : "text-gray-800"
            }`}
          >
            {todo.text}
          </span>
        </div>
        <div className="flex items-center ml-4 space-x-2">
          <button
            onClick={startEditing}
            className="text-blue-500 hover:text-blue-700"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </li>
    );
  }
);

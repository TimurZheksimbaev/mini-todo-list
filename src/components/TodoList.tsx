import { useState, useEffect, useCallback, useMemo } from "react";
import { Todo, FilterStatus } from "../types";
import { TodoStorage } from "../services";
import { TodoForm, TodoFilters, TodoItem } from "./";

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>(() => TodoStorage.getTodos());
  const [filter, setFilter] = useState<FilterStatus>("all");

  // Сохранение задач при изменении
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      TodoStorage.saveTodos(todos);
    }, 300); // Для предотвращения частой записи в localStorage

    return () => clearTimeout(saveTimeout);
  }, [todos]);

  // Мемоизируем функции для заданий, чтобы сохранялись при ререндерах
  const handleAddTodo = useCallback((text: string) => {
    const newTodo = TodoStorage.createTodo(text);
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }, []);

  const handleDeleteTodo = useCallback((id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  const handleToggleComplete = useCallback((id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const handleEditTodo = useCallback((id: string, text: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  }, []);

  const handleFilterChange = useCallback((newFilter: FilterStatus) => {
    setFilter(newFilter);
  }, []);

  // Мемоизируем фильтрацию и сортировку
  const filteredAndSortedTodos = useMemo(() => {
    const filtered = TodoStorage.filterTodos(todos, filter);
    return TodoStorage.sortByDate(filtered);
  }, [todos, filter]);

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Todo List
      </h1>

      <TodoForm onAddTodo={handleAddTodo} />

      <TodoFilters filter={filter} onFilterChange={handleFilterChange} />

      <ul className="space-y-2">
        {filteredAndSortedTodos.length === 0 ? (
          <li className="text-center text-gray-500 py-4">Нет задач</li>
        ) : (
          filteredAndSortedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
            />
          ))
        )}
      </ul>
    </div>
  );
};

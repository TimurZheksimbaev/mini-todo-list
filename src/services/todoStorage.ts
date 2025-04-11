import { Todo, FilterStatus } from "../types";

const STORAGE_KEY = "todos";

// Серсив для работы с локал сторэджем
export const TodoStorage = {

  // получаем задания
  getTodos: (): Todo[] => {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    return savedTodos
      ? JSON.parse(savedTodos, (key, value) => {
          if (key === "createdAt") return new Date(value);
          return value;
        })
      : [];
  },

  // сохраняем задания
  saveTodos: (todos: Todo[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },

  // создаем задания
  createTodo: (text: string): Todo => {
    return {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
    };
  },

  // фильтруем по статусу: all, completed, active
  filterTodos: (todos: Todo[], filter: FilterStatus): Todo[] => {
    if (filter === "all") return todos;
    return todos.filter((todo) =>
      filter === "completed" ? todo.completed : !todo.completed
    );
  },

  // сортиурем по дате добавления задания
  sortByDate: (todos: Todo[]): Todo[] => {
    return [...todos].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  },
};

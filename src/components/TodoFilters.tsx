import { memo, useCallback } from "react";
import { FilterStatus } from "../types";

interface TodoFiltersProps {
  filter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
}

// компонент для фильтрации задач
export const TodoFilters = memo(
  ({ filter, onFilterChange }: TodoFiltersProps) => {
    // Мемоизируем функцию фильтров
    const handleFilter = useCallback(
      (status: FilterStatus) => {
        onFilterChange(status);
      },
      [onFilterChange]
    );

    const buttons = [
      { label: "Все", value: "all" },
      { label: "Активные", value: "active" },
      { label: "Выполненные", value: "completed" },
    ];

    return (
      <div className="flex mb-4">
        <div className="space-x-2">
          {buttons.map((button) => (
            <button
              key={button.value}
              onClick={() => handleFilter(button.value as FilterStatus)}
              className={`px-3 py-1 rounded text-sm ${
                filter === button.value
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    );
  }
);

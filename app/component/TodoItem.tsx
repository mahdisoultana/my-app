import confetti from 'canvas-confetti';
import { Reorder } from 'framer-motion';

export const TodoItem = ({
  todos,
  setTodos,
}: {
  todos: string[];
  setTodos: (todos: string[]) => void;
}) => {
  const handleReorderEnd = () => {
    confetti({
      particleCount: 10,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'],
    });
  };

  return (
    <Reorder.Group
      as="ul"
      axis="y"
      values={todos}
      onReorder={setTodos}
      className="space-y-3 w-full max-w-md mx-auto mt-4"
    >
      {todos.map((todo, index) => (
        <Reorder.Item
          key={todo}
          value={todo}
          as="li"
          onDragEnd={handleReorderEnd}
          className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200 cursor-grab active:cursor-grabbing"
        >
          <div className="flex items-center flex-1">
            <span className="w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full mr-3 text-sm font-medium">
              {index + 1}
            </span>
            <span className="flex-1 text-gray-800 dark:text-gray-200">
              {todo}
            </span>
          </div>

          <button
            className="ml-2 p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
            aria-label="Delete todo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};

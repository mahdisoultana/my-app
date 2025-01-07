import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Input = ({
  setTodos,
}: {
  setTodos: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [todo, setTodo] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Calculate movement based on mouse position
  const calculateMovement = () => {
    if (!mousePosition) return { x: 0, y: 0 };

    // Calculate distance from center
    const centerX = 200;
    const centerY = 25;

    // Calculate distance from mouse to center
    const deltaX = mousePosition.x - centerX;
    const deltaY = mousePosition.y - centerY;

    // Calculate distance using Pythagorean theorem
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Only move if mouse is within 150px
    const threshold = 150;
    if (distance < threshold) {
      // Calculate movement intensity based on proximity
      const intensity = (threshold - distance) / threshold;

      // Move faster when closer
      const moveX = -deltaX * intensity * 2;
      const moveY = -deltaY * intensity * 2;

      return {
        x: moveX,
        y: moveY,
      };
    }

    return { x: 0, y: 0 };
  };

  // Add fireworks effect when typing "mahdi"
  useEffect(() => {
    if (todo.toLowerCase() === 'mahdi') {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const fireworks = () => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) return;

        confetti({
          particleCount: 50,
          angle: randomInRange(60, 120),
          spread: randomInRange(50, 70),
          origin: { y: 0.6 },
          colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'],
        });

        requestAnimationFrame(fireworks);
      };

      fireworks();
    }
  }, [todo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo.trim()) {
      setTodos((prev) => [...prev, todo]);
      setTodo('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div
        className="flex flex-col gap-3 p-6 rounded-lg shadow-md relative"
        onMouseMove={handleMouseMove}
        style={{ height: '200px' }}
      >
        <label htmlFor="todo" className="text-lg font-semibold text-gray-700">
          Add New Task
        </label>
        <div className="flex gap-2">
          <motion.div
            className="relative flex-1"
            animate={calculateMovement()}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 15,
            }}
          >
            <div className="absolute inset-0.5 rounded-lg bg-gray-800" />
            <input
              type="text"
              id="todo"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Enter your task..."
              className="relative w-full px-4 py-2 bg-transparent text-white placeholder-gray-400 rounded-lg focus:outline-none"
            />
          </motion.div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add
          </motion.button>
        </div>
      </div>
    </form>
  );
};

export default Input;

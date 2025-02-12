// components/Popup.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';

interface Meal {
  id: string;
  name: string;
}

interface PopupProps {
  data: Meal[];
  onClose: () => void; // Function to close the popup
}

const Popup = ({ data, onClose }: PopupProps) => {
  const [selectedWeek, setSelectedWeek] = useState<string | null>(null);
  const [selectedPizzas, setSelectedPizzas] = useState<string[]>([]);

  const handleWeekChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWeek(event.target.value);
    setSelectedPizzas([]); // Reset selected pizzas when week changes
  };

  const handlePizzaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const options = event.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedPizzas(selected);
  };

  const handleSave = () => {
    console.log('Selected Week:', selectedWeek);
    console.log('Selected Pizzas:', selectedPizzas);
    // You can add your save logic here
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 text-black">Select Week and Pizzas</h2>
        <div className="mb-4">
          <label htmlFor="week" className="block text-sm font-medium text-black">
            Week
          </label>
          <select
            id="week"
            onChange={handleWeekChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
          >
            <option value="">Select a week</option>
            <option value="Week 1">Week 1</option>
            <option value="Week 2">Week 2</option>
            <option value="Week 3">Week 3</option>
            <option value="Week 4">Week 4</option>
          </select>
        </div>

        {selectedWeek && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <label htmlFor="pizza" className="block text-sm font-medium text-black">
              Pizzas
            </label>
            <select
              id="pizza"
              multiple
              onChange={handlePizzaChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
            >
              {data && data.length > 0 ? (
                data.map((meal: Meal) => (
                  <option key={meal.id} value={meal.name} className="text-black">
                    {meal.name}
                  </option>
                ))
              ) : (
                <option disabled>No pizzas available</option>
              )}
            </select>
          </motion.div>
        )}

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-[#9B9B9B] text-white px-4 py-2 rounded-md hover:bg-[#7A7A7A]"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Popup;
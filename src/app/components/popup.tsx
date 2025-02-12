import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setSelectedMealsForWeek } from "@/redux/slice/meals.slice";
import StackedNotifications from "./stackednotification";
import { NotificationType } from "../helper/interface";

interface Meal {
  id: string;
  name: string;
}

interface PopupProps {
  data: Meal[];
  onClose: () => void;
}

const Popup = ({ data, onClose }: PopupProps) => {
  const dispatch = useDispatch();
  const weekMeals: any = useSelector((state: RootState) => state.meal);

  const [selectedWeek, setSelectedWeek] = useState<string | null>(null);
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  useEffect(() => {
    if (selectedWeek) {
      const preSelected = weekMeals[selectedWeek] || [];
      setSelectedMeals(preSelected);
    }
  }, [selectedWeek, weekMeals]);

  const handleWeekChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWeek(event.target.value);
  };

  const handleMealsChange = (meal: any) => {
    setSelectedMeals((prevSelected: any) =>
      prevSelected.some((m: any) => m.id === meal.id)
        ? prevSelected.filter((m: any) => m.id !== meal.id)
        : [...prevSelected, meal]
    );
  };

  const handleSave = () => {
    if (!selectedWeek) {
      setNotification({
        id: Date.now(),
        text: 'Please select a week first!',
        type: "error",
      });
      return;
    }
    if (selectedMeals?.length === 0) {
      setNotification({
        id: Date.now(),
        text: 'Please select a meal first!',
        type: "error",
      });
      return;
    }

    

    dispatch(
      setSelectedMealsForWeek({ week: selectedWeek, meals: selectedMeals })
    );
    onClose();
  };

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
       <StackedNotifications
              notification={notification}
              setNotification={setNotification}
            />
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

        <h2 className="text-xl font-bold mb-4 text-black">
          Select Week and Pizzas
        </h2>

        {/* Week Dropdown */}
        <div className="mb-4">
          <label
            htmlFor="week"
            className="block text-sm font-medium text-black"
          >
            Week
          </label>
          <select
            id="week"
            onChange={handleWeekChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
          >
            <option value="">Select a week</option>
            <option value="weekOne">Week 1</option>
            <option value="weekTwo">Week 2</option>
            <option value="weekThree">Week 3</option>
            <option value="weekFour">Week 4</option>
          </select>
        </div>

        {/* Pizza Checkboxes */}
        {selectedWeek && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <label className="block text-sm font-medium text-black">
              Meals
            </label>
            <div className="mt-2 h-40 overflow-auto border border-black p-2">
              {data.length > 0 ? (
                data.map((meal) => (
                  <div key={meal.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={meal.id}
                      checked={selectedMeals.some((m: any) => m.id === meal.id)} // ✅ Check by meal.id
                      onChange={() => handleMealsChange(meal)} // ✅ Pass full meal object
                      className="text-black"
                    />
                    <label htmlFor={meal.id} className="text-black">
                      {meal.name}
                    </label>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No pizzas available</p>
              )}
            </div>
          </motion.div>
        )}

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-[#004370] text-white px-4 py-2 rounded-md hover:bg-[#004370cf]"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Popup;

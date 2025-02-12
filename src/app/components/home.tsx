"use client";
import { fetchMeals, setRemoveMealFromWeek, setResetWeekSuccess } from "@/redux/slice/meals.slice";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { IoMdStar } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import StackedNotifications from "@/app/components/stackednotification";
import { NotificationType } from "../helper/interface";
import { motion } from "motion/react";
import Popup from "./popup";
import { RiDeleteBin5Line } from "react-icons/ri";
import Loader from "./loader";

const HomePage = () => {
  const { MealsData, weekOne, weekTwo, weekThree, weekFour, WeekSuccess, Loading } = useSelector((state: RootState) => state.meal);
  const [activeTab, setActiveTab] = useState("All Meals");
  const tabs = ["All Meals", "Week 1", "Week 2", "Week 3", "Week 4"];
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const [buttonOpen, setButtonOpen] = useState<Boolean>(false)
  const dispatch : any = useDispatch();
  const fetchData = useCallback(() => {
    dispatch(fetchMeals({}));
  }, [dispatch]);

  const weekMeals : any = {
    "Week 1": weekOne,
    "Week 2": weekTwo,
    "Week 3": weekThree,
    "Week 4": weekFour,
  };
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
  if(WeekSuccess){
  setNotification({
    id: Date.now(),
    text: WeekSuccess,
    type: "success",
  });
  dispatch(setResetWeekSuccess())
  }
  },[WeekSuccess])


  const displayedMeals = activeTab === "All Meals" ? MealsData : weekMeals[activeTab] || [];

  const handleRemoveMeal = (mealId: number) => {
    dispatch(setRemoveMealFromWeek({ week: activeTab, mealId }));
    setNotification({
      id: Date.now(),
      text: `Meal successfully removed from ${activeTab}. Your weekly plan is now updated!`,
      type: "success",
    });
  };

  const handleTriggerButton = () => {
  setButtonOpen(true)  
  }

  const handleOnClose = () => {
    setButtonOpen(false)
  }

  if(Loading)
    return <Loader />

  return (
    <div className="h-full min-h-screen ">
         <StackedNotifications
              notification={notification}
              setNotification={setNotification}
            />
      <div className="bg-white">
  <div className="relative w-full h-[35vh] flex justify-center items-center">
    {/* Background Image */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: "url('/pizza.webp')" }}
    ></div>

    {/* White Overlay */}
    <div className="absolute inset-0 bg-white opacity-70"></div>

    {/* Text Content */}
    <div className="relative z-10 flex flex-col justify-center items-center text-[35px] text-[#222222] font-semibold">
    <h1 className="max-w-3xl px-4 text-center text-5xl leading-snug">
        Optimized Your
        <span className="relative ml-4">
         Meal
         <svg
             viewBox="20 0 190 100"
            fill="none"
            className="absolute -left-2 -right-2 -top-2 bottom-0 translate-y-1"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{
                duration: 1.25,
                ease: "easeInOut",
              }}
              d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
              stroke="#FACC15"
              strokeWidth="3"
            />
          </svg>
        </span>
      </h1>
      <span className="text-[14px] text-[#222222] flex justify-center items-center font-medium">
        Select Meal to Add in Week. You will be able to edit. modify and
        change the Meal Weeks.
      </span>
    </div>
  </div>
</div>
      <div className="mx-48 py-4 ">
        <p className="text-[25px] text-[#191919] font-semibold"> Week Orders</p>
      </div>
      <div className="w-full p-6 bg-white">
        <div className="flex justify-center gap-28 my-4 ">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-t-lg transition-colors duration-200 text-[14px] font-semibold ${
                activeTab === tab
                  ? "border-b-[4px] border-[#004370] text-[#004370]"
                  : " text-[#1E1E1E]"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
         <button onClick={() =>handleTriggerButton()} className="px-6 py-2 font-medium bg-[#004370] text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
        Add to Week
      </button>
        </div>
      </div>
      <div className="flex justify-center py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-[1200px]">
  {displayedMeals.length > 0 ? displayedMeals.map((meal : any, i : number) => (
    <div key={i} className="flex justify-center cursor-pointer relative">
      <div className="flex flex-col rounded-lg p-4 bg-white border-2 hover:border-[#004370] w-full sm:w-[90%] md:w-[80%] lg:w-[90%] gap-2 shadow-lg relative">
      {activeTab !== "All Meals" && (
          <button 
            className="absolute top-6 left-6 bg-red-200 text-white p-1"
            onClick={() => handleRemoveMeal(meal.id)}
          >
            <RiDeleteBin5Line className="text-red-600 text-xl"/>
          </button>
        )}

      

        <p className="text-white bg-black px-6 rounded-lg absolute right-6 top-6 w-[7rem] text-center font-semibold text-[13px]">
          {meal.mealType?.[0] || "Unknown"}
        </p>
        
        <Image
          src={meal.image || "/pizza.webp"}
          height={220}
          width={370}
          alt={meal.name || "Meal"}
          className="rounded-xl w-full h-[220px] object-cover"
        />
        
        <div className="flex h-full justify-between flex-col">
          <div>
            <h2 className="text-[24px] text-[#191919] font-bold">{meal.name}</h2>
            <p className="text-[13px] text-[#191919] text-medium">
              {meal.instructions?.join(" ") || "No instructions available."}
            </p>
          </div>
          
          <div className="flex mt-2 justify-between">
            <p className="text-[13px] text-[#191919] font-bold">
              Cuisine:{" "}
              <span className="text-[13px] text-[#191919] font-medium">
                {meal.cuisine || "Unknown"}
              </span>
            </p>
            <p className="text-[13px] text-[#191919] font-bold flex gap-1 items-center">
              Rating:
              <span className="text-[13px] text-[#191919] font-medium">
                {meal.rating || "N/A"}
              </span>
              {[...Array(Math.max(0, Math.round(meal.rating || 0)))].map((_, starIndex) => (
                <IoMdStar key={starIndex} className="w-[17px] h-[17px] text-[#004370]" />
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  )) : <p className="text-lg h-full text-gray-600 font-semibold text-center col-span-full">
  No meals found for {activeTab}.
</p>}
</div>

</div>
{buttonOpen &&
<Popup data={MealsData} onClose={handleOnClose} />}
    </div>
  );
};

export default HomePage;
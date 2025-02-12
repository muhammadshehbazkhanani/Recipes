"use client";
import { fetchMeals } from "@/redux/slice/meals.slice";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoMdStar } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";


const HomePage = () => {
  const { MealsData } = useSelector((state: RootState) => state.meal);
  const [activeTab, setActiveTab] = useState("All Meals");
  const tabs = ["All Meals", "Week 1", "Week 2", "Week 3", "Week 4"];
  const dispatch : any = useDispatch()
  useEffect(() => {
    dispatch(fetchMeals({}))

  },[])

  return (
    <div className="bg-gradient-to-b from-[#f8e5e5] via-[#f1f5ff] to-[#dff1f1]">
      <div className="bg-white">
  <div className="relative w-full h-[40vh] flex justify-center items-center">
    {/* Background Image */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: "url('/pizza.webp')" }}
    ></div>

    {/* White Overlay */}
    <div className="absolute inset-0 bg-white opacity-70"></div>

    {/* Text Content */}
    <p className="relative z-10 flex flex-col justify-center items-center text-[50px] text-[#222222] font-bold">
      Optimized Your Meal
      <span className="text-[16px] text-[#222222] flex justify-center items-center font-medium">
        Select Meal to Add in Week. You will be able to edit, modify, and
        change the Meal Weeks.
      </span>
    </p>
  </div>
</div>
      <div className="mx-48 py-4 ">
        <p className="text-[30px] text-[#191919] font-semibold"> Week Orders</p>
      </div>
      <div className="w-full p-4 bg-white">
        <div className="flex justify-center gap-20 my-4 ">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-t-lg transition-colors duration-200 text-[16px] font-semibold ${
                activeTab === tab
                  ? "border-b-[4px] border-[#004370] text-[#004370]"
                  : " text-[#1E1E1E]"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
          <button className="bg-[#9B9B9B] text-white font-semibold px-8 py-2 rounded-lg">
            Add to Week
          </button>
        </div>
      </div>
      <div className="flex justify-center py-5">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-[1200px]">
    {MealsData.map((meal, i) => (
      <div key={i} className="flex justify-center">
        <div className="flex flex-col rounded-lg p-4 bg-white w-full sm:w-[90%] md:w-[80%] lg:w-[90%] gap-2 relative shadow-lg">
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
          <h2 className="text-[24px] text-[#191919] font-bold">{meal.name}</h2>
          <p className="text-[13px] text-[#191919] text-medium">
            {meal.instructions?.join(" ") || "No instructions available."}
          </p>
          <div className="flex justify-between">
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
    ))}
  </div>
</div>


      
    </div>
  );
};

export default HomePage;
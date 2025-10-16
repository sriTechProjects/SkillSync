import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { fetchSkills } from "@/features/skills/skillSlice";
import SkillCard from "@/components/common/SkillCard";

const SkillsMarketplace: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { skills, isLoading } = useSelector((state: RootState) => state.skills);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(fetchSkills()).finally(() => setIsRefreshing(false));
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Marketplace</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Browse available skills and book sessions.
          </p>
        </div>
        <button
          onClick={handleRefresh}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Loading / Empty / Grid */}
      {isLoading && !isRefreshing ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
        </div>
      ) : skills.length === 0 ? (
        <div className="text-center p-10 bg-white dark:bg-slate-800 border border-dashed border-gray-300 dark:border-slate-600 rounded-2xl">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            No skills available yet. Click refresh to load again.
          </p>
          <button
            onClick={handleRefresh}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Refresh
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          {skills.map((skill) => (
            <SkillCard key={skill.id} item={skill} />
          ))}
        </div>
      )}
    </>
  );
};

export default SkillsMarketplace;

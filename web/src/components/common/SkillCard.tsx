import React from "react";
import type { Skill } from "@/interface/skill";
import { Lightbulb, User, Tag, CreditCard } from "lucide-react";

interface SkillCardProps {
  item: Skill;
}

const SkillCard: React.FC<SkillCardProps> = ({ item }) => {
  return (
    <div className="flex flex-col justify-between h-full bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Title */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
          <Lightbulb className="text-yellow-500 dark:text-yellow-400 w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 leading-snug">
          {item.title}
        </h3>
      </div>

      {/* Description */}
      {item.description ? (
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-5 line-clamp-3">
          {item.description}
        </p>
      ) : (
        <p className="text-gray-400 italic text-sm mb-5">
          No description provided.
        </p>
      )}

      {/* Meta Info */}
      <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-5">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-400" />
          <span>{item.username || "Unknown user"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-gray-400" />
          <span>{item.categoryName || "Uncategorized"}</span>
        </div>
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-gray-400" />
          <span>{item.credits} credits</span>
        </div>
      </div>

      {/* Action Button */}
      <button className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none">
        Book Session
      </button>
    </div>
  );
};

export default SkillCard;

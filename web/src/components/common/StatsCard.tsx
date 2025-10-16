import React from 'react';

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const StatsCard = ({ icon, label, value }: StatsCardProps) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md flex items-center space-x-4">
      <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
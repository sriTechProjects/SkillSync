import React from "react";
import { useSelector } from "react-redux";
import { type RootState } from "@/app/store";
import { CreditCard, Lightbulb, CheckCircle } from "lucide-react";
import StatsCard from "@/components/common/StatsCard";
import UpcomingSessions from "@/components/common/UpcomingSessions";

const DashboardPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <>
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">
          Welcome back, {user?.firstName || "User"}!
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Here's a snapshot of your activity.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        <StatsCard
          icon={<CreditCard className="text-blue-500" />}
          label="Credits"
          value={user?.creditBalance ?? 0}
        />
        <StatsCard
          icon={<Lightbulb className="text-green-500" />}
          label="Skills Offered"
          value={0}
        />
        <StatsCard
          icon={<CheckCircle className="text-purple-500" />}
          label="Sessions Done"
          value={0}
        />
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-8 shadow-sm">
        <UpcomingSessions sessions={[]} />
      </div>
    </>
  );
};

export default DashboardPage;

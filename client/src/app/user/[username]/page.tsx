"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { BookOpen, Flame, Github } from "lucide-react";
import { ActivityChart } from "@/components/ActivityChart";

const Page = () => {
  const { data: session, status } = useSession();
  const [periodType, setPeriodType] = useState<"weekly" | "monthly" | "yearly">(
    "monthly"
  );

  const mockData = {
    weekly: [
      { period: "Mon", logs: 3, commits: 12 },
      { period: "Tue", logs: 2, commits: 8 },
      { period: "Wed", logs: 4, commits: 15 },
      { period: "Thu", logs: 1, commits: 6 },
      { period: "Fri", logs: 5, commits: 22 },
      { period: "Sat", logs: 2, commits: 9 },
      { period: "Sun", logs: 1, commits: 4 },
    ],
    monthly: [
      { period: "Jan", logs: 12, commits: 45 },
      { period: "Feb", logs: 8, commits: 32 },
      { period: "Mar", logs: 15, commits: 58 },
      { period: "Apr", logs: 22, commits: 73 },
      { period: "May", logs: 18, commits: 41 },
      { period: "Jun", logs: 14, commits: 39 },
      { period: "Jul", logs: 19, commits: 52 },
    ],
    yearly: [
      { period: "2021", logs: 89, commits: 298 },
      { period: "2022", logs: 134, commits: 445 },
      { period: "2023", logs: 187, commits: 623 },
      { period: "2024", logs: 156, commits: 512 },
    ],
  };

  const activityData = mockData[periodType];
  const maxLogs = Math.max(...activityData.map((d) => d.logs));
  const maxCommits = Math.max(...activityData.map((d) => d.commits));

  if (!session || status !== "authenticated") {
    return <p className="text-center text-gray-500">unauthenticated</p>;
  }

  return (
    <div className="flex-1 w-full max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-30 mt-30 ">
      {/* User Header Section */}
      <section>
        <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
          <Avatar className="w-20 h-20 border-4 border-gray-700">
            <AvatarImage src={session.user.avatarUrl} />
            <AvatarFallback>
              {session.user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <h1 className="scroll-m-20 text-lg md:text-4xl font-extrabold tracking-tight text-balance">
              {session.user.name}
            </h1>
            <p className="text-muted-foreground text-sm">
              {session.user.email}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mt-10 ">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon={<BookOpen className="w-5 h-5 text-blue-400" />}
            label="Total Logs"
            value="10"
          />
          <StatCard
            icon={<Flame className="w-5 h-5 text-orange-400" />}
            label="Current Streak"
            value="30"
          />
          <StatCard
            icon={<Flame className="w-5 h-5 text-red-400" />}
            label="Best Streak"
            value="20"
          />
          <StatCard
            icon={<Github className="w-5 h-5 text-green-400" />}
            label="Total Commits"
            value="658"
          />
        </div>
      </section>

      {/* Activity Chart Section */}
      <section className="mt-10">
        <ActivityChart
          title={`Activity Timeline - ${
            periodType.charAt(0).toUpperCase() + periodType.slice(1)
          }`}
          data={activityData}
          maxLogs={maxLogs}
          maxCommits={maxCommits}
          periodType={periodType}
          setPeriodType={setPeriodType}
        />
      </section>
    </div>
  );
};

const StatCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 dark:border-slate-700/50">
    <div className="flex items-center space-x-2 mb-2">
      {icon}
      <span className="text-sm ">{label}</span>
    </div>
    <div className="text-2xl font-bold ">{value}</div>
  </div>
);

export default Page;

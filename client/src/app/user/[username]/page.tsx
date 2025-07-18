"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { BookOpen, Code, Flame } from "lucide-react";
import { ActivityChart } from "@/components/ActivityChart";
import {
  fetchUserActivity,
  fetchusermetrics,
} from "@/lib/actions/fetchUserMetrics";
import { toast } from "sonner";
import { fetchTopLanguage } from "@/lib/actions/github";
import { useStreakStore } from "@/lib/store/streakStore";
const Page = () => {
  const { data: session, status } = useSession();
  const [periodType, setPeriodType] = useState<"weekly" | "monthly" | "yearly">(
    "monthly"
  );
  const [activityData, setActivityData] = useState<
    { period: string; logs: number }[]
  >([]);
  const [metrics, setMetrics] = useState<{
    totalLogs: number;
    currentStreak: number;
    bestStreak: number;
  } | null>(null);
  const [topLanguage, setTopLanguage] = useState<string | null>(null);
  const setStreaks = useStreakStore((state) => state.setStreaks);
  useEffect(() => {
    if (status === "authenticated") {
      fetchusermetrics()
        .then((data) => {
          console.log("Fetched metrics:", data);
          setMetrics(data);
          setStreaks({
            totalLogs: data.totalLogs,
            currentStreak: data.currentStreak,
            bestStreak: data.bestStreak,
          });
        })
        .catch((err) => {
          console.error("Failed to fetch metrics:", err);
          toast.error("Failed to fetch metrics");
        });
    }
  }, [session]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchUserActivity(session.user.login, periodType)
        .then((data) => {
          setActivityData(data);
        })
        .catch((err) => {
          console.error("Failed to fetch metrics:", err);
          toast.error("Failed to fetch metrics");
        });
    }
  }, [session, periodType]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchTopLanguage(session.user.login)
        .then(setTopLanguage)
        .catch((err) => {
          console.error("Failed to fetch top language:", err);
          toast.error("Failed to fetch top language");
        });
    }
  }, [session]);

  const maxLogs = Math.max(...(activityData.map((d) => d.logs) || 0));
  if (!session || status !== "authenticated") {
    return <p className="text-center text-gray-500">unauthenticated</p>;
  }

  return (
    <div className="flex-1 w-full max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-30 mt-30 h-screen">
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
            value={metrics ? metrics.totalLogs.toString() : "--"}
          />
          <StatCard
            icon={<Flame className="w-5 h-5 text-orange-400" />}
            label="Current Streak"
            value={metrics ? metrics.currentStreak.toString() : "--"}
          />
          <StatCard
            icon={<Flame className="w-5 h-5 text-red-400" />}
            label="Best Streak"
            value={metrics ? metrics.bestStreak.toString() : "--"}
          />
          <StatCard
            icon={<Code className="w-5 h-5 text-red-400" />}
            label="Top Language"
            value={topLanguage ?? "--"}
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
  <div className="bg-gray-200 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 dark:border-slate-700/50">
    <div className="flex items-center space-x-2 mb-2">
      {icon}
      <span className="text-sm ">{label}</span>
    </div>
    <div className="text-xl font-bold ">{value}</div>
  </div>
);

export default Page;

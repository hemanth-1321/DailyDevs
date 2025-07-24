"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BACKEND_URL } from "@/lib/config";
import axios from "axios";

type Metric = {
  user: {
    id: string | number;
    avatarUrl: string;
    username: string;
    githubId: string;
  };
  currentStreak: number;
  totalLogs: number;
  bestStreak: number;
};

const Page = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/logs/allMetrics`);

        setMetrics(res.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="p-2 mt-20 md:p-10 md:m-10">
      <div className="min-h-screen dark:bg-[#171717] max-w-6xl mx-auto rounded-2xl">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          🔥 Today&rsquo;s Leaderboard
        </h2>

        <Table>
          <TableCaption>Top contributors based on current streak.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Developer</TableHead>
              <TableHead>Current Streak</TableHead>
              <TableHead>Total Logs</TableHead>
              <TableHead>Best Streak</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {metrics.map((item, index) => (
              <TableRow key={item.user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="flex items-center gap-3">
                  <img
                    src={item.user.avatarUrl}
                    alt={item.user.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-white">
                      {item.user.username}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      @{item.user.githubId}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{item.currentStreak}</TableCell>
                <TableCell>{item.totalLogs}</TableCell>
                <TableCell>{item.bestStreak}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {metrics.length > 0 && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2}>Total Developers</TableCell>
                <TableCell colSpan={3} className="text-right">
                  {metrics.length}
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>
    </div>
  );
};

export default Page;

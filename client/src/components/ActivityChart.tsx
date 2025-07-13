import React from "react";
import { BarChart3 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ActivityData {
  period: string;
  logs: number;
  commits: number;
}

interface ActivityChartProps {
  title: string;
  data: ActivityData[];
  maxLogs: number;
  maxCommits: number;
  periodType: "weekly" | "monthly" | "yearly";
  setPeriodType: (value: "weekly" | "monthly" | "yearly") => void;
}

export const ActivityChart: React.FC<ActivityChartProps> = ({
  title,
  data,
  maxLogs,
  maxCommits,
  periodType,
  setPeriodType,
}) => {
  return (
    <Card className="dark:bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-4 md:space-y-0">
        <CardTitle className="flex items-center ">
          <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
          {title}
        </CardTitle>

        <div className="flex gap-2 bg-slate-700/30 rounded-lg p-1">
          {(["weekly", "monthly", "yearly"] as const).map((period) => (
            <Button
              key={period}
              variant="ghost"
              size="sm"
              className={`text-xs font-medium ${
                periodType === period
                  ? "bg-blue-500/20 text-blue-400 shadow shadow-blue-500/10"
                  : "text-slate-400 hover:text-white hover:bg-slate-600/30"
              }`}
              onClick={() => setPeriodType(period)}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Logs Chart */}
        <div>
          <h4 className="text-sm font-medium text-slate-400 mb-3">
            Daily Logs
          </h4>
          <div className="flex items-end space-x-2 h-20 overflow-x-auto">
            {data.map((d, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex flex-col items-center min-w-[40px]"
              >
                <div className="w-full h-16 bg-slate-700/30 rounded-t-lg relative overflow-hidden">
                  <div
                    className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg absolute bottom-0 w-full"
                    style={{
                      height: `${maxLogs ? (d.logs / maxLogs) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="text-xs text-slate-400 mt-2 text-center">
                  {d.period}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Commits Chart */}
        <div>
          <h4 className="text-sm font-medium text-slate-400 mb-3">
            GitHub Commits
          </h4>
          <div className="flex items-end space-x-2 h-20 overflow-x-auto">
            {data.map((d, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex flex-col items-center min-w-[40px]"
              >
                <div className="w-full h-16 bg-slate-700/30 rounded-t-lg relative overflow-hidden">
                  <div
                    className="bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg absolute bottom-0 w-full"
                    style={{
                      height: `${
                        maxCommits ? (d.commits / maxCommits) * 100 : 0
                      }%`,
                    }}
                  />
                </div>
                <span className="text-xs text-slate-400 mt-2 text-center">
                  {d.period}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

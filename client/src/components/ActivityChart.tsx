import React from "react";
import { BarChart3 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ActivityData {
  period: string;
  logs: number;
}

interface ActivityChartProps {
  title: string;
  data: ActivityData[];
  maxLogs: number;
  periodType: "weekly" | "monthly" | "yearly";
  setPeriodType: (value: "weekly" | "monthly" | "yearly") => void;
}

// Helper to get default period labels for skeleton bars
const getDefaultPeriods = (periodType: "weekly" | "monthly" | "yearly") => {
  if (periodType === "weekly") {
    return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  }
  if (periodType === "monthly") {
    return [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
  }
  if (periodType === "yearly") {
    const currentYear = new Date().getFullYear();
    return [currentYear - 2, currentYear - 1, currentYear].map(String);
  }
  return [];
};

export const ActivityChart: React.FC<ActivityChartProps> = ({
  title,
  data,
  maxLogs,
  periodType,
  setPeriodType,
}) => {
  const defaultPeriods = getDefaultPeriods(periodType);
  const logMap = new Map(data.map((d) => [d.period, d.logs]));

  const normalizedData = defaultPeriods.map((p) => ({
    period: p,
    logs: logMap.get(p) ?? 0,
  }));

  return (
    <Card className="dark:bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-4 md:space-y-0">
        <CardTitle className="flex items-center">
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
        <div>
          <h4 className="text-sm font-medium text-slate-400 mb-3">
            Daily Logs
          </h4>
          <div className="flex items-end space-x-2 h-20 overflow-x-auto">
            {normalizedData.map((d, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex flex-col items-center min-w-[40px]"
              >
                <div className="w-full h-16 bg-slate-700/30 rounded-t-lg relative overflow-hidden">
                  <div
                    className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg absolute bottom-0 w-full transition-all duration-300 ease-in-out"
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
      </CardContent>
    </Card>
  );
};

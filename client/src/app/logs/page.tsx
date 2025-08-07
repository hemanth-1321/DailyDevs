"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchUserLogs } from "@/lib/actions/fetchUserLogs";
import { useSession } from "next-auth/react";
import { formatDistanceToNow } from "date-fns";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Clock, Github } from "lucide-react";
import Link from "next/link";

type Log = {
  content: string;
  repository: string;
  repositoryUrl: string;
  createdAt: Date;
};

const Page = () => {
  const { data: session, status } = useSession();
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
const skeletonCount = logs.length > 0 ? logs.length : 3;

  useEffect(() => {
    if (status === "authenticated" && session?.user?.login) {
      fetchUserLogs()
        .then((data) => setLogs(data))
        .catch((err) => {
          toast.error("Error fetching logs", { description: err.message });
        })
        .finally(() => setLoading(false));
    }
  }, [status, session]);

  return (
    <div className="min-h-screen flex flex-col mt-15">
      <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-10 space-y-10">
        <header className="text-4xl font-bold mb-2">Development Logs</header>
        <p className="text-gray-600 text-lg">Your coding journey, day by day</p>
        
        <section>
          {loading ? (
         Array.from({ length: skeletonCount }).map((_, i) => (
    <Card key={i} className="p-4 my-2 space-y-4 relative">
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-4 w-40" />
      <div className="absolute bottom-2 right-4">
        <Skeleton className="h-4 w-20" />
      </div>
    </Card>
  ))
            
          ) : logs.length > 0 ? (
            logs.map((log, index) => (
              <Card key={index} className="p-4 my-2 relative">
                <p className="text-xl font-bold">{log.content}</p>

                <Link href={log.repositoryUrl} target="_blank" rel="noopener noreferrer">
                  <code className="flex items-center gap-2 bg-neutral-700 w-fit relative rounded px-2 py-1 font-mono text-sm font-semibold text-white">
                    <Github size={14} className="text-white" />
                    {log.repository}
                  </code>
                </Link>

                <div className="absolute bottom-2 right-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>
                      {formatDistanceToNow(new Date(log.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <p className="text-gray-400">No logs available.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Page;

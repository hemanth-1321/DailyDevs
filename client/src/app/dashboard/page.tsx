"use client";
import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { fetchRepos } from "@/lib/actions/github";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CodeSquareIcon,
  FireExtinguisher,
  Flame,
  GithubIcon,
  GitMerge,
  TrendingUp,
} from "lucide-react";
import { useStreakStore } from "@/lib/store/streakStore";

const Page = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState<{ name: string; html_url: string }[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<{
    name: string;
    url: string;
  } | null>(null);

  const { totalLogs, currentStreak, bestStreak } = useStreakStore();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.login) {
      const getRepos = async () => {
        try {
          const repos = await fetchRepos(session.user.login);
          if (repos && Array.isArray(repos)) {
            setRepos(repos);
          }
        } catch (error) {
          console.error("Error fetching repositories:", error);
          toast.error("Failed to fetch GitHub repositories");
        }
      };
      getRepos();
    }
  }, [status, session?.user?.login]);

  const handleSubmit = async () => {
    if (!content) return toast.warning("Log content is empty");
    if (!selectedRepo) return toast.warning("Please select a repository");

    try {
      setLoading(true);
      const res = await axios.post(
        `${BACKEND_URL}/api/logs/log`,
        {
          content,
          repository: selectedRepo.name,
          repositoryUrl: selectedRepo.url,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success("Log submitted with repository");
        setContent("");
        setSelectedRepo(null);
      }
    } catch (error) {
      toast.error("Failed to post log");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto w-full px-4 py-10 space-y-10 mt-20 dark:bg-[#191a1a] rounded-2xl">
      <div className="px-3 py-2 bg-muted rounded-lg text-sm font-mono font-semibold w-fit">
        Hello {session?.user.name}, welcome back!
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left: TextArea and Form */}
        <div className="lg:col-span-3 p-6 border rounded-2xl shadow-sm space-y-4">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p>Track your daily progress and coding journey</p>

          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write something about your day..."
            rows={6}
            className="w-full"
          />

          <div className=" flex  flex-row  justify-between  items-center gap-10 md:p-4">
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="transition-all duration-200 hover:scale-[1.02] cursor-pointer"
            >
              {loading ? "Submitting..." : "Submit Log"}
            </Button>
            {/* github repos for mobile */}
            <div className="w-full lg:w-1/2 space-y-2 mb-4 block md:hidden lg:hidden">
              <label className="text-sm font-medium flex items-center gap-2">
                <GithubIcon className="w-4 h-4" />
                Select a Repository
              </label>
              <Select
                onValueChange={(value) => {
                  const selected = repos.find((r) => r.name === value);
                  if (selected) {
                    setSelectedRepo({
                      name: selected.name,
                      url: selected.html_url,
                    });
                  }
                }}
                value={selectedRepo?.name || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a repository" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Repositories</SelectLabel>
                    {repos.map((repo) => (
                      <SelectItem key={repo.html_url} value={repo.name}>
                        <div className="flex items-center gap-2">
                          <GitMerge className="w-4 h-4" />
                          {repo.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Right: Streak Card */}
        <div className="flex flex-col gap-4">
          {/* GitHub Repo Selector (Desktop) */}
          <div className="w-full lg:w-1/2 space-y-2 mb-4 hidden md:block lg:block transition-all">
            <label className="text-sm font-medium flex items-center gap-2">
              <GithubIcon className="w-4 h-4" />
              <span className="text-muted-foreground">Select a Repository</span>
            </label>
            <Select
              onValueChange={(value) => {
                const selected = repos.find((r) => r.name === value);
                if (selected) {
                  setSelectedRepo({
                    name: selected.name,
                    url: selected.html_url,
                  });
                }
              }}
              value={selectedRepo?.name || ""}
            >
              <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary">
                <SelectValue placeholder="Choose a repository" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Repositories</SelectLabel>
                  {repos.map((repo) => (
                    <SelectItem key={repo.html_url} value={repo.name}>
                      <div className="flex items-center gap-2">
                        <GitMerge className="w-4 h-4" />
                        {repo.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Total Logged Days */}
          <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center space-x-2 mb-2 text-muted-foreground">
              <TrendingUp />
              <span className="text-sm font-medium">Total logged days</span>
            </div>
            <div className="text-3xl font-bold text-foreground">
              {totalLogs}
            </div>
          </div>

          {/* Best Streak */}
          <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center space-x-2 mb-2 text-muted-foreground">
              <Flame className="text-orange-500 dark:text-orange-400" />
              <span className="text-sm font-medium">Best Streak</span>
            </div>
            <div className="text-3xl font-bold text-foreground">
              {bestStreak}
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Contribution Chart */}
      <section className="p-6 border rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-center">
          GitHub Contribution Chart
        </h2>
        {session?.user?.login ? (
          <img
            src={`https://ghchart.rshah.org/${session.user.login}`}
            alt="GitHub contribution chart"
            className="mx-auto w-full max-w-3xl border rounded-md shadow p-2"
          />
        ) : (
          <p className="text-center text-sm">Sign in to see your chart</p>
        )}
      </section>
    </main>
  );
};

export default Page;

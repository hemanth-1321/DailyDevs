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
import { Flame, GithubIcon, GitMerge, TrendingUp } from "lucide-react";
import { useStreakStore } from "@/lib/store/streakStore";
import { BorderBeam } from "@/components/ui/border-beam";
import { motion } from "framer-motion";
const Page = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState<{ name: string; html_url: string }[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<{
    name: string;
    url: string;
  } | null>(null);

  const { totalLogs, bestStreak } = useStreakStore();
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
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto w-full px-4 py-10 space-y-10 mt-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="relative z-10 rounded-3xl md:border md:border-neutral-200 md:bg-neutral-100 p-0 md:p-4 md:shadow-md dark:md:border-neutral-800 dark:md:bg-neutral-900"
      >
        <div className="w-full overflow-hidden rounded-xl md:border md:border-gray-300 dark:md:border-gray-700">
          <div className="bg-gray-200 dark:bg-[#a2bffe] rounded-2xl relative p-4 sm:p-6 transform-gpu">
            <div className="px-3 py-2 bg-muted rounded-lg text-sm font-mono font-semibold w-fit mb-4">
              Hello {session?.user.name}, welcome back!
            </div>

            <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Left: TextArea and Form */}
              <div className="lg:col-span-3 w-full border border-gray-800 rounded-2xl shadow-sm space-y-4 p-2 sm:p-6 text-gray-950">
                <h1 className="text-xl font-bold">Dashboard</h1>
                <p>Track your daily progress and coding journey</p>

                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write something about your day..."
                  rows={6}
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-[#0f172a] text-white placeholder:text-gray-400 p-4 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93c5fd] transition"
                />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-10">
                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full md:w-auto dark:bg-[#1f2937] dark:text-white hover:dark:bg-[#374151] transition-colors"
                  >
                    {loading ? "Submitting..." : "Submit Log"}
                  </Button>

                  {/* GitHub repos for mobile */}
                  <div className="w-full md:w-1/2 space-y-2 block md:hidden">
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
                      <SelectTrigger className="transform-gpu text-black">
                        <SelectValue placeholder="Choose a repository" />
                      </SelectTrigger>

                      <SelectContent
                        className="transform-gpu z-50"
                        sideOffset={4}
                      >
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

              {/* Right: Streak Stats & Repo Select for Desktop */}
              <div className="flex flex-col gap-4 w-full text-gray-950">
                <div className="w-full space-y-2 hidden md:block">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <GithubIcon className="w-4 h-4" />
                    <span>Select a Repository</span>
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
                    <SelectTrigger className="transform-gpu transition-all focus:ring-2 focus:ring-primary cursor-pointer">
                      <SelectValue placeholder="Choose a repository" />
                    </SelectTrigger>

                    <SelectContent
                      className="transform-gpu z-50"
                      sideOffset={4}
                    >
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
                <div className="bg-white dark:bg-[#1f2937] rounded-2xl p-4 dark:border-gray-700 shadow-2xl hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center space-x-2 mb-2 text-muted-foreground">
                    <TrendingUp />
                    <span className="text-sm font-medium">
                      Total logged days
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-foreground">
                    {totalLogs}
                  </div>
                </div>

                {/* Best Streak */}
                <div className="bg-white dark:bg-[#1f2937] rounded-2xl p-4 dark:border-gray-700 shadow-2xl hover:shadow-md transition-shadow duration-300">
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
            <section className="p-6 sm:p-8 dark:bg-[#1e293b] border border-[#334155] rounded-2xl shadow-md mt-10">
              <h2 className="text-2xl font-bold text-center  mb-6">
                🟩 GitHub Contribution Chart
              </h2>

              {session?.user?.login ? (
                <img
                  src={`https://ghchart.rshah.org/${session.user.login}`}
                  alt="GitHub contribution chart"
                  className="mx-auto w-full max-w-full sm:max-w-2xl border border-[#334155] rounded-lg shadow-inner p-2 bg-[#0f172a]"
                />
              ) : (
                <p className="text-center text-sm text-[#94a3b8]">
                  Sign in to see your contribution chart
                </p>
              )}
            </section>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none z-0">
          <BorderBeam duration={8} size={100} />
        </div>
      </motion.div>
    </main>
  );
};

export default Page;

"use client";
import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { fetchRepos } from "@/lib/actions/github";

const Page = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState<{ name: string; html_url: string }[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<{
    name: string;
    url: string;
  } | null>(null);

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
    <main className="max-w-6xl w-full mx-auto mt-20 p-4 space-y-10">
      {/* Log Input Section */}
      <section className="w-full p-2 md:p-6 rounded-2xl shadow-md flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="w-full lg:w-3/4 space-y-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Write a Log
          </h1>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write something about your day..."
            rows={6}
            className="w-full bg-white"
          />
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className=" sm:w-auto"
          >
            {loading ? "Submitting..." : "Submit Log"}
          </Button>
        </div>

        {/* Repo Dropdown */}
        <div className="w-full lg:w-1/4">
          <label className="text-sm font-medium text-gray-800 dark:text-gray-300 mb-1 block">
            Select a Repository
          </label>
          <select
            value={selectedRepo?.name || ""}
            onChange={(e) => {
              const selected = repos.find((r) => r.name === e.target.value);
              if (selected) {
                setSelectedRepo({
                  name: selected.name,
                  url: selected.html_url,
                });
              }
            }}
            className="w-full p-2 rounded-md border border-gray-300 dark:border-slate-600 dark:bg-slate-700 text-sm"
          >
            <option value="">-- Choose --</option>
            {repos.map((repo) => (
              <option key={repo.html_url} value={repo.name}>
                {repo.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* GitHub Chart */}
      <section className="p-6 rounded-2xl border shadow-md text-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          GitHub Contribution Chart
        </h2>
        {session?.user?.login ? (
          <img
            src={`https://ghchart.rshah.org/${session.user.login}`}
            alt="GitHub contribution chart"
            className="mx-auto w-full max-w-2xl border border-gray-300 rounded-lg shadow p-4"
          />
        ) : (
          <p className="text-gray-500">Sign in to see your chart</p>
        )}
      </section>
    </main>
  );
};

export default Page;

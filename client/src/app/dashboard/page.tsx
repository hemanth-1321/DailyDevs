"use client";
import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

const Page = () => {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  console.log(`id ${session?.user.id}`);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${BACKEND_URL}/api/logs/log`,
        {
          content,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        toast.success("success");
      }
      setLoading(false);
    } catch (error) {
      toast.warning("failed to post data");
      setLoading(false);
    }
  };
  return (
    <div className="flex-1 w-full max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-30 mt-30 gap-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-100"
      />
      <Button onClick={handleSubmit}>
        {loading ? "submitting" : "submit"}
      </Button>
    </div>
  );
};
export default Page;

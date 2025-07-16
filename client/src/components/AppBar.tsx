"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ChevronsDown, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";

export function AppBar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <div className="bg-black">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 z-50 w-full p-2"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 backdrop-blur-xl rounded-2xl bg-background/50 border border-neutral-200 dark:border-neutral-700 shadow-lg"
        >
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/"
                className="flex items-center space-x-2 transition-opacity hover:opacity-90"
              >
                <span className=" font-bold font-mono text-xl ">DevLogs</span>
              </Link>
            </motion.div>
            <div className="flex gap-4">
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 transition-opacity hover:opacity-90"
              >
                <span className=" font-bold font-mono text-xl ">Dashboard</span>
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 transition-opacity hover:opacity-90"
              >
                <span className=" font-bold font-mono text-xl ">Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              {status === "loading" ? null : !session ? (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="default"
                    size="sm"
                    className="cursor-pointer relative overflow-hidden bg-gradient-to-r from-neutral-800 to-neutral-900 text-white dark:from-neutral-700 dark:to-neutral-800 border border-neutral-600 dark:border-neutral-700 rounded-lg shadow-md shadow-neutral-800/20 dark:shadow-black/30 px-4 py-2 font-medium tracking-wide transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02] hover:from-neutral-700 hover:to-neutral-900 dark:hover:from-neutral-600 dark:hover:to-neutral-750"
                    onClick={() =>
                      signIn("github", { callbackUrl: "/register" })
                    }
                  >
                    <span>Sign In</span>
                  </Button>
                </motion.div>
              ) : (
                <>
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="flex items-center gap-3 cursor-pointer p-2">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={session.user.avatarUrl} />
                            <AvatarFallback></AvatarFallback>
                          </Avatar>

                          <ChevronsDown className="text-gray-400" />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full" align="start">
                        <DropdownMenuLabel>
                          <div className="flex items-center gap-3 cursor-pointer p-2">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={session.user.avatarUrl} />
                              <AvatarFallback></AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="scroll-m-20 text-l font-mono tracking-tight">
                                {session.user.name}
                              </h4>
                              <p className="text-muted-foreground text-sm">
                                {session.user.email}
                              </p>
                            </div>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup className=" px-4">
                          <DropdownMenuItem>
                            <div
                              className="flex items-center cursor-pointer gap-3"
                              onClick={() => {
                                router.push(`/user/${session.user.login}`);
                              }}
                            >
                              <User />
                              <small className="text-sm leading-none font-medium">
                                Profile
                              </small>
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                          >
                            <ThemeToggle />
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => signOut()}
                            className="cursor-pointer"
                          >
                            <LogOut />
                            Signout
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </motion.header>
    </div>
  );
}

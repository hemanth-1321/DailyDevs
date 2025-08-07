"use client";

import { Button } from "./ui/button";
import Link from "next/link";
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
import {
  LayoutDashboard,
  LogOut,
  Menu,
  ScrollText,
  Trophy,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { AuroraText } from "./ui/AuroraText";
import { Skeleton } from "./ui/skeleton";
export function AppBar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <div className="bg-black">
      <header className="fixed top-0 z-50 w-full p-2 h-[72px]">
        <div
          className=" h-full mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 rounded-2xl bg-background/95 border border-neutral-200 dark:border-neutral-700 shadow-lg transform-gpu"
          style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
        >
          <div className="flex h-full items-center justify-between ">
            {/* Logo */}
            <div>
              <Link
                href="/"
                className="flex items-center space-x-2 transition-opacity hover:opacity-90"
              >
                <span className="font-bold font-mono text-xl">
                  Daily<AuroraText>Devs</AuroraText>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-4">
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 transition-opacity hover:opacity-90"
              >
                <LayoutDashboard className="w-5 h-5" />
                <p className="text-muted-foreground text-sm">Dashboard</p>
              </Link>
              <Link
                href="/logs"
                className="flex items-center space-x-2 transition-opacity hover:opacity-90"
              >
                <ScrollText className="w-5 h-5" />
                <p className="text-muted-foreground text-sm">Logs</p>
              </Link>
              {/* <Link
                href="/leadership"
                className="flex items-center space-x-2 transition-opacity hover:opacity-90"
              >
                <Trophy className="w-5 h-5" />
                <p className="text-muted-foreground text-sm">Leadership</p>
              </Link> */}
            </div>

            {/* Auth / Profile Section */}
            <div className="flex items-center gap-4">
              {status === "loading" ? (
                <Skeleton className="h-12 w-12 rounded-full" />
              ) : !session ? (
                <Button
                  variant="default"
                  size="sm"
                  className="cursor-pointer relative overflow-hidden bg-gradient-to-r from-neutral-800 to-neutral-900 text-white dark:from-neutral-700 dark:to-neutral-800 border border-neutral-600 dark:border-neutral-700 rounded-lg shadow-md shadow-neutral-800/20 dark:shadow-black/30 px-4 py-2 font-medium tracking-wide transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02] hover:from-neutral-700 hover:to-neutral-900 dark:hover:from-neutral-600 dark:hover:to-neutral-750"
                  onClick={() => signIn("github", { callbackUrl: "/register" })}
                >
                  <span>Sign In</span>
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  {/* Mobile Menu */}
                  <div className="md:hidden relative">
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="transform-gpu"
                        >
                          <Menu className="w-6 h-6" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        sideOffset={6}
                        className="transform-gpu"
                        side="bottom"
                        sticky="always"
                      >
                        <DropdownMenuItem asChild>
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-2"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/logs"
                            className="flex items-center gap-2"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            Logs
                          </Link>
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem asChild>
                          <Link
                            href="/leadership"
                            className="flex items-center gap-2"
                          >
                            <Trophy className="w-4 h-4" />
                            Leadership
                          </Link>
                        </DropdownMenuItem> */}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Profile Dropdown */}
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <div className="flex items-center gap-1 cursor-pointer p-2 transform-gpu">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={session.user.avatarUrl} />
                          <AvatarFallback />
                        </Avatar>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-64 transform-gpu"
                      align="end"
                      sideOffset={6}
                      side="bottom"
                      sticky="always"
                    >
                      <DropdownMenuLabel>
                        <div className="flex items-center gap-3 p-2">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={session.user.avatarUrl} />
                            <AvatarFallback />
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
                      <DropdownMenuGroup className="px-4">
                        <DropdownMenuItem
                          onClick={() => {
                            router.push(`/user/${session.user.login}`);
                          }}
                        >
                          <User className="mr-2 w-4 h-4" />
                          <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ThemeToggle />
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => signOut()}
                          className="cursor-pointer"
                        >
                          <LogOut className="mr-2 w-4 h-4" />
                          <span>Sign Out</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

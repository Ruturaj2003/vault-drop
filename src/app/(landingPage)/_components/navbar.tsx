"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Moon, Sun, Github } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import Image from "next/image";

export const Navbar = () => {
  const { setTheme } = useTheme();
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <nav className="w-full border-b border-vault-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / Brand */}
        <div className="text-lg sm:text-xl flex gap-x-2 font-semibold tracking-tight text-vault-purple">
          <Image src={"./logo.svg"} alt="Logo " width={20} height={20} />
          <Link href={"/files"}>Vault Drop</Link>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <SignedOut>
            {/* GitHub Link */}
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:text-vault-purple transition-colors"
            >
              <a
                href="https://github.com/Ruturaj2003/vault-drop" // replace with your repo link
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            {/* Demo Modal Trigger */}
            <Dialog open={demoOpen} onOpenChange={setDemoOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" className="font-medium">
                  Demo
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold">
                    Demo Account
                  </DialogTitle>
                  <DialogDescription>
                    Use the following credentials to try Vault Drop.
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-2">
                  <div className="flex flex-col">
                    <span className="font-medium">Email:</span>
                    <span className="text-sm text-muted-foreground">
                      demouser@gmail.com
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">Password:</span>
                    <span className="text-sm text-muted-foreground">
                      #DemoDragon1
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">Pass Phrase:</span>
                    <span className="text-sm text-muted-foreground">
                      Demo User
                    </span>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Sign Up */}
            <Link href={"/sign-up"}>
              <Button className="bg-primary text-primary-foreground rounded-full font-medium">
                Get Started
              </Button>
            </Link>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="relative border-vault-border"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

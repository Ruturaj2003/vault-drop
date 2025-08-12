import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Dot,
  EyeIcon,
  FileIcon,
  Lock,
  LockIcon,
} from "lucide-react";

export const Hero = () => {
  return (
    <div className="flex justify-center items-center min-h-[90vh] flex-col gap-y-4 w-full max-w-5xl mx-auto px-4">
      <div className="mx-auto flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-x-4 text-center sm:text-left">
        <Lock className="size-10 fill-transparent text-violet-600 bg-gradient-to-r from-[oklch(0.68_0.25_295)] via-[oklch(0.72_0.25_250)] to-[oklch(0.78_0.18_210)] bg-clip-text" />
        <h1 className="text-4xl sm:text-6xl font-bold text-transparent bg-gradient-to-r from-[oklch(0.68_0.25_295)] via-[oklch(0.72_0.25_250)] to-[oklch(0.78_0.18_210)] bg-clip-text">
          Vault Drop
        </h1>
      </div>

      <h1 className="text-3xl sm:text-5xl font-bold mt-10 mb-2 text-center">
        Share Files with a
        <span className="ml-2 text-transparent bg-gradient-to-r from-[oklch(0.68_0.25_295)] via-[oklch(0.72_0.25_250)] to-[oklch(0.78_0.18_210)] bg-clip-text">
          Hidden Twist
        </span>
      </h1>

      <p className="max-w-2xl font-body text-lg sm:text-2xl text-center text-muted-foreground px-2">
        Upload two versions of any file. Show the dummy first, reveal the real
        one when viewers stay still. Perfect for puzzles and escape rooms.
      </p>

      {/* Cool box */}
      <div
        className="
        rounded-lg
        border-accent
        shadow-lg
        dark:shadow-[21px_20px_39px_-1px_rgba(222,_222,_222,_0.1)]
        w-full max-w-md border mt-4 flex flex-col justify-center gap-y-4 p-4 px-6"
      >
        {/* 1 */}
        <div className="flex gap-x-4">
          <FileIcon className="size-5" />
          <p className="text-muted-foreground text-sm">mystery-file.pdf</p>
        </div>
        {/* 2 */}
        <div className="w-full font-body rounded-lg bg-sidebar-accent p-2 flex items-center gap-x-4">
          <EyeIcon className="size-4" />
          <p className="text-md font-body dark:text-primary-foreground">
            Dummy version shown first
          </p>
        </div>
        {/* 3 */}
        <div className="w-full rounded-lg text-violet-700 bg-violet-900/20 border-violet-800 border p-2 flex items-center gap-x-4">
          <LockIcon className="size-4" />
          <p className="text-violet-600">Real version reveals on inactivity</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center mt-4 gap-3 sm:gap-x-6">
        <Button className="w-full sm:w-auto">
          Start Creating Vaults
          <ArrowRight />
        </Button>
        <Button variant="outline" className="w-full sm:w-auto">
          See How It Works
        </Button>
      </div>

      {/* 3 points */}
      <div className="w-full flex flex-col sm:flex-row justify-center gap-2 sm:gap-x-4 mt-2 items-center mx-auto">
        <div className="flex items-center">
          <Dot className="text-teal-400 size-8" />
          <p className="font-body">No installation required</p>
        </div>
        <div className="flex items-center">
          <Dot className="text-red-400 size-8" />
          <p className="font-body">Works with PDF file type</p>
        </div>
        <div className="flex items-center">
          <Dot className="text-teal-400 size-8" />
          <p className="font-body">Built for mystery games</p>
        </div>
      </div>
    </div>
  );
};

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
    <div className="border border-amber-500 flex justify-center items-center flex-col gap-y-4  w-full max-w-5xl mx-auto">
      <div className="mx-auto flex justify-center items-center gap-x-8">
        <Lock className="text-3xl" />
        <h1 className="text-5xl">Vault Drop</h1>
      </div>
      <h1 className="text-5xl">Share Files with a Hidden Twist</h1>
      <p className="max-w-xl text-xl text-center text-muted-foreground">
        Upload two versions of any file. Show the dummy first, reveal the real
        one when viewers stay still. Perfect for puzzles and escape rooms.
      </p>

      {/* Cool box  */}
      <div className="w-full max-w-md border border-teal-500 flex flex-col justify-center  gap-y-4 p-4">
        {/* 1 */}
        <div className="flex gap-x-4 ">
          <FileIcon className="size-5"></FileIcon>
          <p className=" text-muted-foreground text-sm ">mystery-file.pdf</p>
        </div>
        {/* 2 */}
        <div className="w-full bg-accent p-2 flex items-center gap-x-4">
          <EyeIcon className="size-4"></EyeIcon>
          <p className=" text-primary-foreground">Dummy version shown first</p>
        </div>
        {/* 3 */}
        <div className="w-full bg-primary p-2 flex items-center gap-x-4">
          <LockIcon className="size-4"></LockIcon>
          <p className=" text-primary-foreground">
            Real version reveals on inactivity
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center mt-8 gap-x-6">
        <Button>
          Star Creating Vaults
          <ArrowRight></ArrowRight>
        </Button>
        <Button variant={"outline"}>See How It Works</Button>
      </div>
      {/* 3 points */}

      <div className="w-full justify-center gap-x-4 flex items-center mx-auto">
        <div className="flex ">
          <Dot className="text-teal-400 size-6"></Dot>
          <p>No installation required</p>
        </div>
        <div className="flex ">
          <Dot className="text-red-400 size-6"></Dot>
          <p>Works with PDF file type</p>
        </div>
        <div className="flex ">
          <Dot className="text-teal-400 size-6"></Dot>
          <p>Built for mystery games</p>
        </div>
      </div>
    </div>
  );
};

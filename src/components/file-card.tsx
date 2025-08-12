"use client";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useFileDataStore from "@/store/fileDataStore";
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

interface FileCardProps {
  fileData: {
    id: string;
    fileName: string;
    realFileUrl: string;
    dummyFileUrl: string;
    uploadedAt: number;
    lastViewedAt?: number;
    totalTimeViewed?: number;
  };
}

export const FileCard = ({ fileData }: FileCardProps) => {
  const route = useRouter();
  const timeConverter = (time: number) => {
    if (!time) return "Never";
    const date = new Date(time * 1000);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const user = useAuth();
  const demoUserID = process.env.NEXT_PUBLIC_DEMO_USER_ID;

  const setCurrentFile = useFileDataStore((state) => state.setCurrentFile);

  const deleteFile = useMutation(api.userData.deleteFile);
  const updateTime = useMutation(api.userData.updateFileTimeInfo);

  const handleClick = () => {
    const timestamp = Math.floor(Date.now() / 1000);

    toast.info("Opening File " + fileData.fileName);
    setCurrentFile(fileData.id);
    updateTime({
      fileId: fileData.id,
      userId: user.userId!,
      lastViewedAt: timestamp,
    });
    route.push("/view/");
  };

  const handleDelete = () => {
    if (user.userId === demoUserID) {
      toast.info("This would delete the File");
      return;
    }

    deleteFile({
      fileId: fileData.id,
      userId: user.userId!,
    });
    toast.success("File deleted");
  };

  return (
    <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-gray-100">
          {fileData.fileName}
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Last Viewed: {timeConverter(fileData.lastViewedAt!)}
        </CardDescription>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <MoreVerticalIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <DropdownMenuItem
                onClick={handleDelete}
                className="hover:bg-red-500 hover:text-white transition-colors"
              >
                <Trash className="mr-2" size={16} />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>

      <CardFooter>
        <Button
          onClick={handleClick}
          variant="outline"
          className="flex-1 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          Open
        </Button>
      </CardFooter>
    </Card>
  );
};

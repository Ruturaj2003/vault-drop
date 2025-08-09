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
    const seconds = time;
    const date = new Date(seconds * 1000); // convert to milliseconds
    const formatted = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return formatted;
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
    return;
  };
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{fileData.fileName}</CardTitle>
          <CardDescription>
            Last Viewed at : {timeConverter(fileData.lastViewedAt!)}
          </CardDescription>
          <CardAction>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreVerticalIcon></MoreVerticalIcon>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="hover:bg-red-500 hover:text-white"
                >
                  <Trash className="hover:text-white"></Trash>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardAction>
        </CardHeader>

        <CardFooter>
          <Button onClick={handleClick} variant={"outline"} className="flex-1">
            Open
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

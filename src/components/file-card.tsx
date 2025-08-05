import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MoreVerticalIcon } from "lucide-react";
import { Button } from "./ui/button";

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
  const seconds = fileData.uploadedAt;
  const date = new Date(seconds * 1000); // convert to milliseconds
  const formatted = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{fileData.fileName}</CardTitle>
          <CardDescription>
            Last Viewed at : {fileData.lastViewedAt}
          </CardDescription>
          <CardAction>
            <MoreVerticalIcon></MoreVerticalIcon>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>{fileData.fileName}</p>
        </CardContent>
        <CardFooter>
          <Button variant={"outline"} className="flex-1">
            Open
          </Button>
          {formatted}
        </CardFooter>
      </Card>
    </>
  );
};

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MoreVerticalIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useFileDataStore from "@/store/fileDataStore";

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

  const setCurrentFile = useFileDataStore((state) => state.setCurrentFile);

  const handleClick = () => {
    toast.info("Opening File " + fileData.fileName);
    setCurrentFile(fileData.id);
    route.push("/view/");
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
            <MoreVerticalIcon></MoreVerticalIcon>
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

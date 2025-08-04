"use client";
import { UploadFileDropzone } from "@/utils/uploadthing";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
export const FileUploadCard = () => {
  // Thought
  /*
1. check if both the url are there ,ie check for both file uploaded 
2. File Name Input for the real File
3. Meta Data for the file (BASIC Only for time being)
4. Submit the File Urls 

* Style properly 
* add sonner



*/

  const [realFileName, setRealFileName] = useState<string | null>(null);
  const [dummyFileName, setDummyFileName] = useState<string | null>(null);
  const [realFileUrl, setRealFileUrl] = useState<string | null>(null);
  const [dummyFileUrl, setDummyFileUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [] = useState("");

  const user = useAuth();
  const uploadFileData = useMutation(api.userData.uploadFileData);
  const router = useRouter();
  const handleSubmit = async () => {
    setIsLoading(true);
    if (fileName.trim() === "") {
      toast.error("Please Please Write the filename");
      setIsLoading(false);
      return;
    }
    if (realFileUrl === null || dummyFileUrl === null) {
      toast.error("Please Upload Both the Files");
      setIsLoading(false);
      return;
    }

    try {
      const timeNow = Date.now() / 100;
      const res = await uploadFileData({
        userId: user.userId!,
        dummyFileUrl: dummyFileUrl!,
        fileName: fileName.trim(),
        realFileUrl: realFileUrl!,
        uploadedAt: timeNow,
        lastViewedAt: timeNow,
        totalTimeViewed: 0,
      });
      console.log(res);
      toast.success("File Updated Successfully");
      router.push("/files");
    } catch (error) {
      console.log("ERROR from FileUpload :" + error);
      toast.error("Something Went Wrong try again");
    } finally {
      setIsLoading(false);
    }
  };

  /*
      userId: v.string(),
      fileName: v.string(), // real visible name
      realFileUrl: v.string(),
      dummyFileUrl: v.string(),
      uploadedAt: v.number(), // Date.now()
      lastViewedAt: v.optional(v.number()),
      totalTimeViewed: v.optional(v.number()), // in s
  */

  return (
    <div className="flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Upload Your Files</CardTitle>
          <CardDescription>
            Carefully upload a dummy file and your real file
          </CardDescription>
        </CardHeader>
        <CardContent>
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="File name for your file"
            />
            <h1>Real FIle</h1>
            {realFileUrl ? (
              <>
                <div>
                  <Button
                    onClick={() => {
                      setRealFileUrl(null);
                      setRealFileName(null);
                    }}
                    variant={"destructive"}
                  >
                    Change The Real File{realFileName}
                  </Button>
                </div>
              </>
            ) : (
              <UploadFileDropzone
                endpoint="fileUploader"
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  console.log("Real Files: ", res);
                  toast.success("Real File Set");
                  setRealFileUrl(res[0].ufsUrl);
                  setRealFileName(res[0].name);
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  toast.error(`ERROR! ${error.message}`);
                }}
              ></UploadFileDropzone>
            )}
            <h1>Dummy file : </h1>
            {dummyFileUrl ? (
              <>
                <div>
                  <Button
                    onClick={() => {
                      setDummyFileUrl(null);
                      setDummyFileName(null);
                    }}
                    variant={"destructive"}
                  >
                    Change The Dummy File{dummyFileName}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <UploadFileDropzone
                  endpoint="fileUploader"
                  onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Dummy  Files: ", res);
                    toast.success("Dummy File Set");
                    setDummyFileUrl(res[0].ufsUrl);
                    setDummyFileName(res[0].name);
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    toast.error(`ERROR! ${error.message}`);
                  }}
                ></UploadFileDropzone>
              </>
            )}
          </main>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 flex"
          >
            {isLoading ? "Please Wait" : "Upload Data"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { UploadFileDropzone } from "@/utils/uploadthing";
import { api } from "../../convex/_generated/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const FileUploadCard = () => {
  const [fileName, setFileName] = useState("");
  const [realFileName, setRealFileName] = useState<string | null>(null);
  const [dummyFileName, setDummyFileName] = useState<string | null>(null);
  const [realFileUrl, setRealFileUrl] = useState<string | null>(null);
  const [dummyFileUrl, setDummyFileUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const user = useAuth();
  const router = useRouter();
  const uploadFileData = useMutation(api.userData.uploadFileData);

  const demoUserID = process.env.NEXT_PUBLIC_DEMO_USER_ID;
  const handleSubmit = async () => {
    setIsLoading(true);

    if (user.userId === demoUserID) {
      toast.info("This Would Submit the Files");
      setIsLoading(false);
      return router.push("/files");
    }

    if (!fileName.trim()) {
      toast.error("Please enter a file name.");
      setIsLoading(false);
      return;
    }

    if (!realFileUrl || !dummyFileUrl) {
      toast.error("Please upload both files.");
      setIsLoading(false);
      return;
    }

    try {
      const timestamp = Math.floor(Date.now() / 1000);

      await uploadFileData({
        userId: user.userId!,
        fileName: fileName.trim(),
        realFileUrl,
        dummyFileUrl,
        uploadedAt: timestamp,
        lastViewedAt: timestamp,
        totalTimeViewed: 0,
      });

      toast.success("File uploaded successfully.");
      router.push("/files");
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Upload failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center mx-auto items-center px-4 mt-16">
      <Card className="w-full max-w-3xl overflow-y-auto p-6 rounded-xl shadow-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900 dark:text-gray-100">
            Upload Your Files
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Upload both your real and dummy files with a proper display name.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-800 dark:text-gray-200">
              File Display Name
            </label>
            <Input
              placeholder="Enter display name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-around gap-6">
            {/* Real File Upload */}
            <div className="space-y-2 flex-1">
              <label className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Real File
              </label>
              {realFileUrl ? (
                <div className="p-3 flex flex-col gap-y-3 justify-center rounded-lg items-center border border-dashed border-gray-400 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
                  <h1 className="text-md text-gray-900 dark:text-gray-100">
                    {realFileName}
                  </h1>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setRealFileUrl(null);
                      setRealFileName(null);
                    }}
                  >
                    Change Real File
                  </Button>
                </div>
              ) : (
                <UploadFileDropzone
                  className="h-[200px] w-full dark:border-gray-700 dark:bg-gray-800"
                  endpoint="fileUploader"
                  onClientUploadComplete={(res) => {
                    toast.success("Real file uploaded.");
                    setRealFileUrl(res[0].ufsUrl);
                    setRealFileName(res[0].name);
                  }}
                  onUploadError={(err: Error) => {
                    toast.error(`Upload failed: ${err.message}`);
                  }}
                />
              )}
            </div>

            {/* Dummy File Upload */}
            <div className="space-y-2 flex-1">
              <label className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Dummy File
              </label>
              {dummyFileUrl ? (
                <div className="p-3 flex flex-col gap-y-3 justify-center rounded-lg items-center border border-dashed border-gray-400 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
                  <h1 className="text-md text-gray-900 dark:text-gray-100">
                    {dummyFileName}
                  </h1>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setDummyFileUrl(null);
                      setDummyFileName(null);
                    }}
                  >
                    Change Dummy File
                  </Button>
                </div>
              ) : (
                <UploadFileDropzone
                  className="h-[200px] w-full dark:border-gray-700 dark:bg-gray-800"
                  endpoint="fileUploader"
                  onClientUploadComplete={(res) => {
                    toast.success("Dummy file uploaded.");
                    setDummyFileUrl(res[0].ufsUrl);
                    setDummyFileName(res[0].name);
                  }}
                  onUploadError={(err: Error) => {
                    toast.error(`Upload failed: ${err.message}`);
                  }}
                />
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full dark:bg-violet-600 dark:hover:bg-violet-700"
          >
            {isLoading ? "Uploading..." : "Submit"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

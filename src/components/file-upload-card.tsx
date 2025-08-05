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

  const handleSubmit = async () => {
    setIsLoading(true);

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
      const timestamp = Date.now() / 100;

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
    <div className="flex  justify-center mx-auto   items-center   px-4">
      <Card className="w-full max-w-3xl  overflow-y-auto p-6 rounded-xl shadow-md bg-white">
        <CardHeader>
          <CardTitle className="text-xl">Upload Your Files</CardTitle>
          <CardDescription>
            Upload both your real and dummy files with a proper display name.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">File Display Name</label>
            <Input
              placeholder="Enter display name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </div>
          <div className="flex justify-around items-center">
            {/* Real File Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Real File</label>
              {realFileUrl ? (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setRealFileUrl(null);
                    setRealFileName(null);
                  }}
                >
                  Change Real File ({realFileName})
                </Button>
              ) : (
                <UploadFileDropzone
                  className="h-[200px] size-52"
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
            <div className="space-y-2">
              <label className="text-sm font-medium">Dummy File</label>
              {dummyFileUrl ? (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setDummyFileUrl(null);
                    setDummyFileName(null);
                  }}
                >
                  Change Dummy File ({dummyFileName})
                </Button>
              ) : (
                <UploadFileDropzone
                  className="h-[200px] size-52"
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
            className="w-full"
          >
            {isLoading ? "Uploading..." : "Submit"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

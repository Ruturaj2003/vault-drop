import { UploadFileButton, UploadFileDropzone } from "@/utils/uploadthing";
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
export const FileUploadCard = () => {
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
            real FIle
            <UploadFileDropzone
              endpoint="fileUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Real Files: ", res);
                alert("Upload Completed");
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            ></UploadFileDropzone>
            Dummy file :
            <UploadFileDropzone
              endpoint="fileUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Dummy  Files: ", res);
                alert("Upload Completed");
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            ></UploadFileDropzone>
          </main>
        </CardContent>
        <CardFooter>
          <Button className="flex-1 flex">Upload Data</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

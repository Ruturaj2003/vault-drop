import { UploadFileButton, UploadFileDropzone } from "@/utils/uploadthing";

export const FileUploadCard = () => {
  return (
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
  );
};

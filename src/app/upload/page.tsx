"use client";

import { FileUploadCard } from "@/components/file-upload-card";
import { PassPhraseForm } from "@/components/pass-phrase-form";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";

const UploadPage = () => {
  const [isPhraseVerified, setIsPhraseVerified] = useState(false);
  const user = useAuth();
  console.log(user.userId);

  return (
    <>
      {isPhraseVerified ? (
        <>
          <FileUploadCard></FileUploadCard>
        </>
      ) : (
        <>
          <PassPhraseForm
            userId={user.userId!}
            setIsPhraseVerified={setIsPhraseVerified}
          ></PassPhraseForm>
        </>
      )}
    </>
  );
};

export default UploadPage;

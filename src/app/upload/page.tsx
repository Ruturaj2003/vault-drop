"use client";

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
          <h1>This is the Form Upload element </h1>
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

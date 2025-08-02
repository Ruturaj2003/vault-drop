"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { LoadingSpinner } from "./loading-spinner";

interface PassPhraseFormProps {
  setIsPhraseVerified: (val: boolean) => void;
  userId: string;
}

export const PassPhraseForm = ({
  setIsPhraseVerified,
  userId,
}: PassPhraseFormProps) => {
  const [passPhrase, setPassPhrase] = useState<string | null>(null);
  const [userPhrase, setUserPhrase] = useState<string>("");
  const [passwordTriesLeft, setPasswordTriesLeft] = useState<number>(4);

  // Case Handling
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const router = useRouter();

  const getUserPassPhrase = async (userId: string) => {
    // TODO: Replace with real DB/API call
    // TODO : Add Error here aswell
    const pass = userId;
    setPassPhrase(pass);
    setIsLoading(false);
    setHasFetched(true);
  };
  // Fetch passphrase (mocked using userId for now)
  useEffect(() => {
    setIsLoading(true);

    getUserPassPhrase(userId);
  }, [userId]);

  // Handle too many failed attempts
  useEffect(() => {
    if (passwordTriesLeft === 0) {
      router.push("/");
    }
  }, [passwordTriesLeft, router]);

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (isError) {
    return <h1>Something went wrong </h1>;
  }
  const verifyPassword = () => {
    if (userPhrase === passPhrase) {
      setIsPhraseVerified(true);
    } else {
      setPasswordTriesLeft((prev) => prev - 1);
    }
  };

  return (
    <div>
      {hasFetched === true && passPhrase !== null ? (
        <>
          <VerifyPassCard
            userPhrase={userPhrase}
            setUserPhrase={setUserPhrase}
            passwordTriesLeft={passwordTriesLeft}
            verifyPassword={verifyPassword}
          ></VerifyPassCard>
        </>
      ) : (
        <>generate Pass caord compeont</>
      )}
    </div>
  );
};

interface VerifyPassCardProps {
  userPhrase: string;
  setUserPhrase: React.Dispatch<React.SetStateAction<string>>;
  passwordTriesLeft: number;
  verifyPassword: () => void;
}

const VerifyPassCard = ({
  userPhrase,
  setUserPhrase,
  passwordTriesLeft,
  verifyPassword,
}: VerifyPassCardProps) => {
  return (
    <div className="flex items-start mt-32 justify-center min-h-screen px-4">
      <Card className="w-full max-w-md shadow-xl border rounded-2xl">
        <div className="p-6">
          <CardTitle className="text-center text-2xl font-semibold mb-2">
            Verify Your Pass Phrase
          </CardTitle>
          <CardDescription className="text-center text-gray-500 mb-4">
            Enter your pass phrase to proceed with uploading documents.
          </CardDescription>
        </div>

        <CardContent className="flex flex-col gap-3 px-6">
          <input
            type="text"
            value={userPhrase}
            onChange={(e) => setUserPhrase(e.target.value)}
            placeholder="Your Pass Phrase"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {passwordTriesLeft < 4 && (
            <p className="text-sm text-red-500">
              {passwordTriesLeft} attempt{passwordTriesLeft !== 1 && "s"} left
            </p>
          )}
        </CardContent>

        <CardFooter className="px-6 pb-6">
          <Button onClick={verifyPassword} className="w-full" variant="default">
            Verify
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

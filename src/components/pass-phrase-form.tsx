"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface PassPhraseFormProps {
  setIsPhraseVerified: (val: boolean) => void;
  userId: string;
}

export const PassPhraseForm = ({
  setIsPhraseVerified,
  userId,
}: PassPhraseFormProps) => {
  // TODO: Add Real DB : and Fetch From there
  const [passPhrase, setPassPhrase] = useState<string | null>(null);

  const [userPhrase, setUserPhrase] = useState<string>("");

  const [passwordTriesLeft, setPasswordTriesLeft] = useState<number>(4);

  useEffect(() => {
    const getUserPassPhrase = async (userId: string) => {
      // API Call
      const pass = userId;

      setPassPhrase(pass);
    };

    getUserPassPhrase(userId);
  }, [userId]);

  const router = useRouter();

  useEffect(() => {
    if (passwordTriesLeft == 0) {
      router.push("/");
    }
  }, [passwordTriesLeft, router]);

  if (!passPhrase) {
    return <h1>Pass Gen Element</h1>;
  }

  const verifyPassword = () => {
    if (passPhrase === userPhrase) {
      setIsPhraseVerified(true);
    } else {
      setPasswordTriesLeft((prev) => prev - 1);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Card className=" max-w-sm flex-1">
        <CardTitle className="p-2 text-center">
          Verify Your Pass Phrase{" "}
        </CardTitle>
        <CardDescription>
          Enter your Pass Phrase below to proceed for Uplaoding documents
        </CardDescription>
        <CardContent>
          <input
            className=""
            type="text"
            value={userPhrase}
            onChange={(e) => setUserPhrase(e.target.value)}
            placeholder="Your Pass Phrase here "
          />
          {passwordTriesLeft < 4 && (
            <h1 className="text-md text-red-500">
              {passwordTriesLeft} Attempts Left
            </h1>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={verifyPassword}>Verify</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

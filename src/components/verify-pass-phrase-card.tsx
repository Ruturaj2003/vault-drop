"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useClerk } from "@clerk/nextjs";

export type UserData = {
  id: string;
  passPhrase?: string;
  fileUrls?: { realFileUrl: string; dummyFileUrl: string }[];
};

interface VerifyPassCardProps {
  user: UserData;
  setIsPhraseVerified: (val: boolean) => void;
}

export const VerifyPassPhraseCard = ({
  user,
  setIsPhraseVerified,
}: VerifyPassCardProps) => {
  const passPhrase = user.passPhrase;
  const [userPhrase, setUserPhrase] = useState<string>("");
  const [passwordTriesLeft, setPasswordTriesLeft] = useState<number>(4);

  const { signOut } = useClerk();

  const verifyPassword = () => {
    if (passPhrase === userPhrase.trim()) {
      toast.success("Pass Phrase Verified");
      setIsPhraseVerified(true);
    } else {
      setPasswordTriesLeft((prev) => prev - 1);
      toast.error("Try again");
    }
  };

  useEffect(() => {
    const handleSignOut = async () => {
      await signOut({ redirectUrl: "/" });
    };
    if (passwordTriesLeft === 0) {
      handleSignOut();
    }
  }, [passwordTriesLeft, signOut]);

  return (
    <>
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
            <Button
              onClick={verifyPassword}
              className="w-full"
              variant="default"
            >
              Verify
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

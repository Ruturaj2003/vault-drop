"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

interface GeneratePassPhraseCardProps {
  userId: string;
}

export const GeneratePassPhraseCard = ({
  userId,
}: GeneratePassPhraseCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [passPhrase, setPassPhrase] = useState("");
  const createUser = useMutation(api.userData.createUser);

  const generatePassPhrase = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        "https://random-word-api.herokuapp.com/word?number=2"
      );
      const words = await res.json();
      setPassPhrase(`${words[0]} ${words[1]}`);
    } catch {
      toast.error("Failed to generate pass phrase");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    const trimmed = passPhrase.trim();
    if (!trimmed) {
      toast.error("Pass phrase cannot be empty");
      return;
    }

    try {
      setIsLoading(true);
      await createUser({ userId, passPhrase: trimmed });
      toast.success("Pass phrase saved successfully");
    } catch (error) {
      toast.error("Something went wrong, please try again");
      console.error("Create user error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto shadow-lg border rounded-2xl bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
          Secure Your Access
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 dark:text-gray-300">
          Enter or generate a secret pass phrase to enable file uploads.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Input
          value={passPhrase}
          onChange={(e) => setPassPhrase(e.target.value)}
          type="text"
          aria-label="Pass phrase input"
          placeholder="Enter your secret phrase"
          className="w-full"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Leading and trailing spaces will be ignored.
        </p>

        <Button
          disabled={isLoading}
          onClick={generatePassPhrase}
          variant="outline"
          className="w-full border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200"
        >
          {isLoading ? "Loading..." : "Generate Pass Phrase"}
        </Button>
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 text-white dark:bg-green-500 dark:hover:bg-green-600"
        >
          {isLoading ? "Saving..." : "Submit"}
        </Button>
      </CardFooter>
    </Card>
  );
};

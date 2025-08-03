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

interface GeneratePassPhraseCardProps {
  userId: string;
}

export const GeneratePassPhraseCard = ({
  userId,
}: GeneratePassPhraseCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [passPhrase, setPassPhrase] = useState("");
  const createUser = useMutation(api.userData.createUser);

  // Generate a 2-word random pass phrase
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
    <Card className="max-w-md mx-auto shadow-lg border rounded-2xl">
      <CardHeader>
        <CardTitle>Secure Your Access</CardTitle>
        <CardDescription>
          Enter or generate a secret pass phrase to enable file uploads.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <input
          value={passPhrase}
          onChange={(e) => setPassPhrase(e.target.value)}
          type="text"
          aria-label="Pass phrase input"
          placeholder="Enter your secret phrase"
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <p className="text-sm text-gray-500">
          Leading and trailing spaces will be ignored.
        </p>

        <Button
          disabled={isLoading}
          onClick={generatePassPhrase}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          {isLoading ? "Loading..." : "Generate Pass Phrase"}
        </Button>
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="flex-1"
          variant="outline"
        >
          {isLoading ? "Saving..." : "Submit"}
        </Button>
      </CardFooter>
    </Card>
  );
};

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

// Flow of compoent creation
/*
2. Create the Card UI :
1. Import the Use mutation call 
   - Get Pass Phrase From user 
            OR
   - Generate Pass Phrase from random word API
   - Submit the Pass Phrase and Create the User 
   - First  check normal behavior what happends , then 
     trigger manual page reload if needed. 

*/

// Flow of action
/*
1. user fill the pass pharse 
2. user genetate the pass phrase 
   - Call the random word api
3. Trim the pass Phrase 
4. user submit the pass phrase 
   - use the mutation hook and create the new user 




*/

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
    setIsLoading(true);
    const url = "https://random-word-api.herokuapp.com/word?number=2";
    const rawData = await fetch(url);
    const phraseArray = await rawData.json();
    const phraseraw = phraseArray.map((ph: string) => {
      return `${ph}`;
    });
    const phrase = phraseraw[0] + " " + phraseraw[1];
    setPassPhrase(phrase);
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (passPhrase.trim() === "") return toast.error("It Cannot be Empty");
    try {
      await createUser({
        userId: userId,
        passPhrase: passPhrase.trim(),
      });

      toast.success("Your Secret Pass is Stored and Safe with Us");
    } catch (error) {
      toast.error("There seems to be some issue , Please Try again");
      console.log("ERROR AT UPLOAD " + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Enter Your Secret Pass Phrase</CardTitle>
          <CardDescription>
            Enter or Generate Your Secret Pass Phrase to access to file upload
            Feature
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-4">
          <input
            value={passPhrase}
            onChange={(e) => {
              setPassPhrase(e.target.value);
            }}
            type="text"
            placeholder="Enter the Pass phrase"
          />
          <p className="text-sm text-red-400">
            The Spaces at the end and at the start will not be considered
          </p>
          <Button
            disabled={isLoading}
            onClick={generatePassPhrase}
            className="bg-green-500 hover:bg-green-800"
          >
            {isLoading ? "Loading" : "Generate the Pass Phrase"}
          </Button>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 "
            variant={"outline"}
          >
            {isLoading ? "Loading" : "Submit"}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { LoadingSpinner } from "./loading-spinner";
import { VerifyPassPhraseCard } from "./verify-pass-phrase-card";
import { GeneratePassPhraseCard } from "./generate-pass-phrase-card";

interface PassPhraseFormProps {
  userId: string;
  setIsPhraseVerified: (val: boolean) => void;
}

export const PassPhraseForm = ({
  userId,
  setIsPhraseVerified,
}: PassPhraseFormProps) => {
  /*
 Flow 

 1. Check if user Exists  and get the data in the Convex DB 

 2. User Exists :
    -Display him the Pass Phrase Component
    -Verify The pass Phrase 
    -If correct setPassPhrase verifed to be true


 3. User Does not Exist : 
    -Display him the Generate Pass Phrase Component
    -Create User
    -trigger refresh or any thing that might be better
    



*/

  const user = useQuery(api.userData.getUserData, { userId });

  // Loading
  if (user === undefined) {
    return LoadingSpinner();
  }

  return (
    <>
      {user !== null ? (
        <VerifyPassPhraseCard />
      ) : (
        <GeneratePassPhraseCard userId={userId} />
      )}
    </>
  );
};

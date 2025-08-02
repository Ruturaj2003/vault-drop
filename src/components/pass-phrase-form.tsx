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

  return <h1>Pass Phrase from</h1>;
};

interface PassPhraseFormProps {
  userId: string;
  setIsPhraseVerified: (val: boolean) => void;
}

export const PassPhraseForm = ({
  userId,
  setIsPhraseVerified,
}: PassPhraseFormProps) => {
  return <h1>Pass Phrase from</h1>;
};

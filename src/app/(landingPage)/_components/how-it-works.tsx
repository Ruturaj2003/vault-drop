import { FileUpIcon, FolderOpen, HourglassIcon } from "lucide-react";

export const HowItWorks = () => {
  return (
    <>
      <div className="border border-pink-500 flex justify-center items-center h-[90vh] flex-col gap-y-4  w-full  mx-auto">
        <div className="max-w-5xl w-full flex flex-col justify-center items-center border border-amber-200">
          <h1 className="text-5xl font-bold mt-10 mb-8">
            How
            <span className="ml-2 mr-2 text-transparent bg-gradient-to-r from-[oklch(0.68_0.25_295)] via-[oklch(0.72_0.25_250)] to-[oklch(0.78_0.18_210)] bg-clip-text">
              Vault Drop
            </span>
            Works
          </h1>
          <p className="max-w-3xl font-body text-2xl text-center text-muted-foreground">
            Creating mystery files is simple. Just three steps to add intrigue
            to your puzzles and games
          </p>
        </div>

        {/* work flow  */}
        <div className="flex items-center justify-evenly max-w-7xl w-full border-green-500 border h-full p-4 py-12">
          {/* Box1 */}
          <div className="flex pt-2 h-full pb-4 px-2 flex-col border border-teal-300  max-w-[250px] gap-y-2">
            {/* stupid bage */}
            <div className="relative h-8 w-8 flex items-center justify-center rounded-full bg-amber-800 top-6 -right-[220px]">
              1
            </div>
            {/* ICON */}
            <div className="mx-auto mb-6 rounded-md border p-8 border-red-400">
              <FileUpIcon className="size-8 text-violet-500" />
            </div>
            {/* Title */}
            <h1 className="text-center font-bold font-heading">
              Upload Real & Dummy PDF
            </h1>
            {/* Text */}
            <p className="font-body text-md text-center text-muted-foreground">
              Add your real file and a decoy. We store both securely.
            </p>
          </div>

          {/* Box2  */}
          <div className="flex pt-2 h-full pb-4 px-2 flex-col border border-teal-300  max-w-[250px] gap-y-2">
            {/* stupid bage */}
            <div className="relative h-8 w-8 flex items-center justify-center rounded-full bg-amber-800 top-6 -right-[220px]">
              1
            </div>
            {/* ICON */}
            <div className="mx-auto mb-6 rounded-md border p-8 border-red-400">
              <FolderOpen className="size-8 text-teal-500" />
            </div>
            {/* Title */}
            <h1 className="text-center font-bold font-heading">
              View in Dashboard
            </h1>
            {/* Text */}
            <p className="font-body text-md text-center text-muted-foreground">
              Only the real file appears in your list — the decoy stays hidden.
            </p>
          </div>

          {/* Box 3 */}
          <div className="flex pt-2 h-full pb-4 px-2 flex-col border border-teal-300  max-w-[250px] gap-y-2">
            {/* stupid bage */}
            <div className="relative h-8 w-8 flex items-center justify-center rounded-full bg-amber-800 top-6 -right-[220px]">
              1
            </div>
            {/* ICON */}
            <div className="mx-auto mb-6 rounded-md border p-8 border-red-400">
              <HourglassIcon className="size-8 text-violet-500" />
            </div>
            {/* Title */}
            <h1 className="text-center font-bold font-heading">
              Wait to Unlock
            </h1>
            {/* Text */}
            <p className="font-body text-md text-center text-muted-foreground">
              Open and wait to see the real file. Any movement or clicks? You
              only get the dummy.
            </p>
          </div>
          {/* End of Boxes */}
        </div>
      </div>
    </>
  );
};

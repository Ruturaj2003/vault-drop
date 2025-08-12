import { Puzzle } from "lucide-react";

export const UseCases = () => {
  return (
    <section className="flex flex-col justify-center items-center min-h-[90vh] w-full    py-12 sm:py-16 lg:py-20 shadow-[0px_-5px_9px_-1px_rgba(199,_199,_199,_0.35)] bg-background">
      {/* Heading */}
      <div className="max-w-5xl text-center mb-10 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          Perfect for
          <span className="text-transparent bg-gradient-to-r from-[oklch(0.68_0.25_295)] via-[oklch(0.72_0.25_250)] to-[oklch(0.78_0.18_210)] bg-clip-text ml-4">
            Every Mystery
          </span>{" "}
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground px-2">
          From escape rooms to surprise reveals, Vault Drop adds an element of
          discovery that makes every experience more engaging.
        </p>
      </div>

      {/* Grid */}
      <div className="w-full  place-items-center grid grid-cols-3 gap-4 px-12">
        <div className="border hover:transform hover:-translate-y-1 transition-all w-full  flex flex-col items-start p-4 rounded-lg bg-[#020a18a9] shadow border-[#394558]   hover:bg-[#020a18]  ">
          {/* Icon */}
          <div className="py-4 w-full  border border-teal-300 flex justify-between ">
            <div className="border  bg-gradient-to-r from-[oklch(0.68_0.25_295)] via-[oklch(0.72_0.25_250)] to-[oklch(0.78_0.18_210)] border-red-300 p-3 rounded-lg">
              <Puzzle />
            </div>
            <div className=""></div>
          </div>
          {/* Title  */}
          <div className="font-header   font-bold mt-2 text-lg">
            Escape Rooms
          </div>
          {/* Text */}
          <p className="text-muted-foreground ">
            Hide secret clues inside PDFs that only appear after the player
            waits without moving — perfect for tension-filled moments.
          </p>
        </div>
        <div>2</div>
        <div>3</div>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </div>
    </section>
  );
};

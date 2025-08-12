import { Puzzle, Brain, Gift, Users, GamepadIcon, MapPin } from "lucide-react";

export const UseCases = () => {
  const useCases = [
    {
      icon: Puzzle,
      title: "Escape Rooms",
      description:
        "Hide secret clues inside PDFs that only appear after the player waits without moving — perfect for tension-filled moments.",
    },
    {
      icon: Brain,
      title: "Mystery Games",
      description:
        "Add timed patience tests where story details or codes are revealed only after the player stays still.",
    },
    {
      icon: Gift,
      title: "Surprise Reveals",
      description:
        "Store hidden artwork, maps, or text that only show up for patient explorers.",
    },
    {
      icon: Users,
      title: "Team Challenges",
      description:
        "In co-op puzzle games, let one player act as the 'watcher' who must wait to see the real clue.",
    },
    {
      icon: GamepadIcon,
      title: "ARGs & Storytelling",
      description:
        "Build alternate reality games where certain files transform into real content only after time passes.",
    },
    {
      icon: MapPin,
      title: "Treasure Hunts",
      description:
        "Place hints inside dummy PDFs that become real maps when viewed patiently at the right stage of the hunt.",
    },
  ];

  return (
    <section className="flex flex-col justify-center items-center min-h-[90vh] w-full py-12 sm:py-16 lg:py-20 shadow-[0px_-5px_9px_-1px_rgba(199,_199,_199,_0.35)] bg-background">
      {/* Heading */}
      <div className="max-w-5xl text-center mb-10 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          Perfect for
          <span className="text-transparent bg-gradient-to-r from-[oklch(0.68_0.25_295)] via-[oklch(0.72_0.25_250)] to-[oklch(0.78_0.18_210)] bg-clip-text ml-4">
            Every Mystery
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground px-2">
          From escape rooms to surprise reveals, Vault Drop adds an element of
          discovery that makes every experience more engaging.
        </p>
      </div>

      {/* Grid */}
      <div className="w-full place-items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 sm:px-12">
        {useCases.map((item, idx) => (
          <div
            key={idx}
            className="border hover:transform hover:-translate-y-1 transition-all h-full w-full flex flex-col items-start p-4 rounded-lg
                       bg-white dark:bg-[#020a18a9]
                       border-gray-200 dark:border-[#394558]
                       shadow hover:bg-gray-50 dark:hover:bg-[#020a18]"
          >
            {/* Icon */}
            <div className="py-4 w-full flex justify-start">
              <div
                className="bg-gradient-to-r from-[oklch(0.68_0.25_295)] via-[oklch(0.72_0.25_250)] to-[oklch(0.78_0.18_210)]
                              p-3 rounded-lg text-white shadow-md"
              >
                <item.icon className="w-6 h-6" />
              </div>
            </div>
            {/* Title */}
            <div className="font-header font-bold mt-2 text-lg text-gray-900 dark:text-gray-100">
              {item.title}
            </div>
            {/* Text */}
            <p className="text-gray-600 dark:text-gray-400">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

import { FileText, Key, Puzzle, Hourglass, Eye, Shield } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "PDF-only",
    description:
      "Supports PDF files to keep rendering and reveal behavior predictable.",
  },
  {
    icon: Key,
    title: "Passkey Gate",
    description:
      "Require or generate a secret passkey during upload to control access.",
  },
  {
    icon: Puzzle,
    title: "Made for Games",
    description:
      "Built for escape rooms, ARGs, and puzzle events — a reveal mechanic, not a sharing tool.",
  },
  {
    icon: Hourglass,
    title: "15s Inactivity Unlock",
    description:
      "After a short preview, the viewer must remain inactive for 15 seconds to unlock the real PDF.",
  },
  {
    icon: Eye,
    title: "Decoy & Reveal",
    description:
      "Viewers see the dummy PDF first; any movement or click during the watch window keeps the dummy visible.",
  },
  {
    icon: Shield,
    title: "Authenticated & Private",
    description:
      "Clerk authentication and a Convex backend control access — no public links or sharing.",
  },
];
export const Features = () => {
  return (
    <section className="flex flex-col justify-center items-center min-h-[90vh] w-full py-12 sm:py-16 lg:py-20 shadow-[0px_-5px_9px_-1px_rgba(199,_199,_199,_0.35)] bg-background">
      {/* Heading */}
      <div className="max-w-5xl text-center mb-10 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          Built for
          <span className="text-transparent bg-gradient-to-r from-[oklch(0.68_0.25_295)] via-[oklch(0.72_0.25_250)] to-[oklch(0.78_0.18_210)] bg-clip-text ml-4">
            Simplicity
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground px-2">
          Vault Drop is designed to be powerful yet simple. No complex setups,
          just pure mystery at your fingertips.
        </p>
      </div>

      {/* Grid */}
      <div className="w-full place-items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 sm:px-12">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="text-center  max-w-[400px]  items-center h-full w-full 
shadow-[18px_22px_13px_-24px_rgba(255,_255,_255,_0.45)]
            flex flex-col  p-4 rounded-lg 
                       bg-white dark:bg-[#020a18a9]
                       border-gray-200 dark:border-[#394558]
                       hover:bg-gray-50 dark:hover:bg-[#020a18]
                       "
          >
            {/* Icon */}
            <div className="py-4 w-full flex justify-center">
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

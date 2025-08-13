import { FileUpIcon, FolderOpen, HourglassIcon } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: (
        <FileUpIcon className="w-8 h-8 text-violet-500 dark:text-violet-400" />
      ),
      title: "Upload Real & Dummy PDF",
      description: "Add your real file and a decoy. We store both securely.",
    },
    {
      number: 2,
      icon: <FolderOpen className="w-8 h-8 text-teal-500 dark:text-teal-400" />,
      title: "View in Dashboard",
      description:
        "Only the real file appears in your list — the decoy stays hidden.",
    },
    {
      number: 3,
      icon: (
        <HourglassIcon className="w-8 h-8 text-amber-500 dark:text-amber-400" />
      ),
      title: "Wait to Unlock",
      description:
        "Open and wait to see the real file. Any movement or clicks? You only get the dummy.",
    },
  ];

  return (
    <section
      id="HowItWorks"
      className="flex flex-col justify-center items-center min-h-[90vh] w-full    py-12 sm:py-16 lg:py-20 shadow-[0px_-5px_9px_-1px_rgba(199,_199,_199,_0.35)] bg-background"
    >
      {/* Heading */}
      <div className="max-w-5xl text-center mb-10 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          How{" "}
          <span className="text-transparent bg-gradient-to-r from-[oklch(0.68_0.25_295)] via-[oklch(0.72_0.25_250)] to-[oklch(0.78_0.18_210)] bg-clip-text">
            Vault Drop
          </span>{" "}
          Works
        </h1>
        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground px-2">
          Creating mystery files is simple. Just three steps to add intrigue to
          your puzzles and games.
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-6xl w-full">
        {steps.map((step) => (
          <div
            key={step.number}
            className="relative flex flex-col items-center p-5 sm:p-6 rounded-lg border border-border bg-card shadow-sm transition hover:shadow-md"
          >
            {/* Step Number Badge */}
            <div className="absolute -top-3 sm:-top-4 left-3 sm:left-4 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-primary-foreground font-bold text-xs sm:text-sm">
              {step.number}
            </div>

            {/* Icon */}
            <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-md bg-muted mb-4 sm:mb-6">
              {step.icon}
            </div>

            {/* Title */}
            <h2 className="text-base sm:text-lg font-bold mb-1 sm:mb-2 text-center">
              {step.title}
            </h2>

            {/* Description */}
            <p className="text-center text-sm sm:text-base text-muted-foreground">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

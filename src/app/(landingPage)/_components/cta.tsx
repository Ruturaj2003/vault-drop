import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const CTA = () => {
  return (
    <section className="flex flex-col justify-center items-center min-h-[90vh] gap-6 w-full max-w-5xl mx-auto px-4">
      {/* Badge */}
      <div className="flex justify-center">
        <div className="flex items-center gap-3 px-5 py-2.5 bg-vault-card border border-vault-border rounded-full">
          <Sparkles className="w-6 h-6 text-vault-purple" />
          <span className="text-base sm:text-lg text-muted-foreground font-medium">
            Ready to create mystery?
          </span>
          <Sparkles className="w-6 h-6 text-[oklch(0.78_0.18_210)]" />
        </div>
      </div>

      {/* Heading */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl sm:text-6xl font-bold">Start Creating</h1>
        <h1 className="text-4xl sm:text-6xl font-bold text-transparent bg-gradient-to-r from-[oklch(0.68_0.25_295)] via-[oklch(0.72_0.25_250)] to-[oklch(0.78_0.18_210)] bg-clip-text">
          Vault Drops Today
        </h1>
      </div>

      {/* Subtext */}
      <p className="max-w-2xl font-body text-lg sm:text-2xl text-center text-muted-foreground px-2">
        Join the mystery makers who are already using Vault Drop to create
        unforgettable experiences in their games and projects.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row w-full justify-center gap-4 sm:gap-8">
        <Button className="w-full sm:w-[35%] py-6 text-md font-bold text-black bg-gradient-to-r from-[oklch(0.68_0.25_295)] via-[oklch(0.72_0.25_250)] to-[oklch(0.78_0.18_210)]">
          Create Your First Vault
          <ArrowRight className="ml-2" />
        </Button>
        <Button
          variant="outline"
          className="w-full sm:w-[35%] py-6 text-md font-bold"
        >
          Try Demo Vault
        </Button>
      </div>

      {/* Built With */}
      <div className="text-center mt-16">
        <div className="inline-flex flex-wrap items-center gap-4 px-8 py-4 bg-card border border-vault-border rounded-full">
          <span className="text-sm text-muted-foreground">Built with:</span>
          <div className="flex items-center gap-4 text-sm font-medium flex-wrap justify-center">
            <span className="text-[oklch(0.68_0.25_295)]">Next.js</span>
            <div className="w-1 h-1 bg-muted-foreground rounded-full" />
            <span className="text-[oklch(0.78_0.18_210)]">Convex</span>
            <div className="w-1 h-1 bg-muted-foreground rounded-full" />
            <span className="text-[oklch(0.68_0.25_295)]">Clerk</span>
            <div className="w-1 h-1 bg-muted-foreground rounded-full" />
            <span className="text-[oklch(0.78_0.18_210)]">ShadCN</span>
          </div>
        </div>
      </div>
    </section>
  );
};

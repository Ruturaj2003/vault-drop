import { Button } from "@/components/ui/button";
import { ArrowRight, Dot, SparkleIcon, Sparkles, StarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
export const CTA = () => {
  return (
    <div className="flex justify-center items-center min-h-[90vh] flex-col gap-y-4 w-full max-w-5xl mx-auto px-4">
      <div className="mx-auto flex flex-col justify-center items-center gap-2 sm:gap-x-4 text-center sm:text-left">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-vault-card border border-vault-border rounded-full">
            <Sparkles className="w-4 h-4 text-vault-purple" />
            <span className="text-sm text-muted-foreground">
              Ready to create mystery?
            </span>
            <Sparkles className="w-4 h-4 text-accent" />
          </div>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold ">Start Creating</h1>

        <h1 className="text-4xl sm:text-6xl font-bold text-transparent bg-gradient-to-r from-[oklch(0.68_0.25_295)] via-[oklch(0.72_0.25_250)] to-[oklch(0.78_0.18_210)] bg-clip-text">
          Vault Drops Today
        </h1>
      </div>

      <p className="max-w-2xl font-body text-lg sm:text-2xl text-center text-muted-foreground px-2">
        Join the mystery makers who are already using Vault Drop to create
        unforgettable experiences in their games and projects.
      </p>

      {/* Btns */}
      <div className="flex w-full  justify-center gap-x-8 max-3xl">
        <Button className="text-black w-[35%] p-6 text-md font-bold bg-gradient-to-r from-[oklch(0.68_0.25_295)] via-[oklch(0.72_0.25_250)] to-[oklch(0.78_0.18_210)]">
          Create Your First Vault
          <ArrowRight></ArrowRight>
        </Button>
        <Button variant={"outline"} className=" w-[35%] p-6  text-md font-bold">
          Try Demo Vault
        </Button>
      </div>

      {/* Buttons */}
      {/* <div className="flex flex-col sm:flex-row items-center w-full mt-4 gap-3  sm:gap-x-6">
        <Button className="w-full   sm:w-auto bg-gradient-to-r from-[oklch(0.68_0.25_295)] via-[oklch(0.72_0.25_250)] to-[oklch(0.78_0.18_210)]">
          Create Your First Vault
          <ArrowRight />
        </Button>
        <Button variant="outline" className="w-full sm:w-auto">
          Try Demo Vault
        </Button>
      </div> */}
      <div className="text-center mt-16">
        <div className="inline-flex flex-wrap items-center gap-4 px-8 py-4 bg-card border border-vault-border rounded-full">
          <span className="text-sm text-muted-foreground">Built with:</span>
          <div className="flex items-center gap-4 text-sm font-medium">
            <span className="text-vault-purple">Next.js</span>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <span className="text-accent">Convex</span>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <span className="text-vault-purple">Clerk</span>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <span className="text-accent">ShadCN</span>
          </div>
        </div>
      </div>
    </div>
  );
};

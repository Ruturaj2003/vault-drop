import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-xl shadow-lg border border-border bg-card transition-colors">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-foreground">
          Welcome Back
        </h1>
        <p className="text-center text-sm text-muted-foreground mb-8">
          Sign in to continue to your account
        </p>
        <SignIn
          path="/sign-in" // required when routing="path"
          routing="path"
          appearance={{
            elements: {
              rootBox: "w-full",
              formButtonPrimary:
                "bg-primary hover:bg-primary/90 text-primary-foreground transition-colors",
              footerActionLink:
                "text-primary hover:underline hover:text-primary/90",
            },
          }}
        />
      </div>
    </div>
  );
}

export const Footer = () => {
  return (
    <footer className="w-full border-t border-vault-border bg-card py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} Dotaizz. All rights reserved.</span>
        <span className="text-center sm:text-right">
          Built with{" "}
          <span className="text-vault-purple font-medium">mystery</span> in
          mind.
        </span>
      </div>
    </footer>
  );
};

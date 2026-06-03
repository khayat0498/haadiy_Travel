import { SafarLogo } from "./SafarLogo";

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-10 px-6 bg-card/30">
      <div className="container max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <SafarLogo className="h-8 md:h-16 w-auto" />
        <p className="text-xs text-muted-foreground">
          © 2026 Safar — Digital Silk Road Heritage
        </p>
        <div className="flex gap-5 text-xs text-muted-foreground">
          <a href="/privacy" className="hover:text-foreground">
            Privacy
          </a>
          <a href="/terms" className="hover:text-foreground">
            Terms
          </a>
          <a href="/contact" className="hover:text-foreground">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { WifiOff, Moon, Sun } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "../components/ui/sonner";
import { useOnlineStatus } from "../hooks/use-online-status";
import { useTheme } from "../hooks/use-theme";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page non trouvée</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Cette page n'a pas pu charger
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Un problème est survenu. Vous pouvez réessayer ou retourner à l'accueil.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Réessayer
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: any }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "BiblioSen — Ressources pédagogiques pour étudiants sénégalais" },
      { name: "description", content: "BiblioSen centralise les ressources pédagogiques validées pour les étudiants sénégalais : cours, fiches, vidéos et exercices organisés par matière et par niveau." },
      { name: "author", content: "BiblioSen" },
      { property: "og:title", content: "BiblioSen — Ressources pédagogiques pour étudiants sénégalais" },
      { property: "og:description", content: "BiblioSen centralise les ressources pédagogiques validées pour les étudiants sénégalais : cours, fiches, vidéos et exercices organisés par matière et par niveau." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@BiblioSen" },
      { name: "twitter:title", content: "BiblioSen — Ressources pédagogiques pour étudiants sénégalais" },
      { name: "twitter:description", content: "BiblioSen centralise les ressources pédagogiques validées pour les étudiants sénégalais : cours, fiches, vidéos et exercices organisés par matière et par niveau." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/c141d7d6-be14-446c-8c7e-5d78ca32ed7a" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/c141d7d6-be14-446c-8c7e-5d78ca32ed7a" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const themeInitScript = `
  try {
    var stored = localStorage.getItem("bibliosen-theme");
    var theme = stored || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
  } catch (e) {}
`;

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-card/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
          <span className="text-2xl">📚</span>
          <span className="text-primary">Biblio</span>Sen
        </Link>
        <div className="flex items-center gap-1 md:gap-4">
          <Link
            to="/"
            activeProps={{ className: "text-primary font-semibold" }}
            inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
            className="rounded-md px-2 py-1.5 text-sm transition-colors md:px-3"
          >
            Accueil
          </Link>
          <Link
            to="/catalogue"
            activeProps={{ className: "text-primary font-semibold" }}
            inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
            className="rounded-md px-2 py-1.5 text-sm transition-colors md:px-3"
          >
            Catalogue
          </Link>
          <Link
            to="/contact"
            activeProps={{ className: "text-primary font-semibold" }}
            inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
            className="rounded-md px-2 py-1.5 text-sm transition-colors md:px-3"
          >
            Contact
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
            className="ml-1 rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2 text-lg font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
            <span className="text-2xl">📚</span>
            <span className="text-primary">Biblio</span>Sen
          </div>
          <div className="text-sm text-muted-foreground">
            © 2025 BiblioSen — Tous droits réservés
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link to="/contact" className="hover:text-foreground">Contact</Link>
            <span className="text-border">|</span>
            <span>Mentions légales</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function OfflineBanner() {
  const isOnline = useOnlineStatus();
  if (isOnline) return null;
  return (
    <div className="fixed top-14 left-0 right-0 z-40 flex items-center justify-center gap-2 bg-destructive px-4 py-2 text-center text-xs font-medium text-destructive-foreground md:text-sm">
      <WifiOff className="h-4 w-4" />
      Vous êtes hors connexion — certaines fonctionnalités peuvent être limitées.
    </div>
  );
}

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <OfflineBanner />
      <main className="flex-1 pt-14">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
}

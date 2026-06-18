import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Users, GraduationCap, Smartphone } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BiblioSen — Ressources pédagogiques pour étudiants sénégalais" },
      { name: "description", content: "BiblioSen centralise les ressources pédagogiques validées pour les étudiants sénégalais. Cours, fiches, vidéos et exercices organisés par matière et par niveau." },
      { property: "og:title", content: "BiblioSen — Ressources pédagogiques pour étudiants sénégalais" },
      { property: "og:description", content: "Cours, fiches, vidéos et exercices validés pour le système éducatif sénégalais." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-background px-4 py-20 md:px-6 md:py-28">
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-foreground) 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
            <span className="inline-block h-2 w-2 rounded-full bg-green" />
            Plateforme éducative sénégalaise
          </div>
          <h1
            className="text-4xl font-extrabold tracking-tight text-foreground md:text-6xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Toutes vos ressources pédagogiques,
            <span className="text-primary"> en un seul endroit</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            BiblioSen centralise les cours, fiches, vidéos et exercices validés pour
            le système éducatif sénégalais. Réduisez votre temps de recherche et
            accédez à du contenu fiable, même hors connexion.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/catalogue"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
            >
              <BookOpen className="h-4 w-4" />
              Explorer les ressources
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary px-8 py-3.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
            >
              Poser une question
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card px-4 py-16 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <StatCard
              icon={<Users className="h-6 w-6 text-primary" />}
              number="24 000+"
              label="Étudiants actifs sur BiblioSen"
            />
            <StatCard
              icon={<GraduationCap className="h-6 w-6 text-primary" />}
              number="1 200+"
              label="Ressources validées par niveau"
            />
            <StatCard
              icon={<Smartphone className="h-6 w-6 text-primary" />}
              number="87 %"
              label="Accès via smartphone au Sénégal"
            />
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-primary px-4 py-16 text-primary-foreground md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-3xl font-bold tracking-tight md:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Prêt à améliorer vos révisions ?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Rejoignez des milliers d'étudiants qui utilisent BiblioSen chaque jour pour
            réussir leur année.
          </p>
          <Link
            to="/catalogue"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-8 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition-all hover:bg-accent/90"
          >
            <BookOpen className="h-4 w-4" />
            Voir le catalogue
          </Link>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  icon,
  number,
  label,
}: {
  icon: React.ReactNode;
  number: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-border bg-background p-8 text-center transition-shadow hover:shadow-md">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
        {icon}
      </div>
      <div
        className="text-3xl font-bold text-foreground md:text-4xl"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {number}
      </div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

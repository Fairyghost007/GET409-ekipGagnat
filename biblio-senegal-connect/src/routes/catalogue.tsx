import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BookOpen, Video, FileText, Calculator, Globe, Scale, CheckCircle, XCircle, Filter, GraduationCap } from "lucide-react";
import { Loader2, Sparkles, Search, Star, Share2, History, X, Mic, MicOff, Download } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { askDifyAgent } from "@/lib/dify.functions";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
import { parseFiche } from "@/lib/fiche-parser";
import { downloadFichePdf } from "@/lib/fiche-pdf";


export const Route = createFileRoute("/catalogue")({
  head: () => ({
    meta: [
      { title: "Catalogue — BiblioSen" },
      { name: "description", content: "Parcourez les ressources pédagogiques validées pour les étudiants sénégalais. Filtrez par niveau : Licence, Lycée, Terminale." },
      { property: "og:title", content: "Catalogue — BiblioSen" },
      { property: "og:description", content: "Ressources pédagogiques validées par matière et par niveau." },
    ],
  }),
  component: CataloguePage,
});

type Ressource = {
  id: number;
  titre: string;
  matiere: string;
  niveau: string;
  etablissement: string;
  description: string;
  disponible: boolean;
  type: "cours" | "fiche" | "video" | "exercices" | "resume";
};

const ressources: Ressource[] = [
  {
    id: 1,
    titre: "Cours de Mathématiques L1",
    matiere: "Mathématiques",
    niveau: "Licence 1",
    etablissement: "FASTEF Dakar",
    description: "Algèbre linéaire",
    disponible: true,
    type: "cours",
  },
  {
    id: 2,
    titre: "Fiche Bac — Philosophie",
    matiere: "Philosophie",
    niveau: "Terminale",
    etablissement: "Lycée Limamoulaye",
    description: "Dissertation guidée",
    disponible: true,
    type: "fiche",
  },
  {
    id: 3,
    titre: "Vidéo SVT — Génétique",
    matiere: "SVT",
    niveau: "Terminale",
    etablissement: "Lycée JF Kennedy",
    description: "Cours + schémas",
    disponible: false,
    type: "video",
  },
  {
    id: 4,
    titre: "Exercices Comptabilité L2",
    matiere: "Comptabilité",
    niveau: "Licence 2",
    etablissement: "UCAD Dakar",
    description: "TD corrigés",
    disponible: true,
    type: "exercices",
  },
  {
    id: 5,
    titre: "Résumé Histoire-Géo Terminale",
    matiere: "Histoire-Géographie",
    niveau: "Terminale",
    etablissement: "Lycée Blaise Diagne",
    description: "Fiche de révision",
    disponible: true,
    type: "resume",
  },
  {
    id: 6,
    titre: "Cours Droit des Obligations",
    matiere: "Droit",
    niveau: "Licence 3",
    etablissement: "FSJP Dakar",
    description: "Polycopié validé FSJP",
    disponible: true,
    type: "cours",
  },
];

const typeIcons: Record<string, React.ReactNode> = {
  cours: <BookOpen className="h-4 w-4" />,
  fiche: <FileText className="h-4 w-4" />,
  video: <Video className="h-4 w-4" />,
  exercices: <Calculator className="h-4 w-4" />,
  resume: <Globe className="h-4 w-4" />,
};

const typeLabels: Record<string, string> = {
  cours: "Cours",
  fiche: "Fiche",
  video: "Vidéo",
  exercices: "Exercices",
  resume: "Résumé",
};

function FicheReponse({ text }: { text: string }) {
  const parsed = parseFiche(text);

  if (!parsed) {
    return (
      <p className="whitespace-pre-wrap break-words text-sm text-foreground">
        {text}
      </p>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h3
          className="text-base font-bold text-primary md:text-lg"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {parsed.title}
        </h3>
        <button
          type="button"
          onClick={() => downloadFichePdf(parsed)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <Download className="h-3.5 w-3.5" />
          PDF
        </button>
      </div>

      {parsed.sections.map((section, i) => {
        if (section.kind === "keyValue") {
          return (
            <div
              key={i}
              className="grid grid-cols-1 gap-2 rounded-lg border border-border bg-background p-3 text-sm sm:grid-cols-2"
            >
              {section.items.map(([k, v], j) => (
                <div key={j}>
                  <span className="font-semibold text-foreground">{k} : </span>
                  <span className="text-muted-foreground">{v}</span>
                </div>
              ))}
            </div>
          );
        }

        if (section.kind === "list") {
          return (
            <div key={i}>
              <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">
                {section.header}
              </h4>
              <ul className="space-y-1.5">
                {section.items.map((item, j) => {
                  const parts = item.split("|").map((p) => p.trim());
                  const urlIdx = parts.findIndex((p) => /^https?:\/\//.test(p));

                  return (
                    <li key={j} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      {urlIdx !== -1 ? (
                        <span>
                          {parts
                            .filter((_, idx) => idx !== urlIdx)
                            .join(" — ")}{" "}
                          <a
                            href={parts[urlIdx]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary underline-offset-2 hover:underline"
                          >
                            (lien)
                          </a>
                        </span>
                      ) : (
                        <span>{item}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        }

        return (
          <div key={i}>
            <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">
              {section.header}
            </h4>
            <p className="text-sm text-muted-foreground">{section.text}</p>
          </div>
        );
      })}
    </div>
  );
}

function CataloguePage() {
  const [filtre, setFiltre] = useState<"Tous" | "Licence" | "Lycée" | "Terminale">("Tous");
  const [recherche, setRecherche] = useState("");
  const [favorisUniquement, setFavorisUniquement] = useState(false);
  const [favoris, setFavoris] = useLocalStorage<number[]>("bibliosen-favoris", []);
  const [historique, setHistorique] = useLocalStorage<string[]>("bibliosen-historique", []);

  const ask = useServerFn(askDifyAgent);
  const [query, setQuery] = useState("");
  const [ressourceTerrain, setRessourceTerrain] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const speech = useSpeechRecognition((transcript) => {
    setQuery((prev) => (prev ? `${prev} ${transcript}` : transcript));
  });

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery || loading) return;
    setLoading(true);
    setError(null);
    setAnswer(null);
    try {
      const payload: { query: string; ressource_terrain?: string } = {
        query: trimmedQuery,
      };
      if (ressourceTerrain.trim()) {
        payload.ressource_terrain = ressourceTerrain.trim();
      }
      const res = await ask({ data: payload });
      if (res.ok) {
        setAnswer(res.outputs || "Aucune réponse reçue.");
        setHistorique((prev) => [trimmedQuery, ...prev.filter((q) => q !== trimmedQuery)].slice(0, 5));
      } else if (res.error === "timeout") {
        setError("La réponse prend trop de temps — réessaye.");
      } else {
        setError("Service temporairement indisponible.");
      }
    } catch {
      setError("Service temporairement indisponible.");
    } finally {
      setLoading(false);
    }
  };

  const toggleFavori = (id: number) => {
    setFavoris((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const partagerRessource = async (r: Ressource) => {
    const url = `${window.location.origin}/catalogue#ressource-${r.id}`;
    const shareData = { title: r.titre, text: r.description, url };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      await navigator.clipboard.writeText(url);
      toast.success("Lien copié dans le presse-papiers");
    } catch {
      // l'utilisateur a annulé le partage — rien à faire
    }
  };

  const filtres: Array<"Tous" | "Licence" | "Lycée" | "Terminale"> = [
    "Tous",
    "Licence",
    "Lycée",
    "Terminale",
  ];

  const ressourcesFiltrees = useMemo(() => {
    const rechercheNormalisee = recherche.trim().toLowerCase();
    return ressources.filter((r) => {
      if (favorisUniquement && !favoris.includes(r.id)) return false;
      if (filtre === "Licence" && !r.niveau.startsWith("Licence")) return false;
      if (filtre === "Lycée" && !r.niveau.includes("Terminale")) return false;
      if (filtre === "Terminale" && r.niveau !== "Terminale") return false;
      if (
        rechercheNormalisee &&
        !`${r.titre} ${r.matiere}`.toLowerCase().includes(rechercheNormalisee)
      ) {
        return false;
      }
      return true;
    });
  }, [filtre, recherche, favorisUniquement, favoris]);

  return (
    <div className="min-h-screen bg-background px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center md:mb-12">
          <h1
            className="text-3xl font-extrabold tracking-tight text-foreground md:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Catalogue des ressources
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Parcourez les ressources pédagogiques validées pour le système éducatif sénégalais.
          </p>
        </div>

        {/* Agent IA */}
        <div className="mx-auto mb-10 max-w-3xl rounded-2xl border border-border bg-card p-5 shadow-sm md:p-6">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5" style={{ color: "var(--gold)" }} />
            <h2
              className="text-lg font-bold text-foreground md:text-xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Agent IA BiblioSen
            </h2>
          </div>
          <form onSubmit={handleAsk} className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Pose ta question sur une matière, un niveau ou une ressource..."
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                  disabled={loading}
                />
                {speech.isSupported && (
                  <button
                    type="button"
                    onClick={() => (speech.isListening ? speech.stop() : speech.start())}
                    disabled={loading}
                    aria-label={speech.isListening ? "Arrêter la dictée" : "Saisir par la voix"}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 transition-colors ${
                      speech.isListening
                        ? "text-destructive"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {speech.isListening ? (
                      <MicOff className="h-4 w-4 animate-pulse" />
                    ) : (
                      <Mic className="h-4 w-4" />
                    )}
                  </button>
                )}
              </div>
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Recherche...
                  </>
                ) : (
                  <>Demander à l'agent 📚</>
                )}
              </button>
            </div>
            <input
              type="text"
              value={ressourceTerrain}
              onChange={(e) => setRessourceTerrain(e.target.value)}
              placeholder="Ressource terrain (facultatif) — ex: polycopié FSJP, fiche Limamoulaye..."
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              disabled={loading}
            />
          </form>

          {historique.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <History className="h-3.5 w-3.5 text-muted-foreground" />
              {historique.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setQuery(q)}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {q}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setHistorique([])}
                className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs text-muted-foreground hover:text-destructive"
              >
                <X className="h-3 w-3" />
                Effacer
              </button>
            </div>
          )}

          {(loading || answer || error) && (
            <div className="mt-4 rounded-lg bg-muted p-4 text-sm">
              {loading && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  L'agent réfléchit...
                </div>
              )}
              {!loading && error && (
                <p className="font-medium text-destructive">{error}</p>
              )}
              {!loading && answer && <FicheReponse text={answer} />}
            </div>
          )}
        </div>

        {/* Recherche */}
        <div className="mx-auto mb-6 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              placeholder="Rechercher par titre ou matière..."
              className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        {/* Filtres */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
          {filtres.map((f) => (
            <button
              key={f}
              onClick={() => setFiltre(f)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                filtre === f
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "border border-border bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {f}
            </button>
          ))}
          <button
            onClick={() => setFavorisUniquement((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              favorisUniquement
                ? "bg-primary text-primary-foreground shadow-md"
                : "border border-border bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <Star className="h-3.5 w-3.5" />
            Favoris
          </button>
        </div>

        {/* Grille */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ressourcesFiltrees.map((r) => (
            <div
              key={r.id}
              id={`ressource-${r.id}`}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
                  {typeIcons[r.type]}
                  {typeLabels[r.type]}
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => toggleFavori(r.id)}
                    aria-label={favoris.includes(r.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
                    className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Star
                      className={`h-4 w-4 ${favoris.includes(r.id) ? "fill-current text-primary" : ""}`}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => partagerRessource(r)}
                    aria-label="Partager cette ressource"
                    className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                  {r.disponible ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green/10 px-2.5 py-1 text-xs font-semibold text-green">
                      <CheckCircle className="h-3 w-3" />
                      Disponible
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-semibold text-destructive">
                      <XCircle className="h-3 w-3" />
                      Indisponible
                    </span>
                  )}
                </div>
              </div>

              <h3
                className="text-lg font-bold text-foreground transition-colors group-hover:text-primary"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {r.titre}
              </h3>

              <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-3.5 w-3.5 text-primary" />
                  <span>{r.matiere}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-3.5 w-3.5 text-primary" />
                  <span>{r.niveau}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Scale className="h-3.5 w-3.5 text-primary" />
                  <span>{r.etablissement}</span>
                </div>
              </div>

              <p className="mt-3 text-sm text-muted-foreground">{r.description}</p>

              <div className="mt-6 pt-4 border-t border-border">
                <button
                  disabled={!r.disponible}
                  className={`w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
                    r.disponible
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "cursor-not-allowed bg-muted text-muted-foreground"
                  }`}
                >
                  {r.disponible ? "Accéder à la ressource" : "Bientôt disponible"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {ressourcesFiltrees.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">Aucune ressource ne correspond à ce filtre.</p>
          </div>
        )}
      </div>
    </div>
  );
}

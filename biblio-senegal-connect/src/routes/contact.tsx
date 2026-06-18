import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — BiblioSen" },
      { name: "description", content: "Contactez l'équipe BiblioSen. Université Cheikh Anta Diop, Dakar, Sénégal." },
      { property: "og:title", content: "Contact — BiblioSen" },
      { property: "og:description", content: "Contactez l'équipe BiblioSen." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [envoye, setEnvoye] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnvoye(true);
    setTimeout(() => setEnvoye(false), 4000);
    setFormData({ nom: "", email: "", telephone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center md:mb-12">
          <h1
            className="text-3xl font-extrabold tracking-tight text-foreground md:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Contactez-nous
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Une question ? Une suggestion ? L'équipe BiblioSen vous répond.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Formulaire */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              {envoye && (
                <div className="mb-6 flex items-center gap-3 rounded-xl bg-green/10 p-4 text-green">
                  <CheckCircle className="h-5 w-5 shrink-0" />
                  <span className="text-sm font-medium">
                    Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="nom" className="mb-1.5 block text-sm font-medium text-foreground">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    required
                    value={formData.nom}
                    onChange={handleChange}
                    placeholder="Prénom et nom"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="votre@email.com"
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="telephone" className="mb-1.5 block text-sm font-medium text-foreground">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      placeholder="+221 77 XXX XX XX"
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Décrivez votre demande..."
                    className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-lg px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:opacity-90"
                  style={{ backgroundColor: "#1A6B4A" }}
                >
                  <Send className="h-4 w-4" />
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>

          {/* Informations de contact */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3
                  className="mb-4 text-lg font-bold text-foreground"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Nos coordonnées
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Adresse</p>
                      <p className="text-sm text-muted-foreground">
                        Université Cheikh Anta Diop
                        <br />
                        Dakar, Sénégal
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">E-mail</p>
                      <p className="text-sm text-muted-foreground">contact@bibliosen.sn</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Téléphone</p>
                      <p className="text-sm text-muted-foreground">+221 33 825 XX XX</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-primary p-6 text-primary-foreground">
                <h3
                  className="mb-2 text-lg font-bold"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Horaires d'ouverture
                </h3>
                <div className="space-y-1 text-sm text-primary-foreground/80">
                  <p>Lundi — Vendredi : 8h00 — 18h00</p>
                  <p>Samedi : 9h00 — 13h00</p>
                  <p>Dimanche : Fermé</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

## Backlog S3 — EkipGagnat (v2 — auditée)

### HMW Définitif
"Comment pourrions-nous offrir aux étudiants sénégalais un accès centralisé, hors-ligne et institutionnellement validé à des ressources pédagogiques organisées par niveau et par matière ?"

---

### User Stories MUST
*(À construire obligatoirement en S3 — 4 MUST validés)*

#### US-01
**Story :** En tant qu'Awa, je veux naviguer dans un catalogue de ressources organisé par matière et par niveau afin de trouver ce dont j'ai besoin en moins de 3 clics sans perdre de temps
**Priorité :** MUST
**Outil :** Bolt.new
**Effort :** Moyen
**Adresse :** Gain Creator — navigation par matière et niveau, résultat en moins de 3 clics
**Critère d'acceptation :** Une étudiante teste seule la plateforme et atteint une ressource correspondant à sa matière en moins de 3 minutes sans aide extérieure

#### US-02
**Story :** En tant qu'Awa, je veux télécharger une fiche ou une vidéo pédagogique en Wi-Fi afin de la consulter plus tard sans utiliser mes données mobiles
**Priorité :** MUST
**Outil :** Bolt.new
**Effort :** Moyen
**Adresse :** Pain Reliever — MVP léger et téléchargeable fonctionnel sur réseau faible
**Critère d'acceptation :** Une ressource téléchargée en Wi-Fi est consultable en mode avion sans message d'erreur ni temps de chargement

#### US-03
**Story :** En tant qu'Awa, je veux accéder aux ressources de base sans créer de compte afin de commencer à apprendre immédiatement sans friction
**Priorité :** MUST
**Outil :** Bolt.new
**Effort :** Faible
**Adresse :** Pain Reliever — accès sans abonnement obligatoire
**Critère d'acceptation :** La page d'accueil permet de consulter au moins une ressource complète sans aucune étape d'inscription ni écran de connexion

#### US-04
**Story :** En tant qu'Awa, je veux poser une question sur une notion que je ne comprends pas afin d'obtenir une explication simple en français adaptée à mon niveau
**Priorité :** MUST
**Outil :** Dify
**Effort :** Moyen
**Adresse :** Pain Reliever — accompagnement personnalisé disponible à tout moment
**Critère d'acceptation :** L'assistant Dify répond en français à une question de cours en moins de 10 secondes avec une explication compréhensible — validée par 3 étudiants testeurs sur 5

---

### User Stories SHOULD
*(À construire si le temps le permet)*

#### US-05 *(rétrogradée depuis MUST v1)*
**Story :** En tant qu'Awa, je veux voir un badge de validation officielle et la date de dernière mise à jour sur chaque ressource afin de savoir si l'information est fiable et à jour
**Priorité :** SHOULD
**Outil :** Bolt.new
**Effort :** Faible
**Adresse :** Gain Creator — badge de validation officielle avec date de dernière révision
**Critère d'acceptation :** Chaque fiche affiche visiblement un indicateur de validation et une date — 3 testeurs sur 5 déclarent faire confiance au contenu après l'avoir vu

#### US-06
**Story :** En tant qu'Awa, je veux voir ma progression par matière sous forme visuelle afin de rester motivée et de savoir où concentrer mes efforts
**Priorité :** SHOULD
**Outil :** Bolt.new
**Effort :** Moyen
**Adresse :** Gain Creator — système de progression par badges et matières
**Critère d'acceptation :** Un indicateur de progression s'affiche sur le profil après consultation d'au moins 3 ressources dans une même matière

#### US-07
**Story :** En tant qu'Awa, je veux recevoir une notification légère quand une ressource de ma matière est mise à jour afin de ne pas travailler avec du contenu périmé
**Priorité :** SHOULD
**Outil :** Bolt.new + SMS API
**Effort :** Élevé
**Adresse :** Pain Reliever — cycle éditorial trimestriel, ressources obsolètes
**Critère d'acceptation :** Une alerte SMS ou in-app est reçue dans les 24h suivant la mise à jour d'une ressource dans une matière suivie

#### US-08
**Story :** En tant qu'Awa, je veux filtrer les ressources par type (fiche, vidéo, exercice) afin de choisir le format le mieux adapté à ma façon d'apprendre
**Priorité :** SHOULD
**Outil :** Bolt.new
**Effort :** Faible
**Adresse :** Gain Creator — centralisation gratuite de toutes les ressources
**Critère d'acceptation :** Des filtres par type de contenu sont accessibles depuis la page de résultats et réduisent la liste affichée en temps réel

---

### User Stories COULD
*(Roadmap post-MVP)*

#### US-09
**Story :** En tant qu'enseignant, je veux soumettre une ressource pédagogique via un espace dédié afin qu'elle soit examinée et potentiellement publiée sur la plateforme
**Priorité :** COULD
**Outil :** Bolt.new + Dify
**Effort :** Élevé
**Adresse :** Produits & Services — espace contributeur enseignant avec validation communautaire
**Critère d'acceptation :** Un formulaire de soumission est accessible aux enseignants enregistrés et déclenche une file de validation avant toute publication

#### US-10
**Story :** En tant qu'Awa en région, je veux accéder aux ressources via un point relais physique afin de contourner l'absence de connexion dans ma zone
**Priorité :** COULD
**Outil :** Autre — stratégie de distribution terrain (clé USB, partenaires locaux)
**Effort :** Élevé
**Adresse :** Pain Reliever — fracture numérique régionale
**Critère d'acceptation :** Un protocole de synchronisation hors-ligne est testé dans au moins une ville hors Dakar avec retour terrain documenté

#### US-11
**Story :** En tant qu'Awa, je veux partager une ressource utile directement sur WhatsApp afin d'aider mes camarades sans quitter la plateforme
**Priorité :** COULD
**Outil :** Bolt.new
**Effort :** Faible
**Adresse :** Gain Creator — réduction des inégalités d'accès par diffusion communautaire
**Critère d'acceptation :** Un bouton de partage WhatsApp génère un lien direct vers la ressource consultée

---

### Sprint S3

**Semaine 1 :** US-01 (navigation catalogue) + US-03 (accès sans compte) — socle fonctionnel de la plateforme sur Bolt.new, testable dès J+5

**Semaine 2 :** US-02 (mode hors-ligne) + US-04 (assistant Dify en français) — couche hors-ligne et accompagnement IA intégrés, testés avec 3 étudiants avant la démo

**Démo S6 :** US-01 + US-02 + US-04 à démontrer obligatoirement en live
→ Parcours complet : ouvrir la plateforme sans compte → trouver une ressource en moins de 3 clics → la consulter hors-ligne → poser une question à l'assistant Dify → recevoir une réponse en français en moins de 10 secondes

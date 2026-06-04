## Contraintes MVP — EkipGagnat

### Persona
Awa · 21 ans · Étudiante en Licence · Dakar, Sénégal · Smartphone Android

### Contraintes Non Négociables

#### Contrainte 1
**Critère :** Le MVP DOIT fonctionner en mode hors-ligne après un premier téléchargement en Wi-Fi
**Origine :** Chapeau Blanc
**Élimine :** Toute fonctionnalité nécessitant une connexion permanente (streaming vidéo en direct, chat en temps réel, notifications push continues)

#### Contrainte 2
**Critère :** Le MVP DOIT être optimisé pour smartphones Android avec moins de 2 Go de RAM et un affichage lisible sans zoom sur écran de 5 pouces
**Origine :** Chapeau Blanc
**Élimine :** Les interfaces desktop-first, les animations lourdes, les PDF non compressés et tout contenu non responsive

#### Contrainte 3
**Critère :** Le MVP DOIT proposer des ressources rédigées en français et alignées sur les programmes officiels sénégalais (FASTEF, UCAD, DPFC)
**Origine :** Chapeau Blanc
**Élimine :** L'intégration ou la traduction automatique de contenus étrangers (Khan Academy, Coursera) non validés par les autorités locales

#### Contrainte 4
**Critère :** Le MVP NE DOIT PAS dépendre d'un financement ou d'une validation opérationnelle exclusive de l'État pour fonctionner au quotidien
**Origine :** Chapeau Noir
**Élimine :** Tout modèle de gouvernance centralisé à 100% sur un ministère, tout processus de mise à jour nécessitant un décret ou une validation administrative longue

#### Contrainte 5
**Critère :** Le MVP DOIT inclure un mécanisme de mise à jour des contenus avec un cycle maximum de 3 mois, piloté par une équipe éditoriale indépendante
**Origine :** Chapeau Noir
**Élimine :** Les bibliothèques statiques sans versioning, les contenus publiés sans date de validation ni responsable éditorial identifié

#### Contrainte 6
**Critère :** Le MVP DOIT être accessible sans création de compte obligatoire pour la consultation des ressources de base
**Origine :** Chapeau Blanc
**Élimine :** Les tunnels d'inscription bloquants, la collecte de données personnelles en prérequis, les paywalls sur les contenus fondamentaux

---

### Fonctionnalités Éliminées

- **Streaming vidéo en ligne** → éliminé parce que la connexion 3G instable et le coût des données rendent l'expérience inutilisable pour 60% des utilisateurs cibles
- **Interface web desktop** → éliminée parce que le persona utilise exclusivement un smartphone Android comme point d'accès à Internet
- **Contenu en anglais non adapté** → éliminé parce que les programmes sénégalais (UCAD, FASTEF) ne sont pas alignés sur les curricula anglo-saxons des plateformes existantes
- **Système de chat ou forum en temps réel** → éliminé parce qu'il requiert une connexion permanente et une modération continue incompatible avec un MVP à ressources limitées
- **Tableau de bord enseignant avancé** → éliminé parce que le MVP se concentre sur le persona étudiant ; l'outil enseignant constitue une phase ultérieure distincte
- **Gamification complexe (badges, classements)** → éliminée parce qu'elle alourdit le développement du MVP sans répondre au besoin primaire d'accès aux ressources
- **Gestion décentralisée régionale automatique** → éliminée parce que la fracture numérique entre Dakar et les régions nécessite une stratégie de déploiement terrain séparée, hors scope MVP

---

### Critère de Validation Final
Le MVP est valide si et seulement si : une étudiante comme Awa, avec un smartphone Android et sans connexion active, peut trouver, consulter et comprendre une ressource pédagogique validée correspondant à sa matière et à son niveau en moins de 3 minutes.

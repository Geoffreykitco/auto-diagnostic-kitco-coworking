
export const informationsSection = {
  title: "Partie 1 : Informations Générales",
  description: "Cette section permet de mieux comprendre votre espace de coworking et son contexte. Les informations collectées nous aideront à établir un diagnostic plus précis et à fournir des recommandations adaptées.",
  questions: [
    {
      question: "Depuis combien de temps votre espace de coworking est-il ouvert ?",
      tooltip: "L'ancienneté permet d'évaluer votre positionnement sur le marché et votre maturité opérationnelle.",
      type: "single",
      options: [
        { label: "Moins de 6 mois", points: 0 },
        { label: "6 mois à 1 an", points: 0 },
        { label: "1 à 3 ans", points: 0 },
        { label: "Plus de 3 ans", points: 0 }
      ]
    },
    {
      question: "Quels types de bureaux proposez-vous ?",
      tooltip: "L'offre de bureaux influence votre clientèle cible et votre stratégie de commercialisation.",
      type: "multiple",
      options: [
        { label: "Bureaux partagés", points: 0 },
        { label: "Bureaux privés", points: 0 },
        { label: "Salles de réunion", points: 0 },
        { label: "Autres (préciser)", points: 0 }
      ]
    },
    {
      question: "Quels types d'abonnement proposez-vous ?",
      tooltip: "Un choix flexible d'abonnements permet d'attirer différents profils de clients et d'optimiser le taux d'occupation.",
      type: "multiple",
      options: [
        { label: "Abonnement mensuel", points: 0 },
        { label: "Abonnement annuel", points: 0 },
        { label: "Pass à la journée", points: 0 },
        { label: "Pack de journées (5/10/20/...)", points: 0 },
        { label: "Autres (préciser)", points: 0 }
      ]
    },
    {
      question: "Quel est le statut de votre espace de coworking ?",
      tooltip: "Le statut de propriété influe sur vos coûts fixes et votre capacité d'investissement à long terme.",
      type: "single",
      options: [
        { label: "Propriétaire", points: 0 },
        { label: "Locataire", points: 0 },
        { label: "Partenariat avec un tiers", points: 0 }
      ]
    },
    {
      question: "Quelle est la superficie totale de votre espace de coworking ?",
      tooltip: "La taille de votre espace impacte vos coûts d'exploitation et votre capacité à accueillir des membres.",
      type: "single",
      options: [
        { label: "Moins de 100 m²", points: 0 },
        { label: "100 à 300 m²", points: 0 },
        { label: "300 à 600 m²", points: 0 },
        { label: "Plus de 600 m²", points: 0 }
      ]
    },
    {
      question: "Avez-vous d'autres espaces de coworking concurrents à proximité ?",
      tooltip: "Analyser la concurrence locale permet d'ajuster votre positionnement et votre stratégie de différenciation.",
      type: "single",
      options: [
        { label: "Oui, plusieurs dans un rayon de 1 km", points: 0 },
        { label: "Oui, quelques-uns dans ma ville", points: 0 },
        { label: "Non, je suis le seul espace de coworking dans la zone", points: 0 },
        { label: "Je ne sais pas", points: 0 }
      ]
    },
    {
      question: "Combien de coworkers peut accueillir votre coworking ?",
      tooltip: "La capacité d'accueil est un indicateur clé pour évaluer votre potentiel de croissance et votre rentabilité.",
      type: "single",
      options: [
        { label: "Moins de 10", points: 0 },
        { label: "10 à 30", points: 0 },
        { label: "30 à 50", points: 0 },
        { label: "50 à 100", points: 0 },
        { label: "Plus de 100", points: 0 }
      ]
    },
    {
      question: "Dans quelle ville est situé votre espace de coworking ?",
      tooltip: "La localisation influence fortement l'attractivité et le type de clientèle que vous attirez.",
      type: "text",
      options: []
    },
    {
      question: "Quels sont les horaires d'ouverture de votre espace ?",
      tooltip: "Les horaires d'ouverture influencent l'accessibilité et le type de clientèle attiré.",
      type: "single",
      options: [
        { label: "Lundi au Vendredi - Horaires de bureau", points: 0 },
        { label: "Ouvert 7J/7 - Horaires de bureau", points: 0 },
        { label: "Ouvert 7J/7 - 24h/24", points: 0 }
      ]
    },
    {
      question: "Quel est votre pourcentage moyen de remplissage ?",
      tooltip: "Le taux d'occupation est un indicateur clé de la performance et de l'attractivité de votre espace.",
      type: "text",
      options: []
    },
    {
      question: "Quel est le type de clientèle majoritaire dans votre espace ?",
      tooltip: "Identifier votre clientèle cible permet d'adapter votre offre et votre communication pour mieux répondre aux attentes des membres.",
      type: "single",
      options: [
        { label: "Freelances et indépendants", points: 0 },
        { label: "Startups et PME", points: 0 },
        { label: "Grandes entreprises", points: 0 },
        { label: "Étudiants", points: 0 }
      ]
    },
    {
      question: "Quels services proposez-vous dans votre espace ?",
      tooltip: "Des services variés améliorent l'expérience client et favorisent la rétention des membres.",
      type: "multiple",
      options: [
        { label: "Phone box", points: 0 },
        { label: "Salle de repos", points: 0 },
        { label: "Cuisine équipée", points: 0 },
        { label: "Café / Boissons à disposition", points: 0 },
        { label: "Service d'impression", points: 0 },
        { label: "Casier sécurisé", points: 0 },
        { label: "Accès 24h/24", points: 0 },
        { label: "Accès à un espace extérieur (terrasse, balcon, jardin)", points: 0 }
      ]
    }
  ]
};


export const sections = {
  informations: {
    title: "Partie 1 : Informations Générales",
    description: "Cette section permet de mieux comprendre votre espace de coworking et son contexte. Les informations collectées nous aideront à établir un diagnostic plus précis.",
    questions: [
      {
        question: "Depuis combien de temps votre espace de coworking est-il ouvert ?",
        tooltip: "L'ancienneté de votre espace",
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
        tooltip: "Les différents espaces de travail disponibles",
        type: "multiple",
        options: [
          { label: "Bureaux partagés", points: 0 },
          { label: "Bureaux privés", points: 0 },
          { label: "Salles de réunion", points: 0 },
          { label: "Espaces dédiés à des événements", points: 0 },
          { label: "Autres", points: 0 }
        ]
      },
      {
        question: "Quels types d'abonnement proposez-vous ?",
        tooltip: "Les différentes formules d'accès à l'espace",
        type: "multiple",
        options: [
          { label: "Abonnement mensuel", points: 0 },
          { label: "Abonnement annuel", points: 0 },
          { label: "Pass à la journée", points: 0 },
          { label: "Pack de journées (5/10/20/...)", points: 0 },
          { label: "Autres", points: 0 }
        ]
      },
      {
        question: "Quel est le statut de votre espace de coworking ?",
        tooltip: "Votre relation légale avec les locaux",
        type: "single",
        options: [
          { label: "Propriétaire", points: 0 },
          { label: "Locataire", points: 0 },
          { label: "Partenariat avec un tiers", points: 0 }
        ]
      },
      {
        question: "Quelle est la superficie totale de votre espace de coworking ?",
        tooltip: "La surface totale disponible",
        type: "single",
        options: [
          { label: "Moins de 100m²", points: 0 },
          { label: "100 à 300m²", points: 0 },
          { label: "300 à 600m²", points: 0 },
          { label: "Plus de 600m²", points: 0 }
        ]
      },
      {
        question: "Avez-vous d'autres espaces de coworking concurrents à proximité ?",
        tooltip: "La concurrence dans votre zone géographique",
        type: "single",
        options: [
          { label: "Oui, plusieurs dans un rayon de 1 km", points: 0 },
          { label: "Oui, quelques-uns dans ma ville", points: 0 },
          { label: "Non, je suis le seul espace de coworking dans la zone", points: 0 },
          { label: "Je ne sais pas", points: 0 }
        ]
      },
      {
        question: "Dans quelle ville est situé votre espace de coworking ?",
        tooltip: "La localisation de votre espace",
        type: "single",
        options: [
          { label: "Paris", points: 0 },
          { label: "Lyon", points: 0 },
          { label: "Marseille", points: 0 },
          { label: "Bordeaux", points: 0 },
          { label: "Lille", points: 0 },
          { label: "Toulouse", points: 0 },
          { label: "Nantes", points: 0 },
          { label: "Strasbourg", points: 0 },
          { label: "Autre", points: 0 }
        ]
      },
      {
        question: "Quel est le pourcentage moyen de remplissage de votre espace de coworking ?",
        tooltip: "Votre taux d'occupation moyen",
        type: "single",
        options: [
          { label: "Moins de 25%", points: 0 },
          { label: "25% à 50%", points: 0 },
          { label: "50% à 75%", points: 0 },
          { label: "Plus de 75%", points: 0 }
        ]
      },
      {
        question: "Quel est votre point mort mensuel ?",
        tooltip: "Le montant minimum de revenus nécessaire pour couvrir vos charges",
        type: "single",
        options: [
          { label: "Moins de 5000€", points: 0 },
          { label: "5000€ à 10000€", points: 0 },
          { label: "10000€ à 20000€", points: 0 },
          { label: "Plus de 20000€", points: 0 },
          { label: "Je ne sais pas", points: 0 }
        ]
      }
    ]
  },
  acquisition: {
    title: "Partie 1 : Acquisition",
    description: "L'acquisition concerne votre capacité à attirer de nouveaux membres dans votre espace de coworking. Cette section évalue vos stratégies marketing et votre visibilité.",
    questions: [
      {
        question: "Est-ce que vous faites du marketing actif pour votre espace de coworking ?",
        tooltip: "À quelle fréquence faites-vous la promotion de votre espace auprès des membres potentiels ?",
        type: "single",
        options: [
          { label: "Oui, régulièrement", points: 10 },
          { label: "Oui, occasionnellement", points: 5 },
          { label: "Non, aucun effort marketing", points: 0 }
        ]
      },
      {
        question: "Quelle présence en ligne avez-vous ?",
        tooltip: "Quelles plateformes digitales utilisez-vous pour présenter votre espace ?",
        type: "multiple",
        options: [
          { label: "Site web", points: 5 },
          { label: "Réseaux sociaux", points: 5 },
          { label: "Google Maps et annuaires locaux", points: 5 },
          { label: "Aucune", points: 0 }
        ]
      },
      {
        question: "Proposez-vous une offre spéciale pour les nouveaux membres ?",
        tooltip: "Avez-vous des promotions pour encourager les essais ?",
        type: "single",
        options: [
          { label: "Oui, essai gratuit ou réduction", points: 10 },
          { label: "Oui, mais peu promu", points: 5 },
          { label: "Non, pas d'offres spéciales", points: 0 }
        ]
      },
      {
        question: "Comment communiquez-vous avec les clients potentiels ?",
        tooltip: "Quels canaux utilisez-vous pour interagir avec les prospects ?",
        type: "multiple",
        options: [
          { label: "Newsletter ou campagnes email", points: 5 },
          { label: "Engagement sur les réseaux sociaux", points: 5 },
          { label: "Bouche à oreille et événements networking", points: 5 },
          { label: "Pas de communication régulière", points: 0 }
        ]
      }
    ]
  },
  activation: {
    title: "Partie 2 : Activation",
    description: "L'activation mesure votre capacité à transformer les visiteurs en membres actifs. Cette section évalue vos processus d'intégration et d'engagement initial.",
    questions: [
      {
        question: "Que peut faire un visiteur quand il découvre votre espace ?",
        tooltip: "Quelles options proposez-vous aux visiteurs potentiels ?",
        type: "multiple",
        options: [
          { label: "Visiter librement sans engagement", points: 5 },
          { label: "Demander une visite guidée", points: 5 },
          { label: "Essayer gratuitement pendant une période limitée", points: 5 },
          { label: "Réserver et payer immédiatement", points: 5 }
        ]
      },
      {
        question: "Avez-vous un processus d'intégration structuré pour les nouveaux membres ?",
        tooltip: "Comment accueillez-vous les nouveaux membres ?",
        type: "single",
        options: [
          { label: "Oui, avec un processus d'accueil clair", points: 10 },
          { label: "Oui, mais informel", points: 5 },
          { label: "Non, les membres se débrouillent seuls", points: 0 }
        ]
      },
      {
        question: "Vos offres et tarifs sont-ils facilement compréhensibles ?",
        tooltip: "La clarté de votre proposition commerciale",
        type: "single",
        options: [
          { label: "Oui, tout est clair", points: 10 },
          { label: "Oui, mais certains aspects nécessitent des explications", points: 5 },
          { label: "Non, c'est souvent confus", points: 0 }
        ]
      },
      {
        question: "Faites-vous un suivi après la première visite ou l'essai ?",
        tooltip: "Comment gérez-vous le suivi des prospects ?",
        type: "single",
        options: [
          { label: "Oui, systématiquement", points: 10 },
          { label: "Oui, mais pas toujours", points: 5 },
          { label: "Non, jamais", points: 0 }
        ]
      }
    ]
  },
  retention: {
    title: "Partie 3 : Rétention",
    description: "La rétention évalue votre capacité à fidéliser vos membres sur le long terme. Cette section analyse vos stratégies pour maintenir leur satisfaction et leur engagement.",
    questions: [
      {
        question: "Les membres reviennent-ils régulièrement ?",
        tooltip: "Fréquence d'utilisation de l'espace par les membres",
        type: "single",
        options: [
          { label: "Oui, la plupart", points: 10 },
          { label: "Oui, mais seulement certains", points: 5 },
          { label: "Non, fort turnover", points: 0 }
        ]
      },
      {
        question: "Proposez-vous des programmes de fidélité ou des abonnements ?",
        tooltip: "Stratégies de fidélisation des membres",
        type: "single",
        options: [
          { label: "Oui, structurés et bien promus", points: 10 },
          { label: "Oui, mais sous-utilisés", points: 5 },
          { label: "Pas de programme de fidélité", points: 0 }
        ]
      },
      {
        question: "Organisez-vous des événements pour votre communauté ?",
        tooltip: "Fréquence des événements communautaires",
        type: "single",
        options: [
          { label: "Oui, régulièrement", points: 10 },
          { label: "Oui, occasionnellement", points: 5 },
          { label: "Non, jamais", points: 0 }
        ]
      },
      {
        question: "Collectez-vous activement les retours de vos membres ?",
        tooltip: "Méthodes de collecte des feedbacks",
        type: "single",
        options: [
          { label: "Oui, via des sondages ou discussions régulières", points: 10 },
          { label: "Oui, mais informellement", points: 5 },
          { label: "Non, pas de collecte de feedback", points: 0 }
        ]
      }
    ]
  },
  revenus: {
    title: "Partie 4 : Revenus",
    description: "La section revenus analyse votre capacité à monétiser votre espace et à générer des revenus durables à travers différentes sources.",
    questions: [
      {
        question: "Quelle est votre principale source de revenus ?",
        tooltip: "Sources de revenus principales de votre espace",
        type: "multiple",
        options: [
          { label: "Abonnements mensuels", points: 5 },
          { label: "Pass journaliers/horaires", points: 5 },
          { label: "Location de bureaux privés", points: 5 },
          { label: "Services annexes (café, impression, services aux entreprises)", points: 5 }
        ]
      },
      {
        question: "Vos revenus sont-ils stables et prévisibles ?",
        tooltip: "Stabilité des revenus mensuels",
        type: "single",
        options: [
          { label: "Oui, grâce aux abonnements", points: 10 },
          { label: "Oui, mais avec quelques incertitudes", points: 5 },
          { label: "Non, les revenus fluctuent significativement", points: 0 }
        ]
      },
      {
        question: "Proposez-vous des services additionnels pour augmenter les revenus ?",
        tooltip: "Services générant des revenus supplémentaires",
        type: "single",
        options: [
          { label: "Oui, bien optimisés", points: 10 },
          { label: "Oui, mais peu utilisés", points: 5 },
          { label: "Pas de services additionnels", points: 0 }
        ]
      }
    ]
  },
  recommandation: {
    title: "Partie 5 : Recommandation",
    description: "La recommandation évalue votre capacité à transformer vos membres en ambassadeurs de votre espace, générant ainsi une croissance organique.",
    questions: [
      {
        question: "Les membres recommandent-ils spontanément votre espace de coworking ?",
        tooltip: "Recommandations spontanées par les membres",
        type: "single",
        options: [
          { label: "Oui, souvent", points: 10 },
          { label: "Oui, parfois", points: 5 },
          { label: "Non, rarement", points: 0 }
        ]
      },
      {
        question: "Avez-vous un programme de parrainage ou de fidélité ?",
        tooltip: "Programme de recommandation structuré",
        type: "single",
        options: [
          { label: "Oui, avec des avantages clairs", points: 10 },
          { label: "Oui, mais peu utilisé", points: 5 },
          { label: "Pas de programme de parrainage", points: 0 }
        ]
      },
      {
        question: "Avez-vous des avis en ligne visibles ?",
        tooltip: "Présence d'avis clients en ligne",
        type: "single",
        options: [
          { label: "Oui, avec beaucoup d'avis positifs", points: 10 },
          { label: "Oui, mais peu nombreux", points: 5 },
          { label: "Pas d'avis", points: 0 }
        ]
      },
      {
        question: "Encouragez-vous les membres à laisser des avis ou à parrainer ?",
        tooltip: "Stratégie de collecte d'avis et de parrainage",
        type: "single",
        options: [
          { label: "Oui, systématiquement", points: 10 },
          { label: "Oui, mais occasionnellement", points: 5 },
          { label: "Non, jamais", points: 0 }
        ]
      }
    ]
  }
};

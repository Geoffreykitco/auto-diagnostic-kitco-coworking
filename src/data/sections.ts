
export const sections = {
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
      },
      {
        question: "À quelle fréquence publiez-vous sur les réseaux sociaux ?",
        tooltip: "À quelle fréquence partagez-vous du contenu sur votre espace de coworking ?",
        type: "single",
        options: [
          { label: "Tous les jours", points: 10 },
          { label: "Plusieurs fois par semaine", points: 7 },
          { label: "Une fois par semaine", points: 5 },
          { label: "Rarement ou jamais", points: 0 }
        ]
      }
    ]
  },
  activation: {
    title: "Partie 2 : Activation",
    description: "L'activation mesure votre capacité à transformer les visiteurs en membres actifs. Cette section évalue vos processus d'intégration et d'engagement initial.",
    questions: [
      {
        question: "Quel est votre processus d'accueil des nouveaux membres ?",
        tooltip: "Comment intégrez-vous les nouveaux arrivants ?",
        options: [
          { label: "Programme d'intégration complet", points: 10 },
          { label: "Briefing simple", points: 5 },
          { label: "Pas de processus formel", points: 0 }
        ]
      },
      {
        question: "Proposez-vous des événements communautaires ?",
        tooltip: "À quelle fréquence organisez-vous des événements pour vos membres ?",
        options: [
          { label: "Régulièrement (hebdomadaire/mensuel)", points: 10 },
          { label: "Occasionnellement", points: 5 },
          { label: "Rarement ou jamais", points: 0 }
        ]
      }
    ]
  },
  retention: {
    title: "Partie 3 : Rétention",
    description: "La rétention évalue votre capacité à fidéliser vos membres sur le long terme. Cette section analyse vos stratégies pour maintenir leur satisfaction et leur engagement.",
    questions: [
      {
        question: "Quel est votre taux de rétention mensuel ?",
        tooltip: "Pourcentage de membres qui renouvellent leur abonnement",
        options: [
          { label: "Plus de 90%", points: 10 },
          { label: "Entre 70% et 90%", points: 5 },
          { label: "Moins de 70%", points: 0 }
        ]
      },
      {
        question: "Avez-vous un programme de fidélité ?",
        tooltip: "Offrez-vous des avantages aux membres de longue durée ?",
        options: [
          { label: "Oui, avec plusieurs avantages", points: 10 },
          { label: "Oui, basique", points: 5 },
          { label: "Non", points: 0 }
        ]
      }
    ]
  },
  revenus: {
    title: "Partie 4 : Revenus",
    description: "La section revenus analyse votre capacité à monétiser votre espace et à générer des revenus durables à travers différentes sources.",
    questions: [
      {
        question: "Proposez-vous différentes formules d'abonnement ?",
        tooltip: "Variété des offres disponibles",
        options: [
          { label: "Plusieurs formules flexibles", points: 10 },
          { label: "2-3 formules standard", points: 5 },
          { label: "Une seule formule", points: 0 }
        ]
      },
      {
        question: "Avez-vous des services additionnels payants ?",
        tooltip: "Services générant des revenus supplémentaires",
        options: [
          { label: "Plusieurs services additionnels", points: 10 },
          { label: "Quelques services basiques", points: 5 },
          { label: "Aucun service additionnel", points: 0 }
        ]
      }
    ]
  },
  recommandation: {
    title: "Partie 5 : Recommandation",
    description: "La recommandation évalue votre capacité à transformer vos membres en ambassadeurs de votre espace, générant ainsi une croissance organique.",
    questions: [
      {
        question: "Avez-vous un programme de parrainage ?",
        tooltip: "Encouragez-vous les membres à recommander votre espace ?",
        options: [
          { label: "Oui, avec récompenses", points: 10 },
          { label: "Oui, sans récompense", points: 5 },
          { label: "Non", points: 0 }
        ]
      },
      {
        question: "Mesurez-vous la satisfaction de vos membres ?",
        tooltip: "Collectez-vous les avis et retours d'expérience ?",
        options: [
          { label: "Oui, régulièrement", points: 10 },
          { label: "Oui, occasionnellement", points: 5 },
          { label: "Non", points: 0 }
        ]
      }
    ]
  }
};

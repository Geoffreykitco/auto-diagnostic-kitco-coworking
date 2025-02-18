
export const sections = {
  informations: {
    title: "Partie 1 : Informations Générales",
    description: "Cette section permet de mieux comprendre votre espace de coworking et son contexte. Les informations collectées nous aideront à établir un diagnostic plus précis.",
    questions: [
      {
        question: "Depuis combien de temps votre espace de coworking est-il ouvert ?",
        tooltip: "Connaître l'ancienneté de votre coworking permet d'évaluer sa maturité et son positionnement sur le marché.",
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
        tooltip: "L'offre de bureaux impacte directement votre clientèle cible et votre stratégie de commercialisation.",
        type: "multiple",
        options: [
          { label: "Bureaux partagés", points: 0 },
          { label: "Bureaux privés", points: 0 },
          { label: "Salles de réunion", points: 0 },
          { label: "Espaces dédiés à des événements", points: 0 },
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
        tooltip: "Être propriétaire ou locataire influence la rentabilité et la capacité d'investissement à long terme.",
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
          { label: "Moins de 100m²", points: 0 },
          { label: "100 à 300m²", points: 0 },
          { label: "300 à 600m²", points: 0 },
          { label: "Plus de 600m²", points: 0 }
        ]
      },
      {
        question: "Avez-vous d'autres espaces de coworking concurrents à proximité ?",
        tooltip: "Analyser la concurrence locale aide à ajuster votre positionnement et votre stratégie de différenciation.",
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
        tooltip: "La capacité d'accueil de votre espace est un indicateur important pour évaluer votre potentiel de croissance.",
        type: "text",
        options: []
      },
      {
        question: "Dans quelle ville est situé votre espace de coworking ?",
        tooltip: "La localisation influence fortement l'attractivité et le type de clientèle que vous attirez.",
        type: "text",
        options: []
      },
      {
        question: "Quel est le pourcentage moyen de remplissage de votre espace de coworking ?",
        tooltip: "Un bon taux d'occupation garantit la rentabilité et aide à anticiper les besoins d'expansion ou d'ajustement des offres.",
        type: "text",
        options: []
      },
      {
        question: "Quel est votre point mort mensuel ?",
        tooltip: "Connaître votre point mort vous permet de mieux gérer vos finances et de fixer des objectifs de revenus réalistes.",
        type: "text",
        options: []
      }
    ]
  },
  acquisition: {
    title: "Acquisition - Comment attirer de nouveaux membres ?",
    description: "Objectif : Évaluer la capacité d'un coworking à générer du trafic qualifié et à se rendre visible auprès de ses futurs membres.",
    questions: [
      {
        question: "Quels canaux utilisez-vous pour attirer de nouveaux membres ?",
        tooltip: "Une stratégie d'acquisition efficace repose sur la diversité des canaux utilisés pour toucher différentes audiences.",
        type: "multiple",
        options: [
          { label: "Site internet optimisé", points: 5 },
          { label: "Réseaux sociaux actifs (LinkedIn, Instagram, Facebook, etc.)", points: 5 },
          { label: "Google Maps et annuaires locaux", points: 5 },
          { label: "Événements et partenariats locaux", points: 5 },
          { label: "Campagnes publicitaires payantes", points: 5 },
          { label: "Bouche-à-oreille et recommandations", points: 5 },
          { label: "Aucun canal spécifique utilisé", points: 0 }
        ]
      },
      {
        question: "Quel canal vous apporte le plus de nouveaux membres ?",
        tooltip: "Identifier votre canal le plus performant permet d'optimiser vos efforts d'acquisition.",
        type: "single",
        options: [
          { label: "Site internet optimisé", points: 0 },
          { label: "Réseaux sociaux actifs", points: 0 },
          { label: "Google Maps et annuaires locaux", points: 0 },
          { label: "Événements et partenariats locaux", points: 0 },
          { label: "Campagnes publicitaires payantes", points: 0 },
          { label: "Bouche-à-oreille et recommandations", points: 0 }
        ]
      },
      {
        question: "À quelle fréquence faites-vous des actions pour attirer de nouveaux membres ?",
        tooltip: "La régularité des actions d'acquisition est essentielle pour maintenir un flux constant de nouveaux membres.",
        type: "single",
        options: [
          { label: "Tous les jours", points: 10 },
          { label: "Quelques fois par semaine", points: 7 },
          { label: "Quelques fois par mois", points: 5 },
          { label: "Occasionnellement / sans régularité", points: 2 },
          { label: "Aucune action spécifique", points: 0 }
        ]
      },
      {
        question: "Proposez-vous une offre découverte ou un essai gratuit aux nouveaux prospects ?",
        tooltip: "Une offre d'essai permet aux prospects de tester le coworking sans engagement, augmentant ainsi les chances de conversion.",
        type: "single",
        options: [
          { label: "Oui, un essai gratuit ou une réduction de bienvenue", points: 10 },
          { label: "Oui, mais peu mise en avant", points: 5 },
          { label: "Non, mais j'envisage d'en proposer une", points: 2 },
          { label: "Non, aucune offre spéciale", points: 0 }
        ]
      },
      {
        question: "Comment suivez-vous les prospects après un premier contact ?",
        tooltip: "Une relance efficace permet de maximiser les conversions en maintenant l'intérêt des prospects.",
        type: "single",
        options: [
          { label: "Relance systématique par email ou téléphone", points: 10 },
          { label: "Relance partielle selon le profil du prospect", points: 7 },
          { label: "Relance occasionnelle, mais sans suivi précis", points: 3 },
          { label: "Aucune relance après un premier contact", points: 0 }
        ]
      },
      {
        question: "Collectez-vous et exploitez-vous les avis clients ?",
        tooltip: "Les avis clients influencent fortement la crédibilité et l'attractivité d'un coworking.",
        type: "single",
        options: [
          { label: "Oui, nous les demandons activement et les utilisons dans notre communication", points: 10 },
          { label: "Oui, mais sans les exploiter pleinement", points: 5 },
          { label: "Non, mais nous envisageons de le faire", points: 2 },
          { label: "Non, aucun suivi des avis clients", points: 0 }
        ]
      }
    ]
  },
  activation: {
    title: "Activation - Transformer les visiteurs en membres",
    description: "Objectif : Évaluer la capacité d'un coworking à convertir les visiteurs en membres actifs en facilitant leur parcours d'entrée.",
    questions: [
      {
        question: "Que peut faire un visiteur lorsqu'il découvre votre espace ?",
        tooltip: "Plus un visiteur peut facilement découvrir l'espace, plus il a de chances de devenir membre.",
        type: "single",
        options: [
          { label: "Payer et réserver immédiatement", points: 10 },
          { label: "Essayer gratuitement pendant une période limitée", points: 7 },
          { label: "Demander une visite guidée", points: 5 },
          { label: "Visiter librement sans engagement", points: 0 }
        ]
      },
      {
        question: "Avez-vous un processus d'onboarding structuré pour les nouveaux membres ?",
        tooltip: "Un accueil bien organisé améliore l'expérience des nouveaux membres et leur engagement sur le long terme.",
        type: "single",
        options: [
          { label: "Oui, avec un parcours d'accueil clair", points: 10 },
          { label: "Oui, mais informel", points: 5 },
          { label: "Non, les membres doivent se débrouiller seuls", points: 0 }
        ]
      },
      {
        question: "Vos offres et tarifs sont-ils clairs pour les nouveaux membres ?",
        tooltip: "Une offre compréhensible facilite la prise de décision et améliore le taux de conversion.",
        type: "single",
        options: [
          { label: "Oui, tout est bien expliqué", points: 10 },
          { label: "Oui, mais certains aspects demandent des explications", points: 5 },
          { label: "Non, c'est souvent source de confusion", points: 0 }
        ]
      },
      {
        question: "Relancez-vous les prospects après une visite ou un essai ?",
        tooltip: "Un suivi des prospects après leur visite augmente considérablement les chances de conversion.",
        type: "single",
        options: [
          { label: "Oui, systématiquement", points: 10 },
          { label: "Oui, mais pas toujours", points: 5 },
          { label: "Non, jamais", points: 0 }
        ]
      },
      {
        question: "Mettez-vous en place des actions pour faciliter la prise de décision des prospects ?",
        tooltip: "Certaines initiatives permettent d'accélérer la conversion en réduisant les freins à l'engagement.",
        type: "single",
        options: [
          { label: "Oui, avec des offres limitées ou des incitations fortes (ex. réduction premier mois)", points: 10 },
          { label: "Oui, mais sans plan structuré", points: 5 },
          { label: "Non, nous laissons les prospects décider seuls", points: 0 }
        ]
      }
    ]
  },
  retention: {
    title: "Rétention : Fidéliser les membres sur le long terme",
    description: "La rétention évalue votre capacité à fidéliser vos membres sur le long terme.",
    questions: [
      {
        question: "Vos membres reviennent-ils régulièrement ?",
        tooltip: "La régularité de fréquentation est un indicateur clé de la satisfaction des membres.",
        type: "single",
        options: [
          { label: "Oui, la plupart d'entre eux", points: 10 },
          { label: "Oui, mais seulement une partie", points: 5 },
          { label: "Non, le turnover est élevé", points: 0 }
        ]
      },
      {
        question: "Organisez-vous des événements pour votre communauté ?",
        tooltip: "Les événements renforcent le sentiment d'appartenance et la fidélisation des membres.",
        type: "single",
        options: [
          { label: "Oui, régulièrement", points: 10 },
          { label: "Oui, mais occasionnellement", points: 5 },
          { label: "Non, jamais", points: 0 }
        ]
      },
      {
        question: "Recueillez-vous des retours de vos membres ?",
        tooltip: "La collecte régulière de feedback permet d'améliorer continuellement votre service.",
        type: "single",
        options: [
          { label: "Oui, via des enquêtes ou échanges directs", points: 10 },
          { label: "Oui, mais de manière informelle", points: 5 },
          { label: "Non, aucun retour structuré", points: 0 }
        ]
      }
    ]
  },
  revenus: {
    title: "Revenue : Optimiser la monétisation de votre coworking",
    description: "Cette section analyse votre capacité à monétiser votre espace et à générer des revenus durables.",
    questions: [
      {
        question: "Quelle est votre principale source de revenus ?",
        tooltip: "La diversification des sources de revenus renforce la stabilité financière de votre espace.",
        type: "multiple",
        options: [
          { label: "Abonnements mensuels", points: 7 },
          { label: "Pass journaliers / horaires", points: 5 },
          { label: "Locations de bureaux privés", points: 5 },
          { label: "Services annexes (café, impression, services pro, etc.)", points: 5 }
        ]
      },
      {
        question: "Proposez-vous des services complémentaires ?",
        tooltip: "Les services additionnels peuvent générer des revenus supplémentaires importants.",
        type: "single",
        options: [
          { label: "Oui, bien optimisés", points: 10 },
          { label: "Oui, mais sous-exploités", points: 5 },
          { label: "Non, aucun service complémentaire", points: 0 }
        ]
      }
    ]
  },
  recommandation: {
    title: "Referral : Transformer les membres en ambassadeurs",
    description: "Le referral évalue votre capacité à transformer vos membres en ambassadeurs de votre espace.",
    questions: [
      {
        question: "Encouragez-vous vos membres à laisser des avis en ligne ?",
        tooltip: "Les avis clients influencent la crédibilité de votre coworking.",
        type: "single",
        options: [
          { label: "Oui, avec des rappels et un suivi actif", points: 10 },
          { label: "Oui, mais sans suivi structuré", points: 5 },
          { label: "Non, aucun encouragement", points: 0 }
        ]
      },
      {
        question: "Avez-vous un programme de parrainage actif ?",
        tooltip: "Un programme de parrainage incite à la recommandation.",
        type: "single",
        options: [
          { label: "Oui, avec des avantages bien définis", points: 10 },
          { label: "Oui, mais peu exploité", points: 5 },
          { label: "Non, aucun programme", points: 0 }
        ]
      },
      {
        question: "Organisez-vous des événements favorisant le networking ?",
        tooltip: "Les événements renforcent le sentiment d'appartenance.",
        type: "single",
        options: [
          { label: "Oui, régulièrement", points: 10 },
          { label: "Oui, mais de manière occasionnelle", points: 5 },
          { label: "Non, jamais", points: 0 }
        ]
      },
      {
        question: "Offrez-vous des récompenses aux membres qui recommandent votre coworking ?",
        tooltip: "Un bon système de récompense motive le bouche-à-oreille.",
        type: "single",
        options: [
          { label: "Oui, avec des récompenses bien définies", points: 10 },
          { label: "Oui, mais peu mises en avant", points: 5 },
          { label: "Non, aucun système de récompense", points: 0 }
        ]
      },
      {
        question: "Comment mesurez-vous l'impact des recommandations de vos membres ?",
        tooltip: "Suivre les recommandations permet d'optimiser vos efforts marketing.",
        type: "single",
        options: [
          { label: "Nous suivons avec des indicateurs précis", points: 10 },
          { label: "Nous avons une idée approximative mais sans suivi détaillé", points: 5 },
          { label: "Nous ne mesurons pas l'impact des recommandations", points: 0 }
        ]
      }
    ]
  },
  resultats: {
    title: "Analyse des résultats",
    description: "Voici l'analyse détaillée de vos réponses pour chaque section du diagnostic.",
    questions: []
  }
};

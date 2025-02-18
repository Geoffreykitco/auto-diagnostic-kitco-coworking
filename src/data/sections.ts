export const sections = {
  informations: {
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
        type: "multiple",
        options: [
          { label: "Lundi - Vendredi (8h-18h)", points: 0 },
          { label: "Lundi - Vendredi (8h-22h)", points: 0 },
          { label: "Ouvert 24h/24, 7j/7", points: 0 },
          { label: "Fermé le week-end", points: 0 },
          { label: "Ouvert uniquement sur réservation", points: 0 }
        ]
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
  },
  acquisition: {
    title: "Acquisition - Attirer de nouveaux coworkers",
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
    title: "Rétention - Fidéliser ses membres sur le long terme",
    description: "Objectif : Évaluer la capacité d'un coworking à maintenir l'engagement de ses membres et limiter le churn.",
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
        question: "Proposez-vous des avantages ou un programme de fidélité pour vos membres ?",
        tooltip: "Un programme de fidélisation (tarifs préférentiels, accès prioritaire, avantages exclusifs) favorise l'engagement sur le long terme.",
        type: "single",
        options: [
          { label: "Oui, un programme structuré et actif", points: 10 },
          { label: "Oui, mais peu utilisé", points: 5 },
          { label: "Non, aucun programme de fidélité", points: 0 }
        ]
      },
      {
        question: "Organisez-vous des événements ou des activités pour votre communauté ?",
        tooltip: "Les événements permettent de créer un lien fort entre les membres et d'augmenter la fidélité.",
        type: "single",
        options: [
          { label: "Oui, régulièrement", points: 10 },
          { label: "Oui, mais occasionnellement", points: 5 },
          { label: "Non, jamais", points: 0 }
        ]
      },
      {
        question: "Recueillez-vous et exploitez-vous les retours de vos membres ?",
        tooltip: "Un coworking qui collecte et agit sur les feedbacks améliore son expérience utilisateur et réduit le taux de départ.",
        type: "single",
        options: [
          { label: "Oui, via des enquêtes ou échanges réguliers", points: 10 },
          { label: "Oui, mais sans exploitation systématique", points: 5 },
          { label: "Non, aucun retour structuré", points: 0 }
        ]
      },
      {
        question: "Mettez-vous en place des actions pour améliorer l'expérience et le bien-être des membres ?",
        tooltip: "Un cadre agréable et des services adaptés (aménagements, confort, services additionnels) favorisent la fidélisation.",
        type: "single",
        options: [
          { label: "Oui, nous optimisons en continu selon les besoins", points: 10 },
          { label: "Oui, mais de manière ponctuelle", points: 5 },
          { label: "Non, aucune action spécifique", points: 0 }
        ]
      }
    ]
  },
  revenus: {
    title: "Revenue - Optimiser la rentabilité de l'espace de coworking",
    description: "Objectif : Évaluer la capacité du coworking à diversifier ses sources de revenus, optimiser sa gestion commerciale et maximiser sa rentabilité.",
    questions: [
      {
        question: "Quelle est votre principale source de revenus ?",
        tooltip: "Un espace de coworking peut maximiser sa rentabilité en diversifiant ses sources de revenus.",
        type: "multiple",
        options: [
          { label: "Abonnements mensuels", points: 5 },
          { label: "Pass journaliers / horaires", points: 5 },
          { label: "Locations de bureaux privés", points: 5 },
          { label: "Services annexes (café, impression, services professionnels, etc.)", points: 5 },
          { label: "Organisation d'événements ou de formations", points: 5 },
          { label: "Aucun modèle économique clairement défini", points: 0 }
        ]
      },
      {
        question: "Suivez-vous la rentabilité de chaque offre proposée ?",
        tooltip: "Mesurer la rentabilité des différentes offres permet d'optimiser les marges et d'adapter la stratégie commerciale.",
        type: "single",
        options: [
          { label: "Oui, nous suivons précisément la rentabilité de chaque service", points: 10 },
          { label: "Oui, mais de façon approximative", points: 5 },
          { label: "Non, nous ne faisons pas d'analyse spécifique", points: 0 }
        ]
      },
      {
        question: "Utilisez-vous un CRM ou un outil pour gérer les ventes et abonnements ?",
        tooltip: "Un CRM ou logiciel de gestion commerciale permet d'optimiser le suivi des membres, les relances et la gestion des abonnements.",
        type: "single",
        options: [
          { label: "Oui, avec un outil structuré et bien utilisé", points: 10 },
          { label: "Oui, mais il est sous-exploité", points: 5 },
          { label: "Non, nous gérons tout manuellement", points: 0 }
        ]
      },
      {
        question: "Mettez-vous en place des actions pour optimiser le taux de conversion des prospects en clients ?",
        tooltip: "Une bonne gestion commerciale permet de maximiser le taux de conversion et d'augmenter le chiffre d'affaires.",
        type: "single",
        options: [
          { label: "Oui, avec des actions bien définies (offres spéciales, suivi des leads, relances automatisées)", points: 10 },
          { label: "Oui, mais sans process structuré", points: 5 },
          { label: "Non, nous laissons les prospects décider seuls", points: 0 }
        ]
      },
      {
        question: "Cherchez-vous à développer de nouvelles sources de revenus ?",
        tooltip: "La diversification des revenus permet d'assurer la stabilité financière et de limiter la dépendance à un seul modèle.",
        type: "single",
        options: [
          { label: "Oui, nous testons régulièrement de nouvelles offres", points: 10 },
          { label: "Oui, mais sans véritable plan structuré", points: 5 },
          { label: "Non, nous restons sur notre modèle actuel", points: 0 }
        ]
      }
    ]
  },
  recommandation: {
    title: "Recommandation - Transformer ses membres en ambassadeurs",
    description: "Objectif : Évaluer la capacité d'un coworking à générer des recommandations naturelles, que ce soit via le bouche-à-oreille, un programme de parrainage ou la mise en avant des avis clients.",
    questions: [
      {
        question: "Vos membres recommandent-ils spontanément votre espace ?",
        tooltip: "Le bouche-à-oreille est un indicateur clé de satisfaction et de fidélisation.",
        type: "single",
        options: [
          { label: "Oui, souvent", points: 10 },
          { label: "Oui, parfois", points: 5 },
          { label: "Non, rarement", points: 0 }
        ]
      },
      {
        question: "Avez-vous mis en place un programme de parrainage ou de fidélité ?",
        tooltip: "Un programme structuré incite les membres à recommander activement l'espace à leur entourage.",
        type: "single",
        options: [
          { label: "Oui, et il est actif", points: 10 },
          { label: "Oui, mais il est peu utilisé", points: 5 },
          { label: "Non, aucun programme de parrainage", points: 0 }
        ]
      },
      {
        question: "Utilisez-vous les avis clients pour renforcer votre crédibilité ?",
        tooltip: "Les avis en ligne (Google, Trustpilot, etc.) influencent fortement les prospects.",
        type: "single",
        options: [
          { label: "Oui, nous les collectons et les mettons en avant", points: 10 },
          { label: "Oui, mais sans les exploiter pleinement", points: 5 },
          { label: "Non, nous ne faisons pas de suivi des avis", points: 0 }
        ]
      },
      {
        question: "Vos membres participent-ils activement à la communication et promotion de votre espace ?",
        tooltip: "Une communauté engagée partage naturellement son expérience et attire de nouveaux membres.",
        type: "single",
        options: [
          { label: "Oui, ils partagent régulièrement sur les réseaux sociaux et via le bouche-à-oreille", points: 10 },
          { label: "Oui, mais seulement une minorité le fait", points: 5 },
          { label: "Non, nous n'avons pas de communauté active sur ce point", points: 0 }
        ]
      },
      {
        question: "Incitez-vous vos membres à créer du contenu ou à partager leur expérience ?",
        tooltip: "Le contenu généré par les membres (témoignages, publications, vidéos) augmente la visibilité du coworking.",
        type: "single",
        options: [
          { label: "Oui, avec des incitations claires (réductions, événements VIP, mise en avant)", points: 10 },
          { label: "Oui, mais sans cadre précis", points: 5 },
          { label: "Non, nous n'avons pas d'actions spécifiques pour encourager cela", points: 0 }
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

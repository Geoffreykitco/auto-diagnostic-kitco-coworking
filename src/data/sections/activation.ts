
export const activationSection = {
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
};

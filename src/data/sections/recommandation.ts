
export const recommandationSection = {
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
};


import { Question } from "@/components/diagnostic/question/types";

export const revenusSection = {
  title: "Revenus - Générer et optimiser les revenus",
  description: "Cette section évalue votre capacité à générer et optimiser vos revenus.",
  questions: [
    {
      question: "Quel est votre taux d'occupation moyen ?",
      tooltip: "Le pourcentage moyen d'occupation de votre espace sur les derniers mois.",
      type: "text" as const,
      options: []
    },
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
    }
  ]
} as const;

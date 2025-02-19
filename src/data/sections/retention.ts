import { Question } from "@/components/diagnostic/question/types";

export const retentionSection = {
  title: "Rétention - Fidéliser vos membres",
  description: "Cette section évalue votre capacité à maintenir vos membres engagés et satisfaits sur le long terme.",
  questions: [
    {
      question: "Quelle est la durée moyenne d'abonnement de vos membres ?",
      tooltip: "La durée moyenne pendant laquelle les membres restent abonnés à votre espace.",
      type: "single" as const,
      options: [
        { label: "Moins de 3 mois", points: 0 },
        { label: "3 à 6 mois", points: 1 },
        { label: "6 mois à 1 an", points: 2 },
        { label: "Plus d'1 an", points: 3 }
      ]
    },
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
} as const;

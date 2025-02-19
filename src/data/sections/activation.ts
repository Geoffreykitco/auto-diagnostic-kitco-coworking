import { Question } from "@/components/diagnostic/question/types";

export const activationSection = {
  title: "Activation - Transformer les visiteurs en membres",
  description: "Cette section évalue votre capacité à convertir les visiteurs intéressés en membres actifs de votre espace.",
  questions: [
    {
      question: "Quel est votre taux de remplissage actuel ?",
      tooltip: "Le pourcentage d'occupation de votre espace par rapport à sa capacité totale.",
      type: "text" as const,
      options: []
    },
    {
      question: "Mettez-vous en place un système d'onboarding pour les nouveaux membres (visite des locaux, présentation des équipes, etc.) ?",
      tooltip: "Un processus structuré pour accueillir et intégrer les nouveaux membres dans votre espace.",
      type: "single" as const,
      options: [
        { label: "Non", points: 0 },
        { label: "Oui, partiellement", points: 1 },
        { label: "Oui, complètement", points: 2 }
      ]
    },
    {
      question: "Organisez-vous des événements ou ateliers pour encourager l'interaction entre les membres ?",
      tooltip: "Des activités régulières pour favoriser le réseautage et la collaboration entre les membres.",
      type: "single" as const,
      options: [
        { label: "Jamais", points: 0 },
        { label: "Occasionnellement", points: 1 },
        { label: "Régulièrement", points: 2 }
      ]
    },
    {
      question: "Proposez-vous des services ou des ressources pour aider les membres à développer leurs projets ?",
      tooltip: "Un soutien concret pour aider les membres à atteindre leurs objectifs professionnels.",
      type: "single" as const,
      options: [
        { label: "Non", points: 0 },
        { label: "Quelques services de base", points: 1 },
        { label: "Un large éventail de services et de ressources", points: 2 }
      ]
    }
  ]
} as const;

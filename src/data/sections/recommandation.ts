
import { Question } from "@/components/diagnostic/question/types";

export const recommandationSection = {
  title: "Recommandation - Développer le bouche à oreille",
  description: "Cette section évalue votre capacité à générer des recommandations et à développer votre communauté.",
  questions: [
    {
      question: "Les membres recommandent-ils spontanément votre espace ?",
      tooltip: "Le bouche-à-oreille est un indicateur clé de satisfaction et de fidélisation.",
      type: "single",
      options: [
        { label: "Oui, souvent", points: 10 },
        { label: "Oui, parfois", points: 5 },
        { label: "Non, rarement", points: 0 }
      ]
    },
    {
      question: "Avez-vous un programme de parrainage ?",
      tooltip: "Un programme structuré incite les membres à recommander activement l'espace à leur entourage.",
      type: "single",
      options: [
        { label: "Oui, et il est actif", points: 10 },
        { label: "Oui, mais il est peu utilisé", points: 5 },
        { label: "Non, aucun programme", points: 0 }
      ]
    },
    {
      question: "Utilisez-vous les avis clients ?",
      tooltip: "Les avis en ligne (Google, Trustpilot, etc.) influencent fortement les prospects.",
      type: "single",
      options: [
        { label: "Oui, nous les collectons", points: 10 },
        { label: "Oui, mais sans les exploiter", points: 5 },
        { label: "Non, nous ne faisons pas", points: 0 }
      ]
    },
    {
      question: "Vos membres participent-ils à la communication ?",
      tooltip: "Une communauté engagée partage naturellement son expérience et attire de nouveaux membres.",
      type: "single",
      options: [
        { label: "Oui, ils partagent régulièrement", points: 10 },
        { label: "Oui, mais seulement une minorité", points: 5 },
        { label: "Non, nous n'avons pas de communauté", points: 0 }
      ]
    },
    {
      question: "Incitez-vous la création de contenu ?",
      tooltip: "Le contenu généré par les membres (témoignages, publications, vidéos) augmente la visibilité du coworking.",
      type: "single",
      options: [
        { label: "Oui, avec des incitations", points: 10 },
        { label: "Oui, mais sans cadre précis", points: 5 },
        { label: "Non, nous n'avons pas d'actions", points: 0 }
      ]
    }
  ]
} as const;


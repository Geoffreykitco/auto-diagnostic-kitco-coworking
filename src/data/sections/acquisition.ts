
import { Question } from "@/components/diagnostic/question/types";

export const acquisitionSection = {
  title: "Acquisition - Attirer les coworkers",
  description: "Cette section évalue votre capacité à attirer de nouveaux membres potentiels et à générer des visites de votre espace.",
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
      type: "single" as const,
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
} as const;

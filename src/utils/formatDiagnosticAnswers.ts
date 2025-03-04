
import { sections } from '@/data/sections';

// Mapping des indices de questions vers les noms de champs pour chaque section
const FIELD_MAPPINGS = {
  informations: {
    0: 'info_anciennete',
    1: 'info_type_bureaux',
    2: 'info_type_abonnements',
    3: 'info_statut',
    4: 'info_superficie',
    5: 'info_concurrence',
    6: 'info_capacite',
    7: 'info_ville',
    8: 'info_horaires',
    9: 'info_remplissage',
    10: 'info_type_clientele',
    11: 'info_services'
  },
  acquisition: {
    0: 'acq_canaux_utilises',
    1: 'acq_frequence_actions',
    2: 'acq_offre_decouverte',
    3: 'acq_suivi_prospects',
    4: 'acq_avis_clients'
  },
  activation: {
    0: 'act_decouverte_espace',
    1: 'act_processus_onboarding',
    2: 'act_clartes_offres',
    3: 'act_relance_prospects',
    4: 'act_action_decision'
  },
  retention: {
    0: 'ret_frequentation_reguliere',
    1: 'ret_programme_fidelite',
    2: 'ret_organisation_evenements',
    3: 'ret_retours_membres',
    4: 'ret_amelioration_experience'
  },
  revenus: {
    0: 'rev_source_revenus',
    1: 'rev_rentabilite_offres',
    2: 'rev_utilisation_crm',
    3: 'rev_optimisation_conversion',
    4: 'rev_nouvelles_sources'
  },
  recommandation: {
    0: 'rec_recommandation_spontanee',
    1: 'rec_programme_parrainage',
    2: 'rec_utilisation_avis',
    3: 'rec_participation_communication',
    4: 'rec_creation_contenu'
  }
} as const;

// Liste des champs qui doivent avoir le format avec point-virgule sans espace
const MULTIPLE_CHOICE_FIELDS = [
  'info_type_bureaux',
  'info_type_abonnements',
  'info_type_clientele',
  'info_services',
  'acq_canaux_utilises',
  'rev_source_revenus'
];

export const formatAnswersForSubmission = (answers: Record<string, Record<number, { value: string | number | number[] | null; score: number }>>) => {
  const formattedAnswers: Record<string, any> = {};

  // Formatage des réponses par section
  Object.entries(answers).forEach(([sectionKey, sectionAnswers]) => {
    if (sectionKey in FIELD_MAPPINGS) {
      const section = sections[sectionKey as keyof typeof sections];
      
      Object.entries(sectionAnswers).forEach(([questionIndex, answer]) => {
        const fieldName = FIELD_MAPPINGS[sectionKey as keyof typeof FIELD_MAPPINGS][Number(questionIndex)];
        if (fieldName) {
          let formattedValue: string;
          
          if (section.questions[Number(questionIndex)].type === 'text') {
            // Pour les questions de type texte, on garde la valeur telle quelle
            formattedValue = answer.value?.toString() || '';
          } else if (Array.isArray(answer.value)) {
            // Pour les questions à choix multiples
            const labels = answer.value
              .map(index => section.questions[Number(questionIndex)].options[index]?.label)
              .filter(Boolean);
            
            // Appliquer le format avec point-virgule sans espace pour les champs spécifiques
            if (MULTIPLE_CHOICE_FIELDS.includes(fieldName)) {
              formattedValue = labels.join(';');
            } else {
              formattedValue = labels.join(', ');
            }
          } else if (typeof answer.value === 'number') {
            // Pour les questions à choix unique
            formattedValue = section.questions[Number(questionIndex)].options[answer.value]?.label || '';
          } else {
            formattedValue = '';
          }
          
          formattedAnswers[fieldName] = formattedValue;
        }
      });
    }
  });

  return formattedAnswers;
};


type Answer = {
  value: string | number | number[] | null;
  score: number;
};

type SectionAnswers = Record<number, Answer>;
type AllAnswers = Record<string, SectionAnswers>;

export const formatAnswersForSubmission = (answers: AllAnswers) => {
  const formattedAnswers: Record<string, any> = {};

  Object.entries(answers).forEach(([section, sectionAnswers]) => {
    // Logs plus détaillés pour chaque section
    console.log(`Traitement de la section ${section}`);
    console.log(`Contenu complet de la section:`, JSON.stringify(sectionAnswers, null, 2));

    if (section === 'informations') {
      // Logs détaillés pour chaque champ de la section informations
      Object.entries(sectionAnswers).forEach(([key, value]) => {
        console.log(`Champ ${key}:`, {
          valeur: value.value,
          type: typeof value.value,
          estTableau: Array.isArray(value.value)
        });
      });
    }

    if (section === 'recommandation') {
      formattedAnswers.rec_recommandation_spontanee = sectionAnswers[0]?.value;
      formattedAnswers.rec_programme_parrainage = sectionAnswers[1]?.value;
      formattedAnswers.rec_utilisation_avis = sectionAnswers[2]?.value;
      formattedAnswers.rec_participation_communication = sectionAnswers[3]?.value;
      formattedAnswers.rec_creation_contenu = sectionAnswers[4]?.value;
    } 
    else if (section === 'acquisition') {
      formattedAnswers.acq_canaux_utilises = Array.isArray(sectionAnswers[0]?.value) 
        ? sectionAnswers[0].value 
        : [];
        
      formattedAnswers.acq_frequence_actions = sectionAnswers[1]?.value;
      formattedAnswers.acq_offre_decouverte = sectionAnswers[2]?.value;
      formattedAnswers.acq_suivi_prospects = sectionAnswers[3]?.value;
      formattedAnswers.acq_avis_clients = sectionAnswers[4]?.value;
    }
    else if (section === 'activation') {
      formattedAnswers.act_decouverte_espace = sectionAnswers[0]?.value;
      formattedAnswers.act_processus_onboarding = sectionAnswers[1]?.value;
      formattedAnswers.act_clartes_offres = sectionAnswers[2]?.value;
      formattedAnswers.act_relance_prospects = sectionAnswers[3]?.value;
      formattedAnswers.act_action_decision = sectionAnswers[4]?.value;
    }
    else if (section === 'retention') {
      formattedAnswers.ret_frequentation_reguliere = sectionAnswers[0]?.value;
      formattedAnswers.ret_programme_fidelite = sectionAnswers[1]?.value;
      formattedAnswers.ret_organisation_evenements = sectionAnswers[2]?.value;
      formattedAnswers.ret_retours_membres = sectionAnswers[3]?.value;
      formattedAnswers.ret_amelioration_experience = sectionAnswers[4]?.value;
    }
    else if (section === 'revenus') {
      formattedAnswers.rev_source_revenus = Array.isArray(sectionAnswers[0]?.value) 
        ? sectionAnswers[0].value 
        : [];

      formattedAnswers.rev_rentabilite_offres = sectionAnswers[1]?.value;
      formattedAnswers.rev_utilisation_crm = sectionAnswers[2]?.value;
      formattedAnswers.rev_optimisation_conversion = sectionAnswers[3]?.value;
      formattedAnswers.rev_nouvelles_sources = sectionAnswers[4]?.value;
    }
    else if (section === 'informations') {
      console.log('Traitement détaillé de la section informations:');
      
      formattedAnswers.info_anciennete = sectionAnswers[0]?.value;
      
      // Log pour chaque champ à choix multiple
      ['info_type_bureaux', 'info_type_abonnement', 'info_statut', 'info_type_clientele', 'info_services'].forEach((field, index) => {
        const mappingIndex = [1, 2, 3, 10, 11][index];
        const value = sectionAnswers[mappingIndex]?.value;
        console.log(`Traitement de ${field}:`, {
          valeurBrute: value,
          estTableau: Array.isArray(value)
        });
      });

      formattedAnswers.info_type_bureaux = Array.isArray(sectionAnswers[1]?.value)
        ? sectionAnswers[1].value
        : [];
      formattedAnswers.info_type_abonnement = Array.isArray(sectionAnswers[2]?.value)
        ? sectionAnswers[2].value
        : [];
      formattedAnswers.info_statut = Array.isArray(sectionAnswers[3]?.value)
        ? sectionAnswers[3].value
        : [];
      formattedAnswers.info_superficie = sectionAnswers[4]?.value;
      formattedAnswers.info_concurrence = sectionAnswers[5]?.value;
      formattedAnswers.info_capacite = sectionAnswers[6]?.value;
      formattedAnswers.info_ville = sectionAnswers[7]?.value;
      formattedAnswers.info_horaires = sectionAnswers[8]?.value;
      formattedAnswers.info_remplissage = sectionAnswers[9]?.value;
      formattedAnswers.info_type_clientele = Array.isArray(sectionAnswers[10]?.value)
        ? sectionAnswers[10].value
        : [];
      formattedAnswers.info_services = Array.isArray(sectionAnswers[11]?.value)
        ? sectionAnswers[11].value
        : [];
    }
  });

  // Log final des données formatées
  console.log('Données formatées finales:', JSON.stringify(formattedAnswers, null, 2));
  return formattedAnswers;
};


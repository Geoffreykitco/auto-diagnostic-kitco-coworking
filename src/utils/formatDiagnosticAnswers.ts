
type Answer = {
  value: string | number | number[] | null;
  score: number;
};

type SectionAnswers = Record<number, Answer>;
type AllAnswers = Record<string, SectionAnswers>;

export const formatAnswersForSubmission = (answers: AllAnswers) => {
  const formattedAnswers: Record<string, any> = {};

  Object.entries(answers).forEach(([section, sectionAnswers]) => {
    // Ajout de logs pour debugger
    if (section === 'acquisition' || section === 'revenus') {
      console.log(`Section ${section}:`, sectionAnswers);
      console.log(`Type de valeur pour ${section}[0]:`, typeof sectionAnswers[0]?.value);
      console.log(`Valeur brute pour ${section}[0]:`, sectionAnswers[0]?.value);
    }

    if (section === 'recommandation') {
      formattedAnswers.rec_recommandation_spontanee = sectionAnswers[0]?.value;
      formattedAnswers.rec_programme_parrainage = sectionAnswers[1]?.value;
      formattedAnswers.rec_utilisation_avis = sectionAnswers[2]?.value;
      formattedAnswers.rec_participation_communication = sectionAnswers[3]?.value;
      formattedAnswers.rec_creation_contenu = sectionAnswers[4]?.value;
    } 
    else if (section === 'acquisition') {
      // Forçons la conversion en tableau et assurons-nous que null est géré
      const canaux = sectionAnswers[0]?.value;
      formattedAnswers.acq_canaux_utilises = 
        Array.isArray(canaux) ? canaux :
        canaux === null ? [] :
        typeof canaux === 'number' ? [canaux] : 
        [];
        
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
      // Forçons la conversion en tableau et assurons-nous que null est géré
      const sources = sectionAnswers[0]?.value;
      formattedAnswers.rev_source_revenus = 
        Array.isArray(sources) ? sources :
        sources === null ? [] :
        typeof sources === 'number' ? [sources] : 
        [];

      formattedAnswers.rev_rentabilite_offres = sectionAnswers[1]?.value;
      formattedAnswers.rev_utilisation_crm = sectionAnswers[2]?.value;
      formattedAnswers.rev_optimisation_conversion = sectionAnswers[3]?.value;
      formattedAnswers.rev_nouvelles_sources = sectionAnswers[4]?.value;
    }
    else if (section === 'informations') {
      formattedAnswers.info_anciennete = sectionAnswers[0]?.value;
      formattedAnswers.info_type_bureaux = sectionAnswers[1]?.value;
      formattedAnswers.info_type_abonnement = sectionAnswers[2]?.value;
      formattedAnswers.info_statut = sectionAnswers[3]?.value;
      formattedAnswers.info_superficie = sectionAnswers[4]?.value;
      formattedAnswers.info_concurrence = sectionAnswers[5]?.value;
      formattedAnswers.info_capacite = sectionAnswers[6]?.value;
      formattedAnswers.info_ville = sectionAnswers[7]?.value;
      formattedAnswers.info_horaires = sectionAnswers[8]?.value;
      formattedAnswers.info_remplissage = sectionAnswers[9]?.value;
      formattedAnswers.info_type_clientele = sectionAnswers[10]?.value;
      formattedAnswers.info_services = sectionAnswers[11]?.value;
    }
  });

  // Log final pour voir exactement ce qui est envoyé
  console.log('Données formatées finales:', JSON.stringify(formattedAnswers, null, 2));
  return formattedAnswers;
};


import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useSupabaseSubscription = () => {
  const { toast } = useToast();

  useEffect(() => {
    const channel = supabase
      .channel('db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'leads_auto_diag_coworking'
        },
        async (payload) => {
          console.log('Nouvelle ligne détectée dans Supabase:', payload);
          
          try {
            const { error: baserowError } = await supabase.functions.invoke('save-to-baserow', {
              body: payload.new
            });

            if (baserowError) {
              console.error('Erreur lors de la synchronisation vers Baserow:', baserowError);
              toast({
                title: "Erreur de synchronisation",
                description: "Les données n'ont pas pu être synchronisées avec Baserow",
                variant: "destructive",
              });
            } else {
              console.log('Données synchronisées avec succès vers Baserow');
            }
          } catch (error) {
            console.error('Erreur lors de la synchronisation:', error);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);
};

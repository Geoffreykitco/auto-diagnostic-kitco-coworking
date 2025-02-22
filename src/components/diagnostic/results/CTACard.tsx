
import { motion } from "framer-motion";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuditForm } from "@/hooks/use-audit-form";

interface CTACardProps {
  globalScore: number;
}

export const CTACard = ({
  globalScore
}: CTACardProps) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (formData: {
    firstName: string;
    lastName: string;
    coworkingName: string;
    email: string;
  }) => {
    try {
      const diagnosticData = {
        created_at: new Date().toISOString(),
        first_name: formData.firstName,
        last_name: formData.lastName,
        coworking_name: formData.coworkingName,
        email: formData.email,
        global_score: globalScore
      };

      const response = await fetch('https://api.baserow.io/api/database/rows/table/451692/', {
        method: 'POST',
        headers: {
          'Authorization': 'Token 185511',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(diagnosticData)
      });

      if (!response.ok) {
        throw new Error('Failed to save form results');
      }

      setOpen(false);
    } catch (error) {
      console.error('Error saving form results:', error);
    }
  };

  const {
    fullName,
    setFullName,
    coworkingName,
    setCoworkingName,
    email,
    setEmail,
    isSubmitting,
    handleSubmit: handleFormSubmit
  } = useAuditForm({
    onSubmit: handleSubmit
  });

  const Content = () => (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="text-center space-y-2">
        <h2 className="font-semibold text-gray-900 text-xl">
          {isMobile ? "Augmentez le taux de remplissage de votre coworking" : "Envie d'augmenter le taux de remplissage de votre coworking ?"}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto md:text-base text-sm">
          Vous avez maintenant une vision claire de la performance de votre espace de coworking.
        </p>

        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="mt-2 bg-[#0B1A17] text-white px-6 py-2.5 rounded-lg text-sm md:text-base hover:bg-[#132721] hover:scale-[1.02] transform transition-colors duration-200">
                Recevoir mon audit et mon plan d'action
              </button>
            </DialogTrigger>
            <DialogContent className="p-6 bg-white overflow-hidden rounded-2xl max-w-xl">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[#0B1A17] mb-2">Augmentez le taux de remplissage de votre espace de coworking</h3>
                <p className="text-gray-600">Ne laissez pas des opportunités de développement inexplorées. Passez à l'action dès maintenant.</p>
              </div>

              <form onSubmit={e => handleFormSubmit(e)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prénom et nom
                  </label>
                  <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Pour faire connaissance :)" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B1A17] focus:border-transparent" required />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom du coworking
                  </label>
                  <input type="text" value={coworkingName} onChange={e => setCoworkingName(e.target.value)} placeholder="Pour en savoir plus sur votre espace" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B1A17] focus:border-transparent" required />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Pour vous envoyer le rapport" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B1A17] focus:border-transparent" required />
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-[#0B1A17] text-white py-3 rounded-lg font-medium hover:bg-[#132721] transition-colors disabled:opacity-50 mt-4">
                  {isSubmitting ? "Envoi en cours..." : "Finaliser"}
                </button>

                <p className="text-xs text-center text-gray-500 mt-4">
                  En soumettant ce formulaire, vous acceptez que nous utilisions vos données pour vous contacter au sujet de votre diagnostic.
                </p>
              </form>
            </DialogContent>
          </Dialog>

          <p className="font-medium mt-1 text-gray-500 text-xs">
            Nous garantissons la confidentialité de vos données.
          </p>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className="bg-white">
        <Content />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white"
    >
      <Content />
    </motion.div>
  );
};

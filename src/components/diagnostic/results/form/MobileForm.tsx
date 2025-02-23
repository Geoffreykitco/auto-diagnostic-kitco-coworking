import { FormEventHandler } from "react";
interface MobileFormProps {
  fullName: string;
  setFullName: (value: string) => void;
  coworkingName: string;
  setCoworkingName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  isSubmitting: boolean;
  handleFormSubmit: FormEventHandler<HTMLFormElement>;
}
export const MobileForm = ({
  fullName,
  setFullName,
  coworkingName,
  setCoworkingName,
  email,
  setEmail,
  isSubmitting,
  handleFormSubmit
}: MobileFormProps) => {
  return <div className="min-h-[100dvh] flex flex-col bg-gray-50">
      <div className="flex-1 px-6 py-8">
        <div className="mb-8">
          <h3 className="font-semibold text-[#0B1A17] leading-snug text-xl">
            Augmentez le taux de remplissage de votre espace de coworking
          </h3>
          <p className="text-gray-600 mt-3 text-sm">
            Ne laissez pas des opportunités de développement inexplorées. Passez à l'action dès maintenant.
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prénom et nom
            </label>
            <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Pour faire connaissance :)" className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B1A17] focus:border-transparent transition-all text-base bg-white shadow-sm" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom du coworking
            </label>
            <input type="text" value={coworkingName} onChange={e => setCoworkingName(e.target.value)} placeholder="Pour en savoir plus sur votre espace" className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B1A17] focus:border-transparent transition-all text-base bg-white shadow-sm" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Pour vous envoyer le rapport" className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B1A17] focus:border-transparent transition-all text-base bg-white shadow-sm" required />
          </div>
        </form>
      </div>

      <div className="px-6 py-6 bg-white border-t border-gray-200">
        <button type="submit" form="mobile-form" disabled={isSubmitting} className="w-full bg-[#0B1A17] text-white py-4 rounded-xl font-medium hover:bg-[#132721] active:transform active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-base">
          {isSubmitting ? "Envoi en cours..." : "Finaliser"}
        </button>

        <p className="text-center text-gray-600 mt-4 px-2 leading-relaxed text-xs">
          En soumettant ce formulaire, vous acceptez que nous utilisions vos données pour vous contacter au sujet de votre diagnostic.
        </p>
      </div>
    </div>;
};
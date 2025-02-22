
import { FormEventHandler } from "react";

interface DesktopFormProps {
  fullName: string;
  setFullName: (value: string) => void;
  coworkingName: string;
  setCoworkingName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  isSubmitting: boolean;
  handleFormSubmit: FormEventHandler<HTMLFormElement>;
}

export const DesktopForm = ({
  fullName,
  setFullName,
  coworkingName,
  setCoworkingName,
  email,
  setEmail,
  isSubmitting,
  handleFormSubmit
}: DesktopFormProps) => {
  return (
    <div className="flex">
      <div className="w-1/2 h-[600px]">
        <img
          src="/lovable-uploads/442250e4-5e03-4d0c-b99b-16747479b95f.png"
          alt="Collaboration dans un espace de coworking"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-1/2 p-8">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-[#0B1A17] mb-2">
            Augmentez le taux de remplissage de votre espace de coworking
          </h3>
          <p className="text-gray-600">
            Ne laissez pas des opportunités de développement inexplorées. Passez à l'action dès maintenant.
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prénom et nom
            </label>
            <input
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="Pour faire connaissance :)"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B1A17] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom du coworking
            </label>
            <input
              type="text"
              value={coworkingName}
              onChange={e => setCoworkingName(e.target.value)}
              placeholder="Pour en savoir plus sur votre espace"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B1A17] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Pour vous envoyer le rapport"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B1A17] focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0B1A17] text-white py-3 rounded-lg font-medium hover:bg-[#132721] transition-colors disabled:opacity-50 mt-4"
          >
            {isSubmitting ? "Envoi en cours..." : "Finaliser"}
          </button>

          <p className="text-xs text-center text-gray-500 mt-4">
            En soumettant ce formulaire, vous acceptez que nous utilisions vos données pour vous contacter au sujet de votre diagnostic.
          </p>
        </form>
      </div>
    </div>
  );
};

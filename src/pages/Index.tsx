import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { motion } from 'framer-motion';

const Index = () => {
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);
  const [currentSection, setCurrentSection] = useState('acquisition');
  const { toast } = useToast();

  const sections = {
    acquisition: {
      title: "Acquisition",
      questions: [
        {
          question: "Est-ce que vous faites du marketing actif pour votre espace de coworking ?",
          tooltip: "À quelle fréquence faites-vous la promotion de votre espace auprès des membres potentiels ?",
          options: [
            { label: "Oui, régulièrement", points: 10 },
            { label: "Oui, occasionnellement", points: 5 },
            { label: "Non, aucun effort marketing", points: 0 }
          ]
        },
        {
          question: "Quelle présence en ligne avez-vous ?",
          tooltip: "Quelles plateformes digitales utilisez-vous pour présenter votre espace ?",
          options: [
            { label: "Site web", points: 5 },
            { label: "Réseaux sociaux", points: 5 },
            { label: "Google Maps et annuaires locaux", points: 5 },
            { label: "Aucune", points: 0 }
          ]
        },
        {
          question: "Proposez-vous une offre spéciale pour les nouveaux membres ?",
          tooltip: "Avez-vous des promotions pour encourager les essais ?",
          options: [
            { label: "Oui, essai gratuit ou réduction", points: 10 },
            { label: "Oui, mais peu promu", points: 5 },
            { label: "Non, pas d'offres spéciales", points: 0 }
          ]
        },
        {
          question: "Comment communiquez-vous avec les clients potentiels ?",
          tooltip: "Quels canaux utilisez-vous pour interagir avec les prospects ?",
          options: [
            { label: "Newsletter ou campagnes email", points: 5 },
            { label: "Engagement sur les réseaux sociaux", points: 5 },
            { label: "Bouche à oreille et événements networking", points: 5 },
            { label: "Pas de communication régulière", points: 0 }
          ]
        },
        {
          question: "À quelle fréquence publiez-vous sur les réseaux sociaux ?",
          tooltip: "À quelle fréquence partagez-vous du contenu sur votre espace de coworking ?",
          options: [
            { label: "Tous les jours", points: 10 },
            { label: "Plusieurs fois par semaine", points: 7 },
            { label: "Une fois par semaine", points: 5 },
            { label: "Rarement ou jamais", points: 0 }
          ]
        }
      ]
    },
    activation: {
      title: "Activation",
      questions: [
        {
          question: "Quel est votre processus d'accueil des nouveaux membres ?",
          tooltip: "Comment intégrez-vous les nouveaux arrivants ?",
          options: [
            { label: "Programme d'intégration complet", points: 10 },
            { label: "Briefing simple", points: 5 },
            { label: "Pas de processus formel", points: 0 }
          ]
        },
        {
          question: "Proposez-vous des événements communautaires ?",
          tooltip: "À quelle fréquence organisez-vous des événements pour vos membres ?",
          options: [
            { label: "Régulièrement (hebdomadaire/mensuel)", points: 10 },
            { label: "Occasionnellement", points: 5 },
            { label: "Rarement ou jamais", points: 0 }
          ]
        }
      ]
    },
    retention: {
      title: "Rétention",
      questions: [
        {
          question: "Quel est votre taux de rétention mensuel ?",
          tooltip: "Pourcentage de membres qui renouvellent leur abonnement",
          options: [
            { label: "Plus de 90%", points: 10 },
            { label: "Entre 70% et 90%", points: 5 },
            { label: "Moins de 70%", points: 0 }
          ]
        },
        {
          question: "Avez-vous un programme de fidélité ?",
          tooltip: "Offrez-vous des avantages aux membres de longue durée ?",
          options: [
            { label: "Oui, avec plusieurs avantages", points: 10 },
            { label: "Oui, basique", points: 5 },
            { label: "Non", points: 0 }
          ]
        }
      ]
    },
    revenus: {
      title: "Revenus",
      questions: [
        {
          question: "Proposez-vous différentes formules d'abonnement ?",
          tooltip: "Variété des offres disponibles",
          options: [
            { label: "Plusieurs formules flexibles", points: 10 },
            { label: "2-3 formules standard", points: 5 },
            { label: "Une seule formule", points: 0 }
          ]
        },
        {
          question: "Avez-vous des services additionnels payants ?",
          tooltip: "Services générant des revenus supplémentaires",
          options: [
            { label: "Plusieurs services additionnels", points: 10 },
            { label: "Quelques services basiques", points: 5 },
            { label: "Aucun service additionnel", points: 0 }
          ]
        }
      ]
    },
    recommandation: {
      title: "Recommandation",
      questions: [
        {
          question: "Avez-vous un programme de parrainage ?",
          tooltip: "Encouragez-vous les membres à recommander votre espace ?",
          options: [
            { label: "Oui, avec récompenses", points: 10 },
            { label: "Oui, sans récompense", points: 5 },
            { label: "Non", points: 0 }
          ]
        },
        {
          question: "Mesurez-vous la satisfaction de vos membres ?",
          tooltip: "Collectez-vous les avis et retours d'expérience ?",
          options: [
            { label: "Oui, régulièrement", points: 10 },
            { label: "Oui, occasionnellement", points: 5 },
            { label: "Non", points: 0 }
          ]
        }
      ]
    }
  };

  const handleStart = () => {
    toast({
      title: "Bienvenue dans l'auto-diagnostic!",
      description: "Commençons l'évaluation de votre espace de coworking.",
    });
    setProgress(20);
    setStarted(true);
  };

  const handleOptionSelect = (questionIndex: number, points: number) => {
    setProgress(prev => Math.min(prev + 20, 100));
    toast({
      title: "Réponse enregistrée",
      description: "Passons à la question suivante.",
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-grow">
        {!started ? (
          <>
            {/* Hero Section */}
            <section className="hero-pattern py-20 px-4">
              <div className="container mx-auto max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center"
                >
                  <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                    Auto-diagnostic de votre espace de coworking
                  </h1>
                  <p className="text-lg text-gray-600 mb-8">
                    Évaluez l'efficacité de votre espace selon la méthodologie AARRR
                  </p>
                  <button
                    onClick={handleStart}
                    className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-md font-medium"
                  >
                    Commencer l'évaluation
                  </button>
                </motion.div>
              </div>
            </section>

            {/* How it works section */}
            <main className="container mx-auto max-w-4xl px-4 py-12">
              <div className="glass-morphism rounded-lg p-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-semibold text-primary mb-4">
                    Comment ça marche?
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      {
                        title: "Répondez aux questions",
                        description: "Une série de questions pour évaluer votre espace"
                      },
                      {
                        title: "Obtenez votre score",
                        description: "Recevez une évaluation détaillée de votre performance"
                      },
                      {
                        title: "Plan d'action",
                        description: "Des recommandations personnalisées pour progresser"
                      }
                    ].map((step, index) => (
                      <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </main>
          </>
        ) : (
          <div className="container mx-auto max-w-4xl px-4 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold text-primary mb-8">
                {sections[currentSection].title}
              </h2>
              {sections[currentSection].questions.map((q, questionIndex) => (
                <motion.div
                  key={questionIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: questionIndex * 0.2 }}
                  className="glass-morphism rounded-lg p-6 space-y-4"
                >
                  <div className="flex items-start gap-2">
                    <h3 className="text-xl font-semibold text-primary">{q.question}</h3>
                    <button 
                      className="text-gray-400 hover:text-primary"
                      title={q.tooltip}
                    >
                      (i)
                    </button>
                  </div>
                  <div className="space-y-3">
                    {q.options.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        onClick={() => handleOptionSelect(questionIndex, option.points)}
                        className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all duration-200"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-auto py-8 px-4 border-t">
        <div className="container mx-auto max-w-4xl flex flex-col items-center justify-center">
          <img 
            src="/logo-kitco.png" 
            alt="KITCO - Des coworkings bien pensés" 
            className="h-24 mb-4"
          />
          <p className="text-gray-600 text-sm text-center">
            Des coworkings bien pensés
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

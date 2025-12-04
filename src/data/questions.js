export const questions = [
    {
        id: 6,
        text: "Ton établissement veut acheter 40 nouveaux PC. Que proposes-tu ?",
        category: "Durabilité",
        options: [
            { label: "Prendre les plus chers, ça fait sérieux.", score: 0 },
            { label: "Chercher du reconditionné pro.", score: 5 },
            { label: "Installer Linux sur le matériel existant.", score: 10 },
        ],
    },
    {
        id: 7,
        text: "Une appli te dit : 'Active la localisation pour continuer'. Tu fais quoi ?",
        category: "Responsable",
        options: [
            { label: "J’accepte, de toute façon ils savent déjà où j'habite.", score: 0 },
            { label: "Je mets 'uniquement quand l'app est active'.", score: 5 },
            { label: "Je supprime l'app, c’est louche.", score: 10 },
        ],
    },
    {
        id: 8,
        text: "Tu veux envoyer un gros fichier de cours. Tu utilises…",
        category: "Cloud UE",
        options: [
            { label: "WeTransfer (classique).", score: 0 },
            { label: "Un service européen type FileSender / SwissTransfer.", score: 5 },
            { label: "Le serveur local de l'établissement, autonome.", score: 10 },
        ],
    },
    {
        id: 9,
        text: "Ton ordi commence à ramer. Que fais-tu ?",
        category: "Obsolescence",
        options: [
            { label: "J’en achète un nouveau parce que 'c'est plus simple'.", score: 0 },
            { label: "J’ajoute de la RAM si possible.", score: 5 },
            { label: "Je passe sur une distro Linux légère.", score: 10 },
        ],
    },
    {
        id: 10,
        text: "Tu veux écrire un rapport. Tu ouvres…",
        category: "Libre",
        options: [
            { label: "Word, c’est reflexe.", score: 0 },
            { label: "LibreOffice (mais je le trouve moche).", score: 5 },
            { label: "Un éditeur libre + format ouvert (ODT/Markdown).", score: 10 },
        ],
    },
    {
        id: 11,
        text: "Tu dois installer un logiciel dans ton lycée.",
        category: "Responsable",
        options: [
            { label: "Un truc payant avec abonnement mensuel.", score: 0 },
            { label: "Une alternative gratuite mais pas libre.", score: 5 },
            { label: "Une solution open-source auto-hébergeable.", score: 10 },
        ],
    },
    {
        id: 12,
        text: "On te propose d'apprendre Linux. Ta réaction ?",
        category: "Linux",
        options: [
            { label: "C’est pour les hackers dans les films.", score: 0 },
            { label: "Ok, si quelqu’un me guide.", score: 5 },
            { label: "Je prends un ThinkPad et je deviens une machine.", score: 10 },
        ],
    },
    {
        id: 13,
        text: "Comment gères-tu tes mots de passe ?",
        category: "Sécurité",
        options: [
            { label: "Toujours le même (mais avec un point à la fin !)", score: 0 },
            { label: "Un papier sur mon bureau / Notes du téléphone.", score: 5 },
            { label: "Un gestionnaire libre (Bitwarden, KeePass).", score: 10 },
        ],
    },
    {
        id: 14,
        text: "Tu dois envoyer une vidéo à ta classe.",
        category: "Sobriété",
        options: [
            { label: "J’envoie un MP4 de 4 Go sur Discord.", score: 0 },
            { label: "Je compresse avant d’envoyer.", score: 5 },
            { label: "Je la publie sur une plateforme libre auto-hébergée.", score: 10 },
        ],
    },
    {
        id: 15,
        text: "Quand tu entends “Open Source”, tu penses…",
        category: "Libre",
        options: [
            { label: "Un truc chelou pas fiable.", score: 0 },
            { label: "Une bonne alternative selon les cas.", score: 5 },
            { label: "La base d’un numérique durable et souverain.", score: 10 },
        ],
    },
    {
        id: 16,
        text: "Le wifi rame dans ton lycée. Ta solution ?",
        category: "Autonomie",
        options: [
            { label: "Je change de borne si j’en trouve une meilleure.", score: 5 },
            { label: "Je propose un audit réseau collaboratif (club info).", score: 10 },
            { label: "Je peste contre l’admin réseau.", score: 0 },
        ],
    },
    {
        id: 17,
        text: "Tu dois faire une présentation. Tu choisis…",
        category: "Libre",
        options: [
            { label: "PowerPoint parce que c'est stylé.", score: 0 },
            { label: "Canva (mais bon…).", score: 5 },
            { label: "LibreOffice Impress ou un outil libre en ligne.", score: 10 },
        ],
    },
    {
        id: 18,
        text: "Pour partager un document collaboratif, tu utilises…",
        category: "Cloud UE",
        options: [
            { label: "Google Docs direct.", score: 0 },
            { label: "OnlyOffice cloud européen.", score: 5 },
            { label: "Un pad libre auto-hébergé (Etherpad, CryptPad).", score: 10 },
        ],
    },
    {
        id: 19,
        text: "Tu récupères un vieux PC de 2010.",
        category: "Réemploi",
        options: [
            { label: "Je le jette, soyons honnêtes.", score: 0 },
            { label: "Je tente un nettoyage et réinstallation Windows.", score: 5 },
            { label: "Je le transforme en machine Linux ultra légère.", score: 10 },
        ],
    },
    {
        id: 20,
        text: "Un ami t’envoie un fichier .exe bancal.",
        category: "Sécurité",
        options: [
            { label: "J’ouvre. YOLO.", score: 0 },
            { label: "Je scanne sur VirusTotal.", score: 5 },
            { label: "Je n’exécute jamais un exécutable inconnu.", score: 10 },
        ],
    },
    {
        id: 21,
        text: "Ton école veut payer un abonnement logiciel hors de prix.",
        category: "Durabilité",
        options: [
            { label: "C’est normal, tout coûte cher.", score: 0 },
            { label: "On pourrait négocier un peu.", score: 5 },
            { label: "On cherche une alternative libre + locale.", score: 10 },
        ],
    },
    {
        id: 22,
        text: "Tu configures un nouveau PC. Premier réflexe ?",
        category: "Linux",
        options: [
            { label: "Je mets Chrome et Office.", score: 0 },
            { label: "Je vire le bloatware.", score: 5 },
            { label: "Je wipe tout, install Arch (btw).", score: 10 },
        ],
    },
    {
        id: 23,
        text: "Tu dois sauvegarder tes fichiers importants.",
        category: "Cloud UE",
        options: [
            { label: "iCloud/OneDrive, j’ai l’habitude.", score: 0 },
            { label: "Un disque externe (ça marche).", score: 5 },
            { label: "Serveur auto-hébergé + solution libre.", score: 10 },
        ],
    },
    {
        id: 24,
        text: "Quand tu entends 'Matériel obsolète', tu penses…",
        category: "Obsolescence",
        options: [
            { label: "À mon PC du lycée.", score: 0 },
            { label: "Aux mises à jour forcées.", score: 5 },
            { label: "À l’obsolescence programmée que je combats.", score: 10 },
        ],
    },
    {
        id: 25,
        text: "Tu dois créer un site web scolaire.",
        category: "Autonomie",
        options: [
            { label: "Wix/Shopify, simple rapide.", score: 0 },
            { label: "WordPress sur un hébergeur EU.", score: 5 },
            { label: "Une solution libre auto-hébergée.", score: 10 },
        ],
    },
    {
        id: 26,
        text: "Un prof te dit : 'Linux c’est trop compliqué'.",
        category: "Linux",
        options: [
            { label: "Je suis d’accord sans réfléchir.", score: 0 },
            { label: "Je lui montre une interface stylée.", score: 5 },
            { label: "Je lui installe Mint et il devient fan.", score: 10 },
        ],
    },
    {
        id: 27,
        text: "Ta salle info chauffe beaucoup. Tu fais quoi ?",
        category: "Sobriété",
        options: [
            { label: "Je me plains mais bon…", score: 0 },
            { label: "Je coupe les machines inutilisées.", score: 5 },
            { label: "J’analyse la conso + optimisation énergétique.", score: 10 },
        ],
    },
    {
        id: 28,
        text: "Tu veux héberger un service pour ton établissement.",
        category: "Autonomie",
        options: [
            { label: "Un SaaS américain, easy.", score: 0 },
            { label: "Un hébergeur FR ou EU.", score: 5 },
            { label: "Un serveur auto-hébergé sur Linux.", score: 10 },
        ],
    },
    {
        id: 29,
        text: "Tu dois choisir un format de fichier.",
        category: "Libre",
        options: [
            { label: "Le format propriétaire par défaut.", score: 0 },
            { label: "Un PDF classique.", score: 5 },
            { label: "Un format ouvert (ODT, WEBP, PNG, MD).", score: 10 },
        ],
    },
    {
        id: 30,
        text: "Tu reçois un mail suspect dans ton lycée.",
        category: "Sécurité",
        options: [
            { label: "Je clique pour voir.", score: 0 },
            { label: "Je demande à un admin.", score: 5 },
            { label: "Je le signale direct comme phishing.", score: 10 },
        ],
    },
];
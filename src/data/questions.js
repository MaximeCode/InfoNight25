export const questions = [
    {
        id: 1,
        text: "Un PC met 4 minutes à démarrer. Quelle est ta réaction ?",
        category: "Obsolescence & Matériel",
        options: [
            { label: "Je dis qu'il est mort et qu’il faut en acheter un neuf.", score: 0 },
            { label: "Je propose une optimisation basique (SSD, nettoyage).", score: 5 },
            { label: "Je propose de prolonger sa vie via une distribution Linux légère.", score: 10 },
        ],
    },
    {
        id: 2,
        text: "Tu regardes des vidéos de cours…",
        category: "Sobriété Numérique",
        options: [
            { label: "En 4K, même pour un simple diaporama.", score: 0 },
            { label: "En 720p, largement suffisant.", score: 5 },
            { label: "Je télécharge en local pour réduire le streaming inutile.", score: 10 },
        ],
    },
    {
        id: 3,
        text: "Où stockes-tu tes documents sensibles ?",
        category: "Souveraineté & Cloud",
        options: [
            { label: "Google Drive, c’est automatique et je réfléchis pas.", score: 0 },
            { label: "Un cloud européen (OVH, Scalingo…).", score: 5 },
            { label: "Un Nextcloud auto-hébergé géré localement.", score: 10 },
        ],
    },
    {
        id: 4,
        text: "On te propose d’essayer un logiciel libre.",
        category: "Logiciels Libres",
        options: [
            { label: "Je refuse : je ne jure que par les logiciels propriétaires.", score: 0 },
            { label: "Je teste si ça peut remplacer ce que j’utilise.", score: 5 },
            { label: "Je privilégie systématiquement les alternatives libres.", score: 10 },
        ],
    },
    {
        id: 5,
        text: "Un mail suspect arrive dans ta boîte.",
        category: "Sécurité Numérique",
        options: [
            { label: "Je clique, on verra bien ce que ça fait.", score: 0 },
            { label: "Je vérifie l’adresse et demande confirmation.", score: 5 },
            { label: "Je le signale immédiatement comme phishing.", score: 10 },
        ],
    },
    {
        id: 6,
        text: "Ton vieux téléphone rame.",
        category: "Durabilité & Réemploi",
        options: [
            { label: "Je le jette et j’achète le dernier modèle.", score: 0 },
            { label: "Je remplace la batterie ou fais réparer.", score: 5 },
            { label: "Je lui installe une ROM libre pour lui donner une seconde vie.", score: 10 },
        ],
    },
    {
        id: 7,
        text: "Le lycée doit remplacer 80 ordinateurs.",
        category: "Durabilité & Réemploi",
        options: [
            { label: "On jette tout : nouveau = mieux.", score: 0 },
            { label: "On achète du reconditionné professionnel.", score: 5 },
            { label: "On remet en service les machines existantes avec Linux.", score: 10 },
        ],
    },
    {
        id: 8,
        text: "Tu veux installer un logiciel.",
        category: "Logiciels Libres",
        options: [
            { label: "Je télécharge un .exe trouvé au hasard sur Internet.", score: 0 },
            { label: "Je prends une alternative gratuite (mais pas forcément libre).", score: 5 },
            { label: "Je privilégie un logiciel libre depuis un dépôt officiel.", score: 10 },
        ],
    },
    {
        id: 9,
        text: "Réunion en visio prévue demain.",
        category: "Souveraineté & Cloud",
        options: [
            { label: "Zoom, comme tout le monde.", score: 0 },
            { label: "Jitsi ou BigBlueButton hébergé en Europe.", score: 5 },
            { label: "J’utilise la visio auto-hébergée de l’établissement.", score: 10 },
        ],
    },
    {
        id: 10,
        text: "Quand tu prends une pause, ton PC…",
        category: "Sobriété Numérique",
        options: [
            { label: "Reste allumé avec 50 onglets ouverts, évidemment.", score: 0 },
            { label: "Passe en veille pour économiser un peu.", score: 5 },
            { label: "Je l’éteins dès que je m’absente longtemps.", score: 10 },
        ],
    },
    {
        id: 11,
        text: "Un PC ne reçoit plus les mises à jour.",
        category: "Obsolescence & Matériel",
        options: [
            { label: "On le jette : obsolete = poubelle.", score: 0 },
            { label: "On tente une réparation logicielle ou une mise à niveau.", score: 5 },
            { label: "On installe un OS libre maintenu longtemps.", score: 10 },
        ],
    },
    {
        id: 12,
        text: "Tu veux télécharger une application.",
        category: "Sécurité Numérique",
        options: [
            { label: "Je prends un APK sur un site sombre.", score: 0 },
            { label: "Je télécharge depuis le site officiel du développeur.", score: 5 },
            { label: "Je passe par un dépôt sécurisé et vérifié (APT, Flatpak…).", score: 10 },
        ],
    },
    {
        id: 13,
        text: "Ton prof partage les docs via WhatsApp.",
        category: "Souveraineté & Cloud",
        options: [
            { label: "C’est pratique donc je dis rien.", score: 0 },
            { label: "Je propose un service européen plus respectueux.", score: 5 },
            { label: "Je recommande fortement un outil interne (Nextcloud).", score: 10 },
        ],
    },
    {
        id: 14,
        text: "Quel lecteur PDF utilises-tu ?",
        category: "Logiciels Libres",
        options: [
            { label: "Toujours Adobe Reader.", score: 0 },
            { label: "Un lecteur open-source classique (Sumatra, Okular).", score: 5 },
            { label: "Un lecteur libre optimisé pour réduire la consommation.", score: 10 },
        ],
    },
    {
        id: 15,
        text: "20 ordinateurs anciens arrivent en fin d’usage. Quelle stratégie appliques-tu en priorité ?",
        category: "Durabilité & Réemploi",
        options: [
            { label: "Je considère que vieux = déchets. Direction la benne.", score: 0 },
            { label: "J’évalue ce qui peut être récupéré : pièces, matériaux, composants.", score: 5 },
            { label: "Je vérifie systématiquement chaque machine pour tenter un reconditionnement.", score: 10 },
        ],
    }
];
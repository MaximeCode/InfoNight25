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
    }
];
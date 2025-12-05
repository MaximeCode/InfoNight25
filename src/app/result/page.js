"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Background } from "@/components/ui/Background";
import { Button } from "@/components/ui/Button";
import { IdCard } from "@/components/game/IdCard";
import { PseudoModal } from "@/components/game/PseudoModal";
import { ChaosEmailModal } from "@/components/game/ChaosEmailModal";
import { GoBackButton } from "@/components/ui/GoBackButton";
import { toPng } from "html-to-image";
import Link from "next/link";
import { motion } from "framer-motion";

function ResultContent() {
    const searchParams = useSearchParams();
    // Parse data param or fallback to score param for backward compatibility
    const dataParam = searchParams.get("data");
    const scoreParam = searchParams.get("score");

    let results = { global: 0, categories: {} };

    if (dataParam) {
        try {
            results = JSON.parse(decodeURIComponent(dataParam));
        } catch (e) {
            console.error("Failed to parse results", e);
        }
    } else if (scoreParam) {
        results.global = parseInt(scoreParam);
    }

    const cardRef = useRef(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [username, setUsername] = useState("Agent Anonyme");
    const [showModal, setShowModal] = useState(true);
    const [theme, setTheme] = useState("retro");
    const [showEmailModal, setShowEmailModal] = useState(false);

    const downloadCard = async () => {
        if (cardRef.current === null) {
            return;
        }
        setIsGenerating(true);
        try {
            const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
            const link = document.createElement("a");
            link.download = `carte-resistance-nird-${username}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error("Failed to generate image", err);
        } finally {
            setIsGenerating(false);
        }
    };

    const handlePseudoSubmit = (name) => {
        setUsername(name);
        setShowModal(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 gap-8 pb-20">
            <PseudoModal isOpen={showModal} onSubmit={handlePseudoSubmit} />

            <div className={`transition-all duration-1000 w-full flex flex-col items-center ${showModal ? "blur-sm opacity-50" : "blur-0 opacity-100"}`}>
                <div className="text-center space-y-2 mb-8">
                    <h1 className="text-4xl font-bold text-white">Résultat du Scan</h1>
                    <p className="text-nird-light/60">Analyse de ton empreinte numérique terminée.</p>
                </div>

                {/* Theme Selector */}
                <div className="flex gap-4 mb-8 bg-black/40 p-2 rounded-full border border-white/10 backdrop-blur-sm">
                    {['retro', 'dark', 'light'].map((t) => (
                        <button
                            key={t}
                            onClick={() => setTheme(t)}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${theme === t
                                ? 'bg-nird-gold text-black shadow-[0_0_15px_rgba(234,179,8,0.5)]'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="space-y-8 flex flex-col items-center w-full">
                    {/* Card Preview */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="relative group w-full flex justify-center py-4 overflow-hidden"
                    >
                        <div className="scale-[0.55] sm:scale-75 md:scale-100 origin-center transition-transform duration-300">
                            <div className="absolute -inset-1 bg-gradient-to-r from-nird-gold to-nird-neon rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                            <IdCard ref={cardRef} results={results} username={username} theme={theme} />
                        </div>
                    </motion.div>

                    <div className="flex flex-col gap-4 w-full max-w-md">
                        <div className="flex gap-4 w-full">
                            <Button onClick={downloadCard} disabled={isGenerating} variant="secondary" className="flex-1">
                                {isGenerating ? "Génération..." : "Télécharger ma Carte"}
                            </Button>
                            <Link href="/test">
                                <Button variant="outline">Recommencer</Button>
                            </Link>
                        </div>
                        <Button
                            variant="ghost"
                            onClick={() => setShowEmailModal(true)}
                            className="w-full text-emerald-900/90 hover:text-emerald-950 text-xs bg-gradient-to-r from-emerald-500 to-emerald-500"
                        >
                            Envoyer par mail
                        </Button>
                    </div>
                </div>
            </div>
            <ChaosEmailModal isOpen={showEmailModal} onClose={() => setShowEmailModal(false)} />
        </div>
    );
}

export default function ResultPage() {
    return (
        <main className="min-h-screen relative">
            <Background />
            <GoBackButton href="/" />
            <Suspense fallback={<div className="text-white text-center pt-20">Chargement...</div>}>
                <ResultContent />
            </Suspense>
        </main>
    );
}

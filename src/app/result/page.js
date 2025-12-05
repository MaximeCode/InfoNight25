"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Background } from "@/components/ui/Background";
import { Button } from "@/components/ui/Button";
import { ResultGauge } from "@/components/game/ResultGauge";
import { IdCard } from "@/components/game/IdCard";
import { PseudoModal } from "@/components/game/PseudoModal";
import { toPng } from "html-to-image";
import Link from "next/link";
import { motion } from "framer-motion";

function ResultContent() {
    const searchParams = useSearchParams();
    const score = parseInt(searchParams.get("score") || "0");
    const cardRef = useRef(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [username, setUsername] = useState("Agent Anonyme");
    const [showModal, setShowModal] = useState(true);

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
        <div className="flex flex-col items-center justify-center min-h-screen p-4 gap-8">
            <PseudoModal isOpen={showModal} onSubmit={handlePseudoSubmit} />

            <div className={`transition-all duration-1000 w-full flex flex-col items-center ${showModal ? "blur-sm opacity-50" : "blur-0 opacity-100"}`}>
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold text-white">Résultat du Scan</h1>
                    <p className="text-nird-light/60">Analyse de ton empreinte numérique terminée.</p>
                </div>

                <ResultGauge score={score} />

                <div className="mt-12 space-y-6 flex flex-col items-center w-full">
                    <h2 className="text-2xl font-bold text-nird-gold">Ta Carte de Résistant</h2>

                    {/* Card Preview */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="relative group"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-nird-gold to-nird-neon rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                        <IdCard ref={cardRef} score={score} username={username} />
                    </motion.div>

                    <div className="flex gap-4">
                        <Button onClick={downloadCard} disabled={isGenerating} variant="secondary">
                            {isGenerating ? "Génération..." : "Télécharger ma Carte"}
                        </Button>
                        <Link href="/test">
                            <Button variant="outline">Recommencer</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ResultPage() {
    return (
        <main className="min-h-screen relative">
            <Background />
            <Suspense fallback={<div className="text-white text-center pt-20">Chargement...</div>}>
                <ResultContent />
            </Suspense>
        </main>
    );
}

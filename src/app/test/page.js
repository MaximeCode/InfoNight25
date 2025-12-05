"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Background } from "@/components/ui/Background";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { QuestionCard } from "@/components/game/QuestionCard";
import { questions } from "@/data/questions";
import { AnimatePresence } from "framer-motion";

export default function TestPage() {
    const router = useRouter();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Initialize scores with new category names
    const [scores, setScores] = useState({
        "Obsolescence & Matériel": 0,
        "Sobriété Numérique": 0,
        "Souveraineté & Cloud": 0,
        "Logiciels Libres": 0,
        "Sécurité Numérique": 0,
        "Durabilité & Réemploi": 0
    });

    const [maxScores, setMaxScores] = useState({
        "Obsolescence & Matériel": 0,
        "Sobriété Numérique": 0,
        "Souveraineté & Cloud": 0,
        "Logiciels Libres": 0,
        "Sécurité Numérique": 0,
        "Durabilité & Réemploi": 0
    });

    const handleAnswer = (points) => {
        const currentCategory = questions[currentQuestionIndex].category;

        // Update category score
        const newScores = { ...scores };
        const newMaxScores = { ...maxScores };

        if (newScores[currentCategory] !== undefined) {
            newScores[currentCategory] += points;
            newMaxScores[currentCategory] += 10; // Assuming 10 is max points per question
        } else {
            // Fallback if category name mismatch (should not happen if data is consistent)
            newScores[currentCategory] = (newScores[currentCategory] || 0) + points;
            newMaxScores[currentCategory] = (newMaxScores[currentCategory] || 0) + 10;
        }
        setScores(newScores);
        setMaxScores(newMaxScores);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Finish test
            // Calculate percentages per category
            const finalScores = {};
            Object.keys(newScores).forEach(cat => {
                const max = newMaxScores[cat] || 10; // Avoid division by zero
                finalScores[cat] = Math.round((newScores[cat] / max) * 100);
            });

            // Simple global score
            const totalPoints = Object.values(newScores).reduce((a, b) => a + b, 0);
            const totalMax = Object.values(newMaxScores).reduce((a, b) => a + b, 0);
            const globalScore = totalMax > 0 ? Math.round((totalPoints / totalMax) * 100) : 0;

            // Serialize results
            const results = {
                global: globalScore,
                categories: finalScores
            };

            const data = encodeURIComponent(JSON.stringify(results));
            router.push(`/result?data=${data}`);
        }
    };

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / questions.length) * 100;

    return (
        <main className="min-h-screen relative flex flex-col items-center justify-center p-4">
            <Background />

            <div className="w-full max-w-xl mb-8 space-y-2">
                <div className="flex justify-between text-nird-light text-sm font-mono">
                    <span>Progression</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <ProgressBar value={progress} />
            </div>

            <AnimatePresence mode="wait">
                <QuestionCard
                    key={currentQuestion.id}
                    question={currentQuestion}
                    onAnswer={handleAnswer}
                    totalQuestions={questions.length}
                    currentQuestionIndex={currentQuestionIndex}
                />
            </AnimatePresence>
        </main>
    );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Background } from "@/components/ui/Background";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { QuestionCard } from "@/components/game/QuestionCard";
import { questions } from "@/data/questions";
import { AnimatePresence, motion } from "framer-motion";

export default function TestPage() {
    const router = useRouter();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);

    const handleAnswer = (points) => {
        const newScore = score + points;
        setScore(newScore);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Finish test
            // Store score in localStorage or pass via query param (simple version)
            const finalScore = Math.round((newScore / (questions.length * 10)) * 100);
            router.push(`/result?score=${finalScore}`);
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

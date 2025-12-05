"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useEffect, useState } from "react";

export function QuestionCard({
	question,
	onAnswer,
	totalQuestions,
	currentQuestionIndex,
}) {
	const [selectedOption, setSelectedOption] = useState(null);
	const [options, setOptions] = useState([]);

	useEffect(() => {
		const shuffledOptions = [...question.options];
		shuffledOptions.sort(() => Math.random() - 0.5);
		setOptions(shuffledOptions);
	}, [question]);

	const handleSelect = (index) => {
		setSelectedOption(index);
		// Add a small delay for the user to see the selection before moving on
		setTimeout(() => {
			onAnswer(question.options[index].score);
			setSelectedOption(null);
		}, 400);
	};

	return (
		<motion.div
			key={question.id}
			initial={{ opacity: 0, x: 50, rotate: 5 }}
			animate={{ opacity: 1, x: 0, rotate: 0 }}
			exit={{ opacity: 0, x: -50, rotate: -5 }}
			transition={{ type: "spring", stiffness: 200, damping: 20 }}
			className="w-full max-w-xl mx-auto"
		>
			<Card
				variant="parchment"
				className="p-8 min-h-[400px] flex flex-col justify-between relative overflow-visible"
			>
				{/* Header */}
				<div className="flex justify-between items-start mb-6">
					<Badge
						variant="tech"
						className="text-sm"
					>
						Question {currentQuestionIndex + 1}/{totalQuestions}
					</Badge>
					<Badge variant="warning">{question.category}</Badge>
				</div>

				{/* Question Text */}
				<h2 className="text-2xl font-bold text-nird-brown mb-8 font-sans">
					{question.text}
				</h2>

				{/* Options */}
				<div className="space-y-3">
					{options.map((option, index) => (
						<motion.button
							key={index}
							whileHover={{ scale: 1.02, x: 10 }}
							whileTap={{ scale: 0.98 }}
							onClick={() => handleSelect(index)}
							className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-between group ${
								selectedOption === index
									? "bg-nird-green/20 border-nird-green text-nird-dark"
									: "bg-white/50 border-nird-brown/20 hover:border-nird-brown hover:bg-white/80 text-nird-brown"
							}`}
						>
							<span className="font-medium text-lg">{option.label}</span>
							{selectedOption === index && (
								<motion.span
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									className="text-xl"
								>
									✨
								</motion.span>
							)}
						</motion.button>
					))}
				</div>

				{/* Decorative Elements */}
				<div className="absolute -top-4 -right-4 text-4xl opacity-20 rotate-12">
					📜
				</div>
			</Card>
		</motion.div>
	);
}

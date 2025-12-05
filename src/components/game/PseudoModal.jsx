"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import SnakeGame from "@/components/game/SnakeGame";
import { Terminal, Sparkles } from "lucide-react";

export function PseudoModal({ isOpen, onSubmit }) {
	const [pseudo, setPseudo] = useState("");
	const [isHackerMode, setIsHackerMode] = useState(false);
	const [showSnake, setShowSnake] = useState(false);
	const [glitch, setGlitch] = useState(false);

	useEffect(() => {
		if (pseudo.toLowerCase() === "sudo snake") {
			triggerHackerMode();
		} else {
			setIsHackerMode(false);
		}
	}, [pseudo]);

	const triggerHackerMode = () => {
		setIsHackerMode(true);
		setGlitch(true);

		// Glitch effect timeout
		setTimeout(() => setGlitch(false), 500);

		// Auto launch after delay
		setTimeout(() => {
			setShowSnake(true);
		}, 800);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isHackerMode) return; // Prevent submission in hacker mode

		if (pseudo.trim()) {
			onSubmit(pseudo);
		}
	};

	const handleCloseSnake = () => {
		setShowSnake(false);
		setPseudo("");
		setIsHackerMode(false);
	};

	if (!isOpen) return null;

	return (
		<AnimatePresence>
			<div className="fixed inset-0 z-50 flex items-center justify-center px-4">
				{/* Backdrop */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="absolute inset-0 bg-black/60 backdrop-blur-sm"
				/>

				{/* Modal Container */}
				{!showSnake && (
					<motion.div
						initial={{ scale: 0.9, opacity: 0, y: 20 }}
						animate={{
							scale: 1,
							opacity: 1,
							y: 0,
							x: glitch ? [0, -10, 10, -5, 5, 0] : 0,
						}}
						transition={{
							scale: { type: "spring", duration: 0.5 },
							opacity: { type: "spring", duration: 0.5 },
							y: { type: "spring", duration: 0.5 },
							x: { type: "tween", duration: 0.5 }, // Utilise "tween" pour l'animation glitch
						}}
						className={`relative w-full max-w-md p-8 rounded-2xl border shadow-2xl overflow-hidden transition-all duration-300 ${
							isHackerMode
								? "bg-black border-nird-neon shadow-[0_0_30px_var(--color-nird-neon)]"
								: "bg-nird-dark/90 border-white/10 shadow-xl"
						}`}
					>
						{/* Hacker Mode Background Grid */}
						{isHackerMode && (
							<div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(6,182,212,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.2)_1px,transparent_1px)] bg-[size:20px_20px]" />
						)}

						<div className="relative z-10 text-center space-y-6">
							<div className="space-y-2">
								<motion.h2
									className={`text-3xl font-bold font-sans ${
										isHackerMode ? "text-nird-neon glitch-text" : "text-white"
									}`}
									animate={
										isHackerMode
											? {
													textShadow: [
														"0 0 0px #06B6D4",
														"0 0 10px #06B6D4",
														"0 0 0px #06B6D4",
													],
											  }
											: {}
									}
								>
									{isHackerMode ? "SYSTEM OVERRIDE" : "Identité Requise"}
								</motion.h2>
								<p
									className={`text-sm ${
										isHackerMode
											? "text-nird-neon/80 font-mono"
											: "text-nird-light/60"
									}`}
								>
									{isHackerMode
										? "> ACCESSING HIDDEN MODULE..."
										: "Pour générer votre carte de membre."}
								</p>
							</div>

							<form
								onSubmit={handleSubmit}
								className="space-y-6"
							>
								<div className="relative group">
									<input
										type="text"
										value={pseudo}
										onChange={(e) => setPseudo(e.target.value)}
										placeholder="Entrez votre nom de code..."
										className={`w-full bg-black/20 border-2 rounded-lg px-4 py-3 text-lg font-mono text-center focus:outline-none transition-all duration-300 ${
											isHackerMode
												? "border-nird-neon text-nird-neon placeholder-nird-neon/30"
												: "border-white/10 text-white focus:border-nird-green placeholder-white/30"
										}`}
										autoFocus
									/>
									{/* Focus Glow */}
									<div
										className={`absolute inset-0 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none ${
											isHackerMode
												? "shadow-[0_0_20px_var(--color-nird-neon)]"
												: "shadow-[0_0_20px_var(--color-nird-green)]"
										}`}
									/>
								</div>

								{isHackerMode ? (
									<div className="h-12 flex items-center justify-center text-nird-neon font-mono text-sm animate-pulse">
										<Terminal className="w-4 h-4 mr-2" />
										LAUNCHING SNAKE.EXE_
									</div>
								) : (
									<Button
										type="submit"
										variant="primary"
										className="w-full text-lg py-6"
										disabled={!pseudo.trim()}
									>
										<Sparkles className="w-5 h-5 mr-2" />
										Générer mon ID
									</Button>
								)}
							</form>
						</div>
					</motion.div>
				)}

				{/* Snake Game Overlay */}
				{showSnake && <SnakeGame onClose={handleCloseSnake} />}
			</div>
		</AnimatePresence>
	);
}

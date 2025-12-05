"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

const CHARS = "abcdefghijklmnopqrstuvwxyz0123456789@.-_".split("");

export function ChaosEmailModal({ isOpen, onClose }) {
	const [email, setEmail] = useState("");
	const [showSuccess, setShowSuccess] = useState(false);
	const containerRef = useRef(null);
	const requestRef = useRef(null);
	const particlesRef = useRef([]);

	// Initialize particles
	useEffect(() => {
		if (isOpen) {
			setEmail("");
			setShowSuccess(false);

			// Create particle state for each char
			particlesRef.current = CHARS.map((char, i) => ({
				char,
				id: i,
				x: Math.random() * 400 - 200, // Relative to center
				y: Math.random() * 300 - 150,
				vx: (Math.random() - 0.5) * 2,
				vy: (Math.random() - 0.5) * 2,
				rot: Math.random() * 360,
				vRot: (Math.random() - 0.5) * 5,
				scale: 1,
				element: null, // Will be assigned via ref callback
			}));

			// Start loop
			requestRef.current = requestAnimationFrame(animate);
		}
		return () => cancelAnimationFrame(requestRef.current);
	}, [isOpen]);

	const animate = useCallback(() => {
		if (!containerRef.current) return;

		const { width, height } = containerRef.current.getBoundingClientRect();
		const halfW = width / 2 - 20; // Margin
		const halfH = height / 2 - 20;

		particlesRef.current.forEach((p) => {
			// Update pos
			p.x += p.vx;
			p.y += p.vy;
			p.rot += p.vRot;

			// Bounce off walls
			if (p.x < -halfW || p.x > halfW) {
				p.vx *= -1;
				p.x = Math.max(-halfW, Math.min(halfW, p.x));
			}
			if (p.y < -halfH || p.y > halfH) {
				p.vy *= -1;
				p.y = Math.max(-halfH, Math.min(halfH, p.y));
			}

			// Apply to DOM
			if (p.element) {
				p.element.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg) scale(${p.scale})`;
			}
		});

		requestRef.current = requestAnimationFrame(animate);
	}, []);

	const handleCharClick = (char, index) => {
		setEmail((prev) => prev + char);

		// Visual pop effect on the particle
		const p = particlesRef.current[index];
		if (p && p.element) {
			p.scale = 1.5;
			setTimeout(() => {
				p.scale = 1;
			}, 100);
			// Randomize velocity on click for chaos
			p.vx = (Math.random() - 0.5) * 10;
			p.vy = (Math.random() - 0.5) * 10;
		}
	};

	const handleBackspace = () => {
		setEmail((prev) => prev.slice(0, -1));
	};

	const isValidEmail = (email) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	};

	const handleSubmit = () => {
		setShowSuccess(true);
		setTimeout(() => {
			onClose();
		}, 2000);
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md font-mono overflow-hidden">
			<motion.div
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				className="w-full max-w-4xl h-[80vh] bg-zinc-900/50 border-2 border-nird-neon rounded-xl shadow-[0_0_50px_rgba(6,182,212,0.2)] relative flex flex-col"
			>
				{/* Header & Display */}
				<div className="p-6 bg-zinc-900 border-b border-nird-neon/30 z-20 relative">
					<div className="flex justify-between items-start mb-4">
						<div>
							<h2 className="text-2xl font-bold text-nird-neon animate-pulse">
								GRAVITY KEYBOARD
							</h2>
							<p className="text-xs text-nird-light/60">
								Catch the letters to write your email.
							</p>
						</div>
						<button
							onClick={onClose}
							className="text-zinc-500 hover:text-white"
						>
							✕
						</button>
					</div>

					<div className="flex gap-2">
						<div className="flex-1 bg-black border border-nird-neon/50 p-4 rounded text-xl text-white min-h-[60px] flex items-center overflow-x-auto whitespace-nowrap">
							{email}
							<span className="animate-blink ml-1">_</span>
						</div>
						<Button
							variant="outline"
							onClick={handleBackspace}
							className="border-red-500 text-red-500"
						>
							⌫
						</Button>
						<Button
							variant="primary"
							onClick={handleSubmit}
							disabled={!isValidEmail(email)}
						>
							SEND
						</Button>
					</div>
				</div>

				{/* Game Area */}
				<div
					ref={containerRef}
					className="flex-1 relative overflow-hidden cursor-crosshair"
				>
					{/* Grid Background */}
					<div
						className="absolute inset-0 opacity-20 pointer-events-none"
						style={{
							backgroundImage:
								"linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)",
							backgroundSize: "40px 40px",
						}}
					/>

					{/* Floating Particles */}
					<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
						{CHARS.map((char, i) => (
							<div
								key={i}
								ref={(el) => {
									if (particlesRef.current[i])
										particlesRef.current[i].element = el;
								}}
								className="absolute w-10 h-10 flex items-center justify-center pointer-events-auto cursor-pointer select-none"
								onClick={() => handleCharClick(char, i)}
							>
								<div className="w-full h-full bg-black/80 border border-nird-neon/50 rounded-full flex items-center justify-center text-nird-neon font-bold hover:bg-nird-neon hover:text-black hover:scale-110 transition-colors shadow-[0_0_10px_rgba(6,182,212,0.3)]">
									{char}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Success Overlay */}
				<AnimatePresence>
					{showSuccess && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="absolute inset-0 z-50 bg-nird-green/90 flex items-center justify-center backdrop-blur-sm"
						>
							<div className="text-center">
								<h3 className="text-4xl font-black text-black mb-2">
									TRANSMISSION SENT
								</h3>
								<p className="text-black/80 font-bold">Good luck finding it.</p>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</div>
	);
}

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/components/icons/Icons";

export default function CursorChallenge({ onUnlock }) {
	const [gameState, setGameState] = useState("playing"); // playing, success
	const [cursor, setCursor] = useState({ x: 0, y: 0, angle: 0, vx: 0, vy: 0 });
	const [progress, setProgress] = useState(0);
	const [keys, setKeys] = useState({});
	const requestRef = useRef();
	const containerRef = useRef();
	const targetRef = useRef();

	// Constants
	const ACCELERATION = 0.2;
	const ROTATION_SPEED = 5;
	const MIN_SPEED = 3; // Always moving
	const MAX_SPEED = 1000;
	const TARGET_RADIUS = 60;
	const UNLOCK_TIME = 3000; // 3 seconds

	// Handle Input
	useEffect(() => {
		const handleKeyDown = (e) =>
			setKeys((k) => ({ ...k, [e.key.toLowerCase()]: true, [e.code]: true }));
		const handleKeyUp = (e) =>
			setKeys((k) => ({ ...k, [e.key.toLowerCase()]: false, [e.code]: false }));
		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, []);

	// Separate effect for logic that needs state access without re-triggering loop
	// We use a ref for physics state to avoid re-renders during the loop
	const physicsState = useRef({ x: 0, y: 0, angle: -90, speed: MIN_SPEED });
	const lastTimeRef = useRef(Date.now());
	const progressRef = useRef(0);

	const gameLoop = useCallback(() => {
		if (gameState !== "playing") return;

		const now = Date.now();
		const dt = (now - lastTimeRef.current) / 16.66; // Normalize to ~60fps
		lastTimeRef.current = now;

		const state = physicsState.current;

		// Rotation
		if (keys["ArrowLeft"]) state.angle -= ROTATION_SPEED * dt;
		if (keys["ArrowRight"]) state.angle += ROTATION_SPEED * dt;

		// Speed Control (Z = Accel, S = Decel)
		// Support both 'z'/'s' keys and 'ArrowUp'/'ArrowDown' as fallbacks/alternatives if desired,
		// but user specifically asked for Z/S. We'll support Z/S and keep arrows for rotation.
		if (keys["z"] || keys["Z"]) {
			state.speed += ACCELERATION * dt;
		}
		if (keys["s"] || keys["S"]) {
			state.speed -= ACCELERATION * dt;
		}

		// Clamp Speed
		state.speed = Math.max(MIN_SPEED, Math.min(state.speed, MAX_SPEED));

		// Calculate Velocity Vector based on Angle and Speed
		const rad = (state.angle * Math.PI) / 180;
		const vx = Math.cos(rad) * state.speed;
		const vy = Math.sin(rad) * state.speed;

		// Update Position
		state.x += vx * dt;
		state.y += vy * dt;

		// Wrap
		if (containerRef.current) {
			const { width, height } = containerRef.current.getBoundingClientRect();
			const halfW = width / 2;
			const halfH = height / 2;
			if (state.x < -halfW) state.x = halfW;
			if (state.x > halfW) state.x = -halfW;
			if (state.y < -halfH) state.y = halfH;
			if (state.y > halfH) state.y = -halfH;
		}

		// Sync to React State for render
		setCursor({ ...state, vx, vy });

		// Check Target
		const dist = Math.sqrt(state.x * state.x + state.y * state.y);
		if (dist < TARGET_RADIUS) {
			progressRef.current += 16.66 * dt; // Add time in ms
		} else {
			progressRef.current = Math.max(0, progressRef.current - 50 * dt); // Decay
		}

		const prog = Math.min(100, (progressRef.current / UNLOCK_TIME) * 100);
		setProgress(prog);

		if (prog >= 100) {
			setGameState("success");
			setTimeout(() => onUnlock && onUnlock(), 2000);
		} else {
			requestRef.current = requestAnimationFrame(gameLoop);
		}
	}, [keys, gameState, onUnlock]);

	useEffect(() => {
		if (gameState === "playing") {
			requestRef.current = requestAnimationFrame(gameLoop);
		}
		return () => cancelAnimationFrame(requestRef.current);
	}, [gameLoop, gameState]);

	return (
		<div
			ref={containerRef}
			className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden font-mono cursor-none"
		>
			{/* Retro Grid Background */}
			<div className="absolute inset-0 perspective-grid opacity-60" />
			<div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />

			{/* Instructions */}
			<div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none z-20">
				<p className="text-cyan-400 text-sm animate-pulse mb-2">
					SYSTEM LOCKED // MANUAL OVERRIDE REQUIRED
				</p>
				<div className="flex justify-center gap-4 text-xs text-white/50">
					<span>[←/→] ROTATE</span>
					<span>[Z] BOOST</span>
					<span>[S] BRAKE</span>
				</div>
			</div>

			{/* Target Zone */}
			<div
				ref={targetRef}
				className={`relative w-[150px] h-[150px] rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
					progress > 0
						? "border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.4)]"
						: "border-yellow-500/30 border-dashed animate-spin-slow"
				}`}
			>
				{/* Progress Ring */}
				<svg className="absolute inset-0 w-full h-full -rotate-90">
					<circle
						cx="75"
						cy="75"
						r="70"
						fill="none"
						stroke={progress >= 100 ? "#22c55e" : "#eab308"}
						strokeWidth="4"
						strokeDasharray="440"
						strokeDashoffset={440 - (440 * progress) / 100}
						className="transition-all duration-100"
					/>
				</svg>

				{progress >= 100 && (
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						className="text-green-500 font-bold text-center"
					>
						ACCESS
						<br />
						GRANTED
					</motion.div>
				)}
			</div>

			{/* Player Cursor */}
			<motion.div
				className="absolute w-8 h-8 z-10 flex items-center justify-center"
				style={{
					x: cursor.x,
					y: cursor.y,
					rotate: cursor.angle + 90, // Adjust for icon orientation
				}}
			>
				{/* Thrust Trail */}
				{keys["ArrowUp"] && (
					<div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-8 bg-gradient-to-b from-pink-500 to-transparent blur-sm" />
				)}

				{/* Ship Icon */}
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					className="w-full h-full text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]"
				>
					<path
						d="M12 2L2 22L12 18L22 22L12 2Z"
						fill="rgba(6,182,212,0.1)"
					/>
				</svg>
			</motion.div>

			{/* Success Overlay */}
			<AnimatePresence>
				{gameState === "success" && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="absolute inset-0 bg-green-500/20 flex items-center justify-center z-50 backdrop-blur-sm"
					>
						<h1 className="text-6xl font-black text-white tracking-tighter glitch-text">
							UNLOCKED
						</h1>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

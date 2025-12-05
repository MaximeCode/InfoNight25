"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, RefreshCw, Play } from "lucide-react";

// --- Constants ---
const GRID_SIZE = 19;
const INITIAL_SPEED = 150;
const MIN_SPEED = 80;
const SPEED_DECREMENT = 2;

// --- Helper Functions ---
const getRandomPos = (snake, existingItems = []) => {
	let newPos;
	let attempts = 0;
	while (attempts < 100) {
		newPos = {
			x: Math.floor(Math.random() * GRID_SIZE),
			y: Math.floor(Math.random() * GRID_SIZE),
		};
		const onSnake = snake.some(
			(seg) => seg.x === newPos.x && seg.y === newPos.y
		);
		const onItem = existingItems.some(
			(item) => item.x === newPos.x && item.y === newPos.y
		);
		if (!onSnake && !onItem) return newPos;
		attempts++;
	}
	return { x: 15, y: 5 }; // Fallback
};

// Button Component
function Button({
	children,
	onClick,
	variant = "primary",
	size = "md",
	className = "",
	disabled = false,
}) {
	const baseStyles =
		"font-bold rounded-lg transition-all duration-200 flex items-center justify-center";
	const sizeStyles = {
		sm: "px-3 py-1.5 text-sm",
		md: "px-4 py-2",
		lg: "px-6 py-3 text-lg",
	};
	const variantStyles = {
		primary: "bg-cyan-500 text-black hover:bg-cyan-400",
		outline: "border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500/10",
		ghost: "hover:bg-white/10",
	};

	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`${baseStyles} ${sizeStyles[size]} ${
				variantStyles[variant]
			} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
		>
			{children}
		</button>
	);
}

export default function SnakeGame({ onClose }) {
	// --- State ---
	const [gameState, setGameState] = useState("IDLE"); // IDLE, PLAYING, PAUSED, GAME_OVER
	const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
	const [food, setFood] = useState({ x: 15, y: 5 });
	const [malus, setMalus] = useState(null); // Windows logo malus
	const [direction, setDirection] = useState({ x: 0, y: -1 });
	const [score, setScore] = useState(0);
	const [highScore, setHighScore] = useState(0);
	const [speed, setSpeed] = useState(INITIAL_SPEED);

	// Refs for mutable game state
	const snakeRef = useRef([{ x: 10, y: 10 }]);
	const foodRef = useRef({ x: 15, y: 5 });
	const malusRef = useRef(null);
	const directionRef = useRef({ x: 0, y: -1 });
	const nextDirectionRef = useRef({ x: 0, y: -1 });
	const scoreRef = useRef(0);
	const speedRef = useRef(INITIAL_SPEED);
	const lastMoveTimeRef = useRef(0);
	const animationFrameRef = useRef();
	const gameStateRef = useRef("IDLE");
	const malusTimerRef = useRef(null);

	// --- Initialization ---
	useEffect(() => {
		const saved = localStorage.getItem("nird_snake_highscore");
		if (saved) setHighScore(parseInt(saved));
	}, []);

	// Sync gameState to ref
	useEffect(() => {
		gameStateRef.current = gameState;
	}, [gameState]);

	// Sync speed to ref
	useEffect(() => {
		speedRef.current = speed;
	}, [speed]);

	// --- Game Over Handler ---
	const handleGameOver = useCallback(() => {
		setGameState("GAME_OVER");
		const finalScore = scoreRef.current;
		setHighScore((prev) => {
			const newHigh = Math.max(prev, finalScore);
			localStorage.setItem("nird_snake_highscore", newHigh.toString());
			return newHigh;
		});
		if (malusTimerRef.current) {
			clearTimeout(malusTimerRef.current);
			malusTimerRef.current = null;
		}
	}, []);

	// Spawn malus periodically
	const spawnMalus = useCallback(() => {
		if (gameStateRef.current === "PLAYING" && Math.random() > 0.3) {
			const existingItems = [foodRef.current];
			const newMalus = getRandomPos(snakeRef.current, existingItems);
			malusRef.current = newMalus;
			setMalus(newMalus);

			// Remove malus after 5 seconds if not eaten
			malusTimerRef.current = setTimeout(() => {
				malusRef.current = null;
				setMalus(null);
			}, 5000);
		}
	}, []);

	// --- Game Loop ---
	const runGameTick = useCallback(
		(timestamp) => {
			if (gameStateRef.current !== "PLAYING") {
				animationFrameRef.current = requestAnimationFrame(runGameTick);
				return;
			}

			if (timestamp - lastMoveTimeRef.current >= speedRef.current) {
				lastMoveTimeRef.current = timestamp;

				// 1. Update Direction
				const currentDir = directionRef.current;
				const nextDir = nextDirectionRef.current;
				if (nextDir.x !== -currentDir.x || nextDir.y !== -currentDir.y) {
					directionRef.current = nextDir;
				}
				const moveDir = directionRef.current;
				setDirection(moveDir);

				// 2. Move Snake
				const currentSnake = snakeRef.current;
				const head = currentSnake[0];
				const newHead = { x: head.x + moveDir.x, y: head.y + moveDir.y };

				// 3. Collision Detection
				if (
					newHead.x < 0 ||
					newHead.x >= GRID_SIZE ||
					newHead.y < 0 ||
					newHead.y >= GRID_SIZE ||
					currentSnake.some((s) => s.x === newHead.x && s.y === newHead.y)
				) {
					handleGameOver();
					return;
				}

				let newSnake = [newHead, ...currentSnake];

				// 4. Food Check
				if (
					newHead.x === foodRef.current.x &&
					newHead.y === foodRef.current.y
				) {
					// Ate food (Linux logo) - don't remove tail
					scoreRef.current += 10;
					setScore(scoreRef.current);

					// Speed up
					const newSpeed = Math.max(
						MIN_SPEED,
						speedRef.current - SPEED_DECREMENT
					);
					speedRef.current = newSpeed;
					setSpeed(newSpeed);

					// New Food
					const existingItems = malusRef.current ? [malusRef.current] : [];
					const newFoodPos = getRandomPos(newSnake, existingItems);
					foodRef.current = newFoodPos;
					setFood(newFoodPos);

					// Chance to spawn malus after eating
					spawnMalus();
				} else if (
					malusRef.current &&
					newHead.x === malusRef.current.x &&
					newHead.y === malusRef.current.y
				) {
					// Hit malus (Windows logo) - lose points and remove 3 segments
					scoreRef.current = Math.max(0, scoreRef.current - 15);
					setScore(scoreRef.current);

					// Remove malus
					if (malusTimerRef.current) {
						clearTimeout(malusTimerRef.current);
						malusTimerRef.current = null;
					}
					malusRef.current = null;
					setMalus(null);

					// Remove 3 segments from tail (but keep at least 1)
					const segmentsToRemove = Math.min(3, newSnake.length - 1);
					for (let i = 0; i < segmentsToRemove; i++) {
						newSnake.pop();
					}
				} else {
					// Didn't eat - remove tail
					newSnake.pop();
				}

				// 5. Update State
				snakeRef.current = newSnake;
				setSnake([...newSnake]);
			}

			animationFrameRef.current = requestAnimationFrame(runGameTick);
		},
		[handleGameOver, spawnMalus]
	);

	// --- Start Game Loop ---
	useEffect(() => {
		if (gameState === "PLAYING") {
			lastMoveTimeRef.current = performance.now();
			animationFrameRef.current = requestAnimationFrame(runGameTick);
		}
		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, [gameState, runGameTick]);

	// --- Input Handling ---
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (
				["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)
			) {
				e.preventDefault();
			}

			if (gameState === "IDLE" || gameState === "GAME_OVER") {
				if (e.key === "Enter" || e.key === " ") startGame();
				if (e.key === "Escape") onClose();
				return;
			}

			if (gameState === "PLAYING") {
				if (e.key === "Escape" || e.key === "p") {
					setGameState("PAUSED");
					return;
				}

				const currentDir = directionRef.current;
				let newDir = null;

				switch (e.key) {
					case "z":
					case "Z":
					case "w":
					case "W":
					case "ArrowUp":
						if (currentDir.y === 0) newDir = { x: 0, y: -1 };
						break;
					case "s":
					case "S":
					case "ArrowDown":
						if (currentDir.y === 0) newDir = { x: 0, y: 1 };
						break;
					case "q":
					case "Q":
					case "a":
					case "A":
					case "ArrowLeft":
						if (currentDir.x === 0) newDir = { x: -1, y: 0 };
						break;
					case "d":
					case "D":
					case "ArrowRight":
						if (currentDir.x === 0) newDir = { x: 1, y: 0 };
						break;
				}

				if (newDir) {
					nextDirectionRef.current = newDir;
				}
			} else if (gameState === "PAUSED") {
				if (e.key === "Escape" || e.key === "p" || e.key === "Enter") {
					setGameState("PLAYING");
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [gameState, onClose]);

	// --- Start Game ---
	const startGame = () => {
		const initialSnake = [{ x: 10, y: 10 }];
		const initialFood = { x: 15, y: 5 };
		const initialDir = { x: 0, y: -1 };

		setSnake(initialSnake);
		snakeRef.current = initialSnake;

		setFood(initialFood);
		foodRef.current = initialFood;

		setMalus(null);
		malusRef.current = null;
		if (malusTimerRef.current) {
			clearTimeout(malusTimerRef.current);
			malusTimerRef.current = null;
		}

		setDirection(initialDir);
		directionRef.current = initialDir;
		nextDirectionRef.current = initialDir;

		setScore(0);
		scoreRef.current = 0;

		setSpeed(INITIAL_SPEED);
		speedRef.current = INITIAL_SPEED;

		setGameState("PLAYING");
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 z-[60] bg-black flex items-center justify-center overflow-hidden font-mono select-none"
		>
			{/* Background Effects */}
			<div className="absolute inset-0 bg-gradient-radial from-purple-900/20 to-black -z-20" />
			<div className="absolute inset-0 -z-10 opacity-20">
				<div className="w-full h-full absolute bottom-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.3)_1px,transparent_1px)] bg-[size:40px_40px]" />
			</div>

			{/* Main Container */}
			<div className="relative w-full max-w-2xl mx-4 bg-black/80 border-4 border-cyan-500 rounded-xl shadow-[0_0_50px_rgba(6,182,212,0.5)] backdrop-blur-md overflow-hidden flex flex-col">
				{/* HUD */}
				<div className="flex justify-between items-center p-4 border-b border-cyan-500/30 bg-black/60 text-cyan-500 z-10">
					<Button
						variant="ghost"
						size="sm"
						onClick={onClose}
						className="text-red-500 hover:bg-red-500/10"
					>
						<X className="w-5 h-5 mr-2" /> QUIT
					</Button>

					<div className="flex flex-col items-center">
						<span className="text-[10px] uppercase tracking-widest opacity-70">
							High Score
						</span>
						<span className="text-xl font-bold text-yellow-500 flex items-center gap-2">
							<Trophy className="w-4 h-4" /> {highScore}
						</span>
					</div>

					<div className="flex flex-col items-end">
						<span className="text-[10px] uppercase tracking-widest opacity-70">
							Score
						</span>
						<span className="text-3xl font-black text-cyan-500">{score}</span>
					</div>
				</div>

				{/* Game Board */}
				<div className="relative aspect-square max-h-[70vh] m-4 border border-white/10 rounded-lg overflow-hidden bg-black/50">
					{/* Grid Pattern */}
					<div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:5%_5%]" />

					{/* Snake */}
					{snake.map((segment, i) => {
						const isHead = i === 0;
						const isTail = i === snake.length - 1;

						return (
							<div
								key={`${segment.x}-${segment.y}-${i}`}
								className={`absolute transition-all duration-75 ${
									isHead
										? "bg-cyan-300 border-2 border-cyan-100"
										: "bg-cyan-500 border border-cyan-400"
								}`}
								style={{
									left: `${(segment.x / GRID_SIZE) * 100}%`,
									top: `${(segment.y / GRID_SIZE) * 100}%`,
									width: `${100 / GRID_SIZE}%`,
									height: `${100 / GRID_SIZE}%`,
									borderRadius: isHead ? "3px" : isTail ? "2px" : "0",
									boxShadow: isHead
										? "0 0 10px rgba(103, 232, 249, 0.6)"
										: "0 0 5px rgba(6, 182, 212, 0.3)",
									zIndex: isHead ? 10 : 5,
								}}
							>
								{/* Eyes on head */}
								{isHead && (
									<>
										<div
											className="absolute bg-black rounded-full"
											style={{
												width: "25%",
												height: "25%",
												top: "25%",
												left: "20%",
											}}
										/>
										<div
											className="absolute bg-black rounded-full"
											style={{
												width: "25%",
												height: "25%",
												top: "25%",
												right: "20%",
											}}
										/>
									</>
								)}
							</div>
						);
					})}

					{/* Food (Linux Tux) */}
					<div
						className="absolute flex items-center justify-center transition-all duration-200"
						style={{
							left: `${(food.x / GRID_SIZE) * 100}%`,
							top: `${(food.y / GRID_SIZE) * 100}%`,
							width: `${100 / GRID_SIZE}%`,
							height: `${100 / GRID_SIZE}%`,
						}}
					>
						<div className="relative w-full h-full flex items-center justify-center">
							{/* Simple Tux representation */}
							<svg
								viewBox="0 0 24 24"
								className="w-4/5 h-4/5"
								style={{
									filter: "drop-shadow(0 0 4px rgba(34, 197, 94, 0.6))",
								}}
							>
								{/* Body */}
								<ellipse
									cx="12"
									cy="14"
									rx="7"
									ry="8"
									fill="#000000"
								/>
								{/* Belly */}
								<ellipse
									cx="12"
									cy="15"
									rx="4.5"
									ry="6"
									fill="#FFFFFF"
								/>
								{/* Left wing */}
								<ellipse
									cx="6"
									cy="13"
									rx="2"
									ry="4"
									fill="#000000"
									transform="rotate(-20 6 13)"
								/>
								{/* Right wing */}
								<ellipse
									cx="18"
									cy="13"
									rx="2"
									ry="4"
									fill="#000000"
									transform="rotate(20 18 13)"
								/>
								{/* Head */}
								<circle
									cx="12"
									cy="8"
									r="4"
									fill="#000000"
								/>
								{/* Left eye */}
								<ellipse
									cx="10.5"
									cy="7.5"
									rx="1.2"
									ry="1.5"
									fill="#FFFFFF"
								/>
								<circle
									cx="10.7"
									cy="7.8"
									r="0.6"
									fill="#000000"
								/>
								{/* Right eye */}
								<ellipse
									cx="13.5"
									cy="7.5"
									rx="1.2"
									ry="1.5"
									fill="#FFFFFF"
								/>
								<circle
									cx="13.3"
									cy="7.8"
									r="0.6"
									fill="#000000"
								/>
								{/* Beak */}
								<ellipse
									cx="12"
									cy="9.5"
									rx="1"
									ry="1.2"
									fill="#FFA500"
								/>
								{/* Feet */}
								<ellipse
									cx="10"
									cy="22"
									rx="1.5"
									ry="0.8"
									fill="#FFA500"
								/>
								<ellipse
									cx="14"
									cy="22"
									rx="1.5"
									ry="0.8"
									fill="#FFA500"
								/>
							</svg>
							<div className="absolute inset-0 bg-green-500 rounded-full opacity-20 blur-md animate-pulse" />
						</div>
					</div>

					{/* Malus (Windows logo) */}
					{malus && (
						<motion.div
							initial={{ scale: 0, rotate: -180 }}
							animate={{ scale: 1, rotate: 0 }}
							exit={{ scale: 0 }}
							className="absolute flex items-center justify-center"
							style={{
								left: `${(malus.x / GRID_SIZE) * 100}%`,
								top: `${(malus.y / GRID_SIZE) * 100}%`,
								width: `${100 / GRID_SIZE}%`,
								height: `${100 / GRID_SIZE}%`,
							}}
						>
							<div className="relative w-4/5 h-4/5 grid grid-cols-2 grid-rows-2 gap-0.5 p-1">
								{/* Windows 4-pane logo */}
								<div className="bg-red-500 rounded-tl" />
								<div className="bg-green-500 rounded-tr" />
								<div className="bg-blue-500 rounded-bl" />
								<div className="bg-yellow-500 rounded-br" />
							</div>
							<div className="absolute inset-0 bg-red-500 rounded-sm opacity-20 blur-sm animate-pulse" />
						</motion.div>
					)}

					{/* Overlays */}
					<AnimatePresence>
						{gameState === "IDLE" && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="absolute inset-0 z-20 bg-black/80 flex flex-col items-center justify-center text-center p-8"
							>
								<h2 className="text-4xl font-black text-cyan-500 mb-4 tracking-tighter">
									SNAKE.EXE
								</h2>
								<p className="text-gray-400 mb-8 font-mono text-sm">
									USE ARROW KEYS TO MOVE
								</p>
								<Button
									onClick={startGame}
									variant="primary"
									size="lg"
									className="text-xl px-8 py-6 animate-pulse"
								>
									<Play className="w-6 h-6 mr-2" /> START SYSTEM
								</Button>
							</motion.div>
						)}

						{gameState === "GAME_OVER" && (
							<motion.div
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0 }}
								className="absolute inset-0 z-20 bg-black/90 flex flex-col items-center justify-center text-center p-8"
							>
								<h2 className="text-5xl font-black text-red-500 mb-2">
									CRITICAL ERROR
								</h2>
								<p className="text-gray-300 mb-8">
									SYSTEM CRASHED. SCORE: {score}
								</p>
								<div className="flex gap-4">
									<Button
										onClick={startGame}
										variant="primary"
										className="bg-cyan-500 text-black border-none hover:bg-cyan-400"
									>
										<RefreshCw className="w-5 h-5 mr-2" /> REBOOT
									</Button>
									<Button
										onClick={onClose}
										variant="outline"
										className="border-red-500 text-red-500 hover:bg-red-500/10"
									>
										EXIT
									</Button>
								</div>
							</motion.div>
						)}

						{gameState === "PAUSED" && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center"
							>
								<h2 className="text-3xl font-bold text-white mb-4">
									SYSTEM PAUSED
								</h2>
								<Button
									onClick={() => setGameState("PLAYING")}
									variant="outline"
								>
									<Play className="w-4 h-4 mr-2" /> RESUME
								</Button>
							</motion.div>
						)}
					</AnimatePresence>
				</div>

				{/* Scanlines Overlay */}
				<div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_2px] z-50 opacity-20" />
			</div>
		</motion.div>
	);
}

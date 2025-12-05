"use client";

import { forwardRef } from "react";
import { Icons } from "@/components/icons/Icons";
import { CategoryRadar } from "./CategoryRadar";
import { clsx } from "clsx";
import QRCode from "react-qr-code";

export const IdCard = forwardRef(
	({ results, username = "Résistant Anonyme", theme = "retro" }, ref) => {
		const { global, categories } = results || { global: 0, categories: {} };

		const getRank = (s) => {
			if (s < 25) return "NOVICE";
			if (s < 50) return "APPRENTI";
			if (s < 80) return "VILLAGEOIS";
			return "HÉROS";
		};

		// Theme Styles Configuration
		const themeStyles = {
			retro: {
				container:
					"bg-black border-4 border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.4)]",
				bgTexture:
					"bg-[linear-gradient(45deg,rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(-45deg,rgba(234,179,8,0.1)_1px,transparent_1px)] bg-[size:20px_20px]",
				textPrimary: "text-cyan-500",
				textSecondary: "text-yellow-500",
				textMuted: "text-cyan-500/60",
				accent: "bg-cyan-500",
				fontMono: "font-mono",
				fontSans: "font-sans",
				badge:
					"border-cyan-500 text-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]",
			},
			dark: {
				container: "bg-zinc-900 border border-green-500/50 shadow-2xl",
				bgTexture:
					"bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.1)_0%,transparent_70%)]",
				textPrimary: "text-green-500",
				textSecondary: "text-white",
				textMuted: "text-green-500/60",
				accent: "bg-green-500",
				fontMono: "font-mono",
				fontSans: "font-mono", // Matrix style
				badge: "border-green-500 text-green-500 bg-green-500/10",
			},
			light: {
				container: "bg-white border border-gray-200 shadow-xl",
				bgTexture: "bg-gray-50",
				textPrimary: "text-blue-600",
				textSecondary: "text-gray-900",
				textMuted: "text-gray-500",
				accent: "bg-blue-600",
				fontMono: "font-mono",
				fontSans: "font-sans",
				badge: "border-blue-200 text-blue-600 bg-blue-50",
			},
		};

		const t = themeStyles[theme] || themeStyles.retro;

		return (
			<div
				ref={ref}
				className={clsx(
					"w-[600px] h-[350px] rounded-xl relative overflow-hidden flex",
					t.container
				)}
			>
				{/* Background Texture */}
				<div className={clsx("absolute inset-0 opacity-30", t.bgTexture)} />

				{/* Left Side: Identity */}
				<div className="w-[220px] p-6 flex flex-col justify-between relative z-10 border-r border-white/10 bg-black/5">
					<div className="space-y-4">
						{/* Avatar Placeholder */}
						<div
							className={clsx(
								"w-24 h-24 mx-auto rounded-full border-2 flex items-center justify-center overflow-hidden bg-black/20",
								theme === "retro"
									? "border-cyan-500"
									: theme === "dark"
									? "border-green-500"
									: "border-blue-200"
							)}
						>
							<Icons.Penguin className={clsx("w-14 h-14", t.textPrimary)} />
						</div>

						<div className="text-center">
							<div
								className={clsx(
									"text-[10px] uppercase tracking-widest mb-1",
									t.textMuted
								)}
							>
								Agent
							</div>
							<h2
								className={clsx(
									"text-xl font-bold truncate px-2",
									t.textSecondary,
									t.fontSans
								)}
							>
								{username}
							</h2>
						</div>
					</div>

					<div className="text-center space-y-2">
						<div
							className={clsx(
								"inline-block px-3 py-1 rounded border text-xs font-bold tracking-wider",
								t.badge
							)}
						>
							{getRank(global)}
						</div>
						<div
							className={clsx("text-4xl font-black", t.textPrimary, t.fontMono)}
						>
							{global}%
						</div>
						<div className={clsx("text-[10px]", t.textMuted)}>SCORE GLOBAL</div>
					</div>
				</div>

				{/* Right Side: Radar & Stats */}
				<div className="flex-1 p-6 flex flex-col relative z-10">
					<div className="flex justify-between items-start mb-4">
						<h3
							className={clsx(
								"text-sm uppercase tracking-widest font-bold",
								t.textMuted
							)}
						>
							Profil de Résistance
						</h3>
						<Icons.Shield
							className={clsx("w-6 h-6 opacity-50", t.textPrimary)}
						/>
					</div>

					<div className="flex-1 flex items-center justify-center -ml-4 max-h-[200px]">
						<CategoryRadar
							scores={categories}
							theme={theme}
							className="w-full h-full"
						/>
					</div>

					<div className="flex justify-between items-end mt-2">
						<div className={clsx("text-[10px] max-w-[200px]", t.textMuted)}>
							Certifié conforme Nuit de l'Info 2025.
							<br />
							Empreinte générée le {new Date().toLocaleDateString()}.
						</div>

						{/* QR Code */}
						<div className="bg-white p-1 rounded-sm">
							<QRCode
								value="https://nuit-info-2025.speakzy.fr/test"
								size={40}
								style={{ height: "auto", maxWidth: "100%", width: "100%" }}
								viewBox={`0 0 256 256`}
							/>
						</div>
					</div>
				</div>

				{/* Holographic Overlay (Retro only) */}
				{theme === "retro" && (
					<div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none mix-blend-overlay" />
				)}
			</div>
		);
	}
);

IdCard.displayName = "IdCard";

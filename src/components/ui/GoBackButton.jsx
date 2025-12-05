"use client";

import { useRouter } from "next/navigation";
import { Button } from "./Button";
import { motion } from "framer-motion";

export function GoBackButton({ className = "", href }) {
	const router = useRouter();

	const handleBack = () => {
		if (href) {
			router.push(href);
		} else {
			router.back();
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, x: -20 }}
			animate={{ opacity: 1, x: 0 }}
			className={`absolute top-4 left-4 z-50 ${className}`}
		>
			<Button
				variant="ghost"
				size="sm"
				onClick={handleBack}
				className="flex items-center gap-2 text-nird-light/60 hover:text-nird-gold"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="m12 19-7-7 7-7" />
					<path d="M19 12H5" />
				</svg>
				<span>Retour</span>
			</Button>
		</motion.div>
	);
}

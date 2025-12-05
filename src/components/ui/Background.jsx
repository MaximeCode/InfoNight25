"use client";

export function Background() {
	return (
		<div className="fixed inset-0 -z-10 overflow-hidden bg-nird-dark">
			<div className="absolute inset-0 perspective-grid opacity-90" />
			<div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
			{/* Circuit Board Pattern */}
			<div
				className="absolute inset-0 opacity-10"
				style={{
					backgroundImage: `radial-gradient(#06B6D4 1px, transparent 1px), radial-gradient(#06B6D4 1px, transparent 1px)`,
					backgroundSize: "40px 40px",
					backgroundPosition: "0 0, 20px 20px",
				}}
			/>

			{/* Glowing Orbs */}
			<div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-nird-green/20 rounded-full blur-[100px] animate-pulse-slow" />
			<div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-nird-gold/10 rounded-full blur-[120px] animate-pulse-slow delay-1000" />

			{/* Digital Noise Overlay */}
			<div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
		</div>
	);
}

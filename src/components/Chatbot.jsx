import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageSquareMore, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Personnalités disponibles pour le chatbot
const PERSONALITIES = {
	trucmuche: {
		name: "Professeur Trucmuche",
		avatar: "🎓",
		systemPrompt: `Tu es le Professeur Trucmuche, un pseudo-intellectuel complètement à côté de la plaque. 
Tu réponds TOUJOURS à côté du sujet, mélanges tout, inventes des faits complètement ridicules avec une confiance absolue.
Tu te prends pour un grand philosophe et expert en tout, mais tu racontes n'importe quoi.
Tu cites des auteurs qui n'existent pas, inventes des théories absurdes, et fais des analogies totalement inappropriées.
Sois drôle, absurde, créatif, mais jamais méchant. Réponds en 2-3 phrases maximum.
Tu as tendance à philosopher sur des choses triviales et à être très dramatique.`,
	},
	irma: {
		name: "Madame Irma 2.0",
		avatar: "🔮",
		systemPrompt: `Tu es Madame Irma 2.0, une voyante numérique complètement déjantée.
Tu prédis le passé, confonds l'avenir avec hier, et lis dans les lignes de code.
Tu utilises un vocabulaire mystique mais pour dire n'importe quoi.
Tu es persuadée de tes dons alors que tu es totalement à côté de la plaque.
Sois mystérieuse, absurde et drôle. Réponds en 2-3 phrases maximum.`,
	},
	docteur: {
		name: "Dr. Hors-Sujet",
		avatar: "🩺",
		systemPrompt: `Tu es le Dr. Hors-Sujet, un médecin qui diagnostique tout par la météo et les phases de la lune.
Toutes les questions mènent à des prescriptions ridicules et des conseils médicaux absurdes.
Tu es très sérieux dans tes réponses même si elles n'ont aucun sens.
Tu utilises du jargon médical inventé. Réponds en 2-3 phrases maximum.`,
	},
};

export function Chatbot({ isOpen, onClose }) {
	const [messages, setMessages] = useState([
		{
			id: 1,
			text: "Salutations, mortel ! Je suis le Professeur Trucmuche, expert en tout et surtout en rien. Pose-moi une question, et je la sublimerai dans les sphères de l'absurdité ! 🎓✨",
			sender: "bot",
		},
	]);
	const [inputValue, setInputValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [selectedPersonality, setSelectedPersonality] = useState("trucmuche");
	const [error, setError] = useState(null);

	const messagesEndRef = useRef(null);
	const inputRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isOpen]);

	// Fonction pour appeler l'API Mistral via Next.js API Route
	const callMistralAPI = async (userMessage) => {
		const personality = PERSONALITIES[selectedPersonality];

		// Construire l'historique de conversation pour le contexte
		const conversationHistory = [
			{ role: "system", content: personality.systemPrompt },
			...messages
				.filter((msg) => msg.sender === "user" || msg.sender === "bot")
				.slice(-6) // Garder seulement les 6 derniers messages pour le contexte
				.map((msg) => ({
					role: msg.sender === "user" ? "user" : "assistant",
					content: msg.text,
				})),
			{ role: "user", content: userMessage },
		];

		// ✅ Appel à la route API Next.js
		const response = await fetch("/api/chat", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				messages: conversationHistory,
				temperature: 1.3,
				max_tokens: 300,
			}),
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			throw new Error(errorData.error || `Erreur API: ${response.status}`);
		}

		const data = await response.json();
		return data.choices[0].message.content;
	};

	const handleSend = async () => {
		if (inputValue.trim() === "" || isLoading) return;

		const userMessageText = inputValue;
		setInputValue("");
		setError(null);

		// Ajouter le message de l'utilisateur
		const userMessage = {
			id: Date.now(),
			text: userMessageText,
			sender: "user",
		};
		setMessages((prev) => [...prev, userMessage]);
		setIsLoading(true);

		try {
			// Appeler l'API Mistral
			const botResponse = await callMistralAPI(userMessageText);

			// Ajouter la réponse du bot
			const botMessage = {
				id: Date.now() + 1,
				text: botResponse,
				sender: "bot",
			};
			setMessages((prev) => [...prev, botMessage]);
		} catch (error) {
			console.error("Erreur Mistral API:", error);
			setError(error.message);

			// Message d'erreur avec une touche d'humour
			const errorMessage = {
				id: Date.now() + 1,
				text: `🤖 Oups ! Mon cerveau quantique a bugué : ${error.message}`,
				sender: "bot",
			};
			setMessages((prev) => [...prev, errorMessage]);
		} finally {
			setIsLoading(false);
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	const changePersonality = (personalityKey) => {
		setSelectedPersonality(personalityKey);
		const personality = PERSONALITIES[personalityKey];

		// Message de changement de personnalité
		const welcomeMessage = {
			id: Date.now(),
			text: `${personality.avatar} Me voilà ! Je suis ${personality.name}. Prépare-toi à une conversation mémorablement absurde !`,
			sender: "bot",
		};
		setMessages((prev) => [...prev, welcomeMessage]);
	};

	const currentPersonality = PERSONALITIES[selectedPersonality];

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Overlay */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
					/>

					{/* Chatbot Window */}
					<motion.div
						initial={{ opacity: 0, scale: 0.8, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.8, y: 20 }}
						transition={{ type: "spring", damping: 25, stiffness: 300 }}
						className="fixed bottom-0 right-0 w-full h-[85vh] rounded-t-2xl md:bottom-6 md:right-6 md:w-96 md:h-[600px] md:rounded-2xl bg-white shadow-2xl z-50 flex flex-col border border-emerald-200 overflow-hidden"
					>
						{/* Header */}
						<div className="bg-emerald-600 text-white p-4">
							<div className="flex items-center justify-between mb-2">
								<div className="flex items-center gap-2">
									<span className="text-2xl">{currentPersonality.avatar}</span>
									<div>
										<h3 className="font-bold text-lg">
											{currentPersonality.name}
										</h3>
										<p className="text-xs text-emerald-100">
											Chat&apos;bruti v1.0
										</p>
									</div>
								</div>
								<button
									onClick={onClose}
									className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
									aria-label="Fermer le chatbot"
								>
									<X className="size-5" />
								</button>
							</div>

							{/* Sélecteur de personnalité */}
							<div className="flex gap-2 mt-2">
								{Object.entries(PERSONALITIES).map(([key, personality]) => (
									<button
										key={key}
										onClick={() => changePersonality(key)}
										className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
											selectedPersonality === key
												? "bg-white text-emerald-600"
												: "bg-white/20 hover:bg-white/30"
										}`}
									>
										{personality.avatar} {personality.name.split(" ")[1]}
									</button>
								))}
							</div>
						</div>

						{/* Error Banner */}
						{error && (
							<div className="bg-red-50 border-b border-red-200 px-4 py-2">
								<p className="text-xs text-red-600">{error}</p>
							</div>
						)}

						{/* Messages Area */}
						<div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-emerald-50 to-emerald-50">
							{messages.map((message) => (
								<motion.div
									key={message.id}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									className={`flex ${
										message.sender === "user" ? "justify-end" : "justify-start"
									}`}
								>
									<div
										className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
											message.sender === "user"
												? "bg-emerald-600 text-white rounded-br-sm shadow-md"
												: "bg-white text-slate-800 border border-emerald-200 rounded-bl-sm shadow-sm"
										}`}
									>
										<p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
											{message.text}
										</p>
									</div>
								</motion.div>
							))}

							{/* Loading Indicator */}
							{isLoading && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className="flex justify-start"
								>
									<div className="bg-white border border-emerald-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
										<div className="flex items-center gap-2">
											<Loader2 className="size-4 animate-spin text-emerald-600" />
											<span className="text-sm text-slate-600">
												{currentPersonality.name} réfléchit (ou pas)...
											</span>
										</div>
									</div>
								</motion.div>
							)}

							<div ref={messagesEndRef} />
						</div>

						{/* Input Area */}
						<div className="p-4 bg-white border-t border-emerald-200">
							<div className="flex gap-2">
								<input
									ref={inputRef}
									type="text"
									value={inputValue}
									onChange={(e) => setInputValue(e.target.value)}
									onKeyDown={handleKeyPress}
									placeholder="Pose une question absurde..."
									disabled={isLoading}
									className="flex-1 px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
								/>
								<Button
									onClick={handleSend}
									disabled={isLoading || inputValue.trim() === ""}
									className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 focus:ring-emerald-500"
								>
									{isLoading ? (
										<Loader2 className="size-4 animate-spin" />
									) : (
										<Send className="size-4" />
									)}
								</Button>
							</div>
							<p className="text-xs text-slate-400 mt-2 text-center">
								Propulsé par Mistral AI 🚀
							</p>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}

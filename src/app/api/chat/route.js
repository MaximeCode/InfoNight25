import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { messages, temperature, max_tokens } = await request.json();

    // Récupérer la clé API depuis les variables d'environnement
    const API_KEY = process.env.MISTRAL_API_KEY;

    if (!API_KEY) {
      return NextResponse.json(
        { error: "Clé API Mistral non configurée" },
        { status: 500 }
      );
    }

    // Appel à l'API Mistral
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages,
        temperature: temperature || 1.3,
        max_tokens: max_tokens || 300,
        top_p: 0.95,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.message || "Erreur API Mistral" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erreur API:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

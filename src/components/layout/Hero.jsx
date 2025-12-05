"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/icons/Icons";
import Link from "next/link";
import { Sprout, Shield, Users, Bold, PlayCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { MessageSquareMore } from "lucide-react";
import { Chatbot } from "@/components/Chatbot";

export function Hero() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  return (
    <>
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm">
            <Shield className="size-4" />
            <span>Construire la Résilience Numérique</span>
          </div>

          <h1 className="text-5xl text-emerald-950">
            Le Village Numérique Résistant
          </h1>

          <p className="text-xl text-slate-600">
            Comment les écoles peuvent-elles résister aux géants de la
            technologie ?
          </p>

          <div className="text-slate-600 max-w-2xl mx-auto">
            <p>
              À une époque de domination numérique par les Big Tech, les
              établissements d&apos;enseignement ont le pouvoir de créer des
              écosystèmes technologiques durables, inclusifs et responsables.
            </p>
            <p className="font-bold mt-4">
              Êtes-vous prêt à devenir un héros du numérique ?
            </p>
          </div>

          <div className="flex gap-4 justify-center pt-4">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">
              <Link href="/test">Commencer le test</Link>
            </Button>
            {/* <Button
              variant="outline"
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
            >
              En Savoir Plus
            </Button> */}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8 transition-all duration-300">
          <Card className="p-6 border-emerald-200 bg-white hover:shadow-lg transition-all hover:scale-105 hover:border-emerald-600">
            <div className="size-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
              <Users className="size-6 text-emerald-600" />
            </div>
            <h3 className="text-emerald-900 mb-2">Inclusif</h3>
            <p className="text-slate-600 text-sm">
              Une technologie qui donne du pouvoir à tous les élèves, éducateurs
              et communautés, indépendamment de leur origine ou de leurs
              ressources.
            </p>
          </Card>

          <Card className="p-6 border-emerald-200 bg-white hover:shadow-lg transition-all hover:scale-105 hover:border-emerald-600">
            <div className="size-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
              <Shield className="size-6 text-emerald-600" />
            </div>
            <h3 className="text-emerald-900 mb-2">Responsable</h3>
            <p className="text-slate-600 text-sm">
              Des pratiques éthiques qui protègent la vie privée, les données et
              le bien-être numérique des élèves dans les environnements
              éducatifs.
            </p>
          </Card>

          <Card className="p-6 border-emerald-200 bg-white hover:shadow-lg transition-all hover:scale-105 hover:border-emerald-600">
            <div className="size-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
              <Sprout className="size-6 text-emerald-600" />
            </div>
            <h3 className="text-emerald-900 mb-2">Durable</h3>
            <p className="text-slate-600 text-sm">
              Des solutions à long terme qui respectent l&apos;écologie
              numérique et minimisent l&apos;impact environnemental et social.
            </p>
          </Card>
        </div>
      </section>

      {/* ChatBot */}
      <section className="text-center mx-auto w-3/4 px-6 py-16">
        <h2
          className="text-3xl font-bold text-emerald-900 mb-4 inline-flex items-center justify-center gap-3"
          title="Défi #1 - Chat'bruti"
        >
          ChatBot <MessageSquareMore />
        </h2>
        <div className="text-slate-600 text-sm mb-4">
          <p>
            ChatBot est un assistant virtuel qui peut répondre à vos questions
            et vous aider à devenir un héros du numérique.
          </p>
          <p className="font-bold">
            Sachez qu&apos;il sera toujours là en cas de besoin ! 😉
          </p>
        </div>
        <div className="flex justify-center">
          <Button
            onClick={() => setIsChatbotOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8"
          >
            J&apos;ai besoin de précieux conseils 🙏
          </Button>
        </div>
      </section>

      {/* Chatbot Component */}
      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </>
  );
}

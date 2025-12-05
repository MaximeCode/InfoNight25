"use client"

// import { Background } from "@/components/ui/Background";
import { Hero } from "@/components/layout/Hero";
import { useState } from "react";
import CursorChallenge from "@/components/game/CursorChallenge";

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <main className="min-h-screen relative">
      {!unlocked ? (
        <CursorChallenge onUnlock={() => setUnlocked(true)} />
      ) : (
        <>
          {/* <Background /> */}
          <Hero />
        </>
      )}
    </main>
  );
}

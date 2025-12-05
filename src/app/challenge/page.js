"use client";

import { useState } from "react";
import CursorChallenge from "@/components/game/CursorChallenge";
import { Button } from "@/components/ui/Button";

export default function ChallengePage() {
    const [unlocked, setUnlocked] = useState(false);

    return (
        <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
            {!unlocked ? (
                <CursorChallenge onUnlock={() => setUnlocked(true)} />
            ) : (
                <div className="text-center space-y-6 animate-in fade-in duration-1000">
                    <h1 className="text-4xl font-bold text-green-500">ACCESS GRANTED</h1>
                    <div className="p-8 border border-green-500/30 rounded-xl bg-green-500/5">
                        <p className="text-white mb-4">You have proven your worth, pilot.</p>
                        <input
                            type="text"
                            placeholder="Enter Secret Code..."
                            className="w-full bg-black border border-green-500 p-3 text-green-500 font-mono focus:outline-none focus:ring-2 ring-green-500/50"
                        />
                    </div>
                    <Button onClick={() => window.location.reload()}>LOCK SYSTEM</Button>
                </div>
            )}
        </main>
    );
}

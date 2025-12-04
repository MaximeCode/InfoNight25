"use client";

import { forwardRef } from "react";
import { Icons } from "@/components/icons/Icons";
// import { QRCodeSVG } from "qrcode.react"; // Removed to fix build error

export const IdCard = forwardRef(({ score, username = "Résistant Anonyme" }, ref) => {
  const getRank = (s) => {
    if (s < 25) return "NOVICE";
    if (s < 50) return "APPRENTI";
    if (s < 80) return "VILLAGEOIS";
    return "HÉROS";
  };

  return (
    <div
      ref={ref}
      className="w-[400px] h-[250px] bg-nird-dark rounded-xl border-4 border-nird-gold relative overflow-hidden flex shadow-2xl"
    >
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')]" />
      
      {/* Left Side: Photo & Rank */}
      <div className="w-1/3 bg-nird-brown/20 border-r border-nird-gold/30 p-4 flex flex-col items-center justify-center gap-4 relative z-10">
        <div className="w-20 h-20 bg-nird-gold/20 rounded-full border-2 border-nird-gold flex items-center justify-center">
          <Icons.Penguin className="w-12 h-12 text-nird-gold" />
        </div>
        <div className="text-center">
          <div className="text-xs text-nird-light/60 uppercase tracking-widest">Rang</div>
          <div className="text-lg font-bold text-nird-gold font-mono">{getRank(score)}</div>
        </div>
      </div>

      {/* Right Side: Info */}
      <div className="flex-1 p-4 flex flex-col justify-between relative z-10">
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xs text-nird-light/60 uppercase">Nom de code</h3>
              <h2 className="text-xl font-bold text-white font-sans">{username}</h2>
            </div>
            <Icons.Shield className="w-8 h-8 text-nird-green opacity-50" />
          </div>
          
          <div className="mt-4">
            <h3 className="text-xs text-nird-light/60 uppercase">Score de Résistance</h3>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-black text-nird-neon font-mono">{score}%</span>
              <div className="h-2 flex-1 bg-nird-dark/50 rounded-full mb-2 overflow-hidden border border-white/10">
                <div 
                  className="h-full bg-nird-neon" 
                  style={{ width: `${score}%` }} 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="text-[10px] text-nird-light/40 max-w-[150px]">
            Certifié conforme aux valeurs du Numérique Responsable.
            <br />
            Nuit de l'Info 2025
          </div>
          {/* QR Code Placeholder */}
          <div className="w-12 h-12 bg-white p-1">
             <div className="w-full h-full bg-black opacity-20" />
          </div>
        </div>
      </div>

      {/* Holographic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
    </div>
  );
});

IdCard.displayName = "IdCard";

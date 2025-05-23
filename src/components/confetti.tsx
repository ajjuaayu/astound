'use client';

import React, { useEffect, useState } from 'react';

const ConfettiPiece: React.FC<{ style: React.CSSProperties }> = ({ style }) => {
  return <div className="fixed rounded-full w-2 h-2 opacity-70" style={style} />;
};

const colors = [
  'hsl(var(--primary))', // Fuchsia
  'hsl(var(--accent))',   // Cyan
  '#FFD700', // Gold
  '#FFC0CB', // Pink
];

export default function Confetti() {
  const [pieces, setPieces] = useState<Array<{ id: number; style: React.CSSProperties }>>([]);

  useEffect(() => {
    const generatePieces = () => {
      const newPieces = Array.from({ length: 50 }).map((_, i) => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 8 + 4; // size between 4px and 12px
        return {
          id: i + Date.now(),
          style: {
            left: `${Math.random() * 100}%`,
            top: `${-20 - Math.random() * 100}px`, // Start above the screen
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: randomColor,
            transform: `rotate(${Math.random() * 360}deg)`,
            animation: `fall ${5 + Math.random() * 5}s linear ${Math.random() * 2}s infinite`,
          },
        };
      });
      setPieces(newPieces);
    };

    generatePieces();

    const styleSheet = document.styleSheets[0];
    try {
      styleSheet.insertRule(`
        @keyframes fall {
          0% { transform: translateY(0vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `, styleSheet.cssRules.length);
    } catch (e) {
      console.warn("Could not insert confetti keyframe animation:", e);
    }
    

    // Cleanup function to remove the CSS rule if the component unmounts
    // This is more complex as CSSStyleSheet.deleteRule requires an index
    // For simplicity in this example, we'll skip dynamic rule deletion
    // In a real app, manage this more robustly or use a CSS-in-JS solution

  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {pieces.map(piece => (
        <ConfettiPiece key={piece.id} style={piece.style} />
      ))}
    </div>
  );
}

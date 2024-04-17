 import confetti from "canvas-confetti";

      
 const count = 200;
 const defaults = {
   origin: { y: 0.7 },
 };
export function fire(particleRatio: number, opts: confetti.Options | undefined) {
    confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
  });
}
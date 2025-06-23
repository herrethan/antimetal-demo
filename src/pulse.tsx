import { cn } from "./lib/utils";
import mask1 from "/mask-1.png";
import mask10 from "/mask-10.png";
import mask11 from "/mask-11.png";
import mask12 from "/mask-12.png";
import mask13 from "/mask-13.png";
import mask2 from "/mask-2.png";
import mask3 from "/mask-3.png";
import mask3a from "/mask-3a.png";
import mask4 from "/mask-4.png";
import mask5 from "/mask-5.png";
import mask6 from "/mask-6.png";
import mask7 from "/mask-7.png";
import mask8 from "/mask-8.png";
import mask9 from "/mask-9.png";

type PulseProps = {
  mask: string;
  animation?: string;
  duration?: string;
  delay?: string;
  left?: number;
  top?: number;
};

// both spin-right and spin-left start at 12 o'clock (0deg)
// they both have tails that trail off transparently
export const PULSES: PulseProps[] = [
  {
    mask: mask1,
    animation: "pulse-spin-left",
    duration: "9s",
    delay: "1s",
  },
  {
    mask: mask2,
    animation: "pulse-spin-left",
    duration: "5s",
    top: -240,
    left: -160,
  },
  {
    mask: mask3,
    animation: "pulse-spin-left",
    duration: "9s",
    delay: "1s",
    top: 80,
  },
  {
    mask: mask3a,
    animation: "pulse-spin-left",
    duration: "7s",
    delay: "3s",
  },
  {
    mask: mask4,
    animation: "pulse-spin-right",
    duration: "6s",
    top: -160,
    left: -80,
  },
  {
    mask: mask5,
    animation: "pulse-spin-left",
    duration: "9s",
    delay: "3s",
    left: 160,
    top: -160,
  },
  {
    mask: mask6,
    animation: "pulse-spin-left",
    duration: "9s",
    delay: "4s",
    top: 160,
    left: -80,
  },
  {
    mask: mask7,
    animation: "pulse-spin-right",
    duration: "7s",
    delay: "5s",
  },
  {
    mask: mask8,
    animation: "pulse-spin-right",
    duration: "5s",
    delay: "3s",
    top: -240,
    left: 400,
  },
  {
    mask: mask9,
    animation: "pulse-spin-right",
    duration: "5s",
    delay: "5s",
    top: -160,
    left: 160,
  },
  {
    mask: mask10,
    animation: "pulse-spin-right",
    duration: "8s",
    delay: "7s",
    left: 200,
    top: -160,
  },
  {
    mask: mask11,
    animation: "pulse-spin-right",
    duration: "5s",
    delay: "1s",
    left: 80,
    top: -160,
  },
  {
    mask: mask12,
    animation: "pulse-spin-right",
    duration: "9s",
    left: 120,
    top: 320,
  },
  {
    mask: mask13,
    animation: "pulse-spin-right",
    duration: "6s",
    top: 80,
    left: 80,
  },
];

export function Pulse({
  mask,
  animation = "pulse-spin-left",
  duration = "10s",
  delay = "0s",
  left = 0,
  top = 0,
}: PulseProps) {
  return (
    <div
      className={cn(`masker`)}
      style={
        {
          "--mask-image": `url(${mask})`,
          "--animation-duration": duration,
          "--animation-delay": delay,
        } as React.CSSProperties
      }
    >
      <div
        className="absolute w-full h-full"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, ${
            animation === "pulse-spin-left"
              ? `var(--pulse-color), transparent 30deg`
              : `transparent 330deg, var(--pulse-color)`
          }`,
          animation: `${animation} var(--animation-duration) linear infinite var(--animation-delay)`,
          top,
          left,
        }}
      ></div>
    </div>
  );
}

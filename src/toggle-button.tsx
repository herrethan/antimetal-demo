import * as motion from "motion/react-client";
import { cn } from "./lib/utils";

export function ToggleButton({
  className,
  on = false,
  children,
  onChange,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  on?: boolean;
  onChange?: (on: boolean) => void;
}) {
  return (
    <div
      className={cn(
        "hero-button group relative flex items-center inset-shadow-sm w-24 rounded-lg bg-gray-800 dark:bg-white/5 text-gray-100 p-0.5",
        on ? "justify-end" : "justify-start",
        className
      )}
      {...props}
    >
      <div className="absolute w-full left-0 top-0 bottom-0 flex items-center justify-between px-3">
        {children}
      </div>
      <motion.button
        onClick={() => onChange?.(!on)}
        layout
        transition={{
          type: "spring",
          visualDuration: 0.2,
          bounce: 0.4,
        }}
        className="toggle-handle active:scale-98 active:translate-y-[1px] hero-button-arrows relative flex items-center rounded-sm w-12 h-10 moving-arrows"
      >
        <div
          className={cn(
            "moving-arrows-item relative -top-1.5 transition-transform"
          )}
        >
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </motion.button>
    </div>
  );
}

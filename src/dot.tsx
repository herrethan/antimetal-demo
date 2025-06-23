import { cn } from "./lib/utils";

export function Dot({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "absolute bg-background rounded-full w-7 h-7 border-4 border-background -translate-x-1/2 -translate-y-1/2",
        className
      )}
      {...props}
    >
      <div
        className="bg-white/95 dark:bg-gray-800/20 dark:inset-shadow-xs dark:inset-shadow-white/10 dark:shadow-sm dark:shadow-black z-10 absolute inset-1 rounded-full"
        style={{
          filter: `drop-shadow(0px 1px 1px color(display-p3 .1137 .2431 .4784 / .08)) drop-shadow(0px 2px 2px color(display-p3 .1137 .2431 .4784 / .08))`,
        }}
      ></div>
    </div>
  );
}

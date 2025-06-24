import * as motion from "motion/react-client";
import { useEffect, useMemo, useState } from "react";
import { AnomalyChart, NormalChart, OnFireChart } from "./carts";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import { cn } from "./lib/utils";
import logo1 from "/logos/1.png";
import logo10 from "/logos/10.png";
import logo2 from "/logos/2.png";
import logo3 from "/logos/3.png";
import logo4 from "/logos/4.png";
import logo5 from "/logos/5.png";
import logo6 from "/logos/6.png";
import logo7 from "/logos/7.png";
import logo8 from "/logos/8.png";
import logo9 from "/logos/9.png";

type Connection = {
  logo: string;
  top?: number;
  left?: number;
  status?: "green" | "red" | "yellow" | "off";
};

export const CONNECTIONS_GREEN: Connection[] = [
  { logo: logo1, top: 80, left: 80 * 5, status: "green" },
  { logo: logo2, top: 80 * 3, left: 80 * 5, status: "green" },
  { logo: logo3, top: 80 * 3, left: 80 * 3, status: "green" },
  { logo: logo4, top: 80 * 5, left: 80 * 3, status: "green" },
  { logo: logo5, top: 80 * 3, left: 80 * 7, status: "green" },
  { logo: logo6, top: 80 * 5, left: 80 * 7, status: "green" },
  { logo: logo7, top: 80 * 5, left: 80, status: "green" },
  { logo: logo8, top: 80 * 7, left: 80, status: "green" },
  { logo: logo9, top: 80 * 5, left: 80 * 9, status: "green" },
  { logo: logo10, top: 80 * 7, left: 80 * 9, status: "green" },
];

export const CONNECTIONS_ALERT: Connection[] = [
  { logo: logo1, top: 80, left: 80 * 5, status: "green" },
  { logo: logo2, top: 80 * 3, left: 80 * 5, status: "yellow" },
  { logo: logo3, top: 80 * 3, left: 80 * 3, status: "yellow" },
  { logo: logo4, top: 80 * 5, left: 80 * 3 },
  { logo: logo5, top: 80 * 3, left: 80 * 7, status: "red" },
  { logo: logo6, top: 80 * 5, left: 80 * 7, status: "green" },
  { logo: logo7, top: 80 * 5, left: 80, status: "red" },
  { logo: logo8, top: 80 * 7, left: 80 },
  { logo: logo9, top: 80 * 5, left: 80 * 9, status: "red" },
  { logo: logo10, top: 80 * 7, left: 80 * 9, status: "red" },
];

const GREENS = [
  "rgb(180, 230, 255)",
  "rgb(170, 220, 245)",
  "rgb(160, 210, 235)",
  "rgb(150, 200, 225)",
  "rgb(180, 255, 200)",
];

const YELLOWS = [
  "rgb(220, 220, 150)",
  "rgb(210, 210, 140)",
  "rgb(200, 200, 130)",
  "rgb(190, 190, 120)",
  "rgb(180, 180, 110)",
];

export const RED = "rgb(255, 120, 160)";

const Light = ({ status = "green" }: { status?: Connection["status"] }) => {
  const [blinking, setBlinking] = useState(false);

  const color = useMemo(() => {
    return status === "green"
      ? GREENS[Math.floor(Math.random() * GREENS.length)]
      : status === "yellow"
      ? YELLOWS[Math.floor(Math.random() * YELLOWS.length)]
      : RED;
  }, [status]);

  useEffect(() => {
    if (status === "off") {
      setBlinking(false);
      return;
    }

    const min = status === "yellow" ? 300 : 800;
    const max = status === "yellow" ? 1000 : 2000;

    const getInterval = () => {
      return status === "red" ? 500 : Math.random() * (max - min) + min;
    };

    const blink = () => {
      setBlinking((prev) => !prev);
      const randomInterval = getInterval();
      setTimeout(blink, randomInterval);
    };

    const initialInterval = getInterval();
    const timeoutId = setTimeout(blink, initialInterval);

    return () => clearTimeout(timeoutId);
  }, [status]);

  return (
    <div
      data-on={blinking}
      className="size-1.25 rounded-[1.5px] bg-black/5 dark:data-[on=false]:bg-black data-[on=true]:bg-[var(--light-color)] dark:data-[on=true]:shadow-[0_0_4px_var(--light-color)]"
      style={{ "--light-color": color } as React.CSSProperties}
    ></div>
  );
};

export function Connection({
  className,
  style,
  logo,
  status = "off",
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  logo: string;
  status?: Connection["status"];
} & Omit<
  React.HTMLAttributes<HTMLDivElement>,
  | "className"
  | "style"
  | "onDrag"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragExit"
  | "onDragLeave"
  | "onDragOver"
  | "onDragStart"
  | "onDrop"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
>) {
  return (
    <HoverCard {...(status === "off" ? { open: false } : {})} openDelay={150}>
      <HoverCardTrigger asChild>
        <motion.div
          data-status={status}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.2,
            scale: { type: "spring", visualDuration: 0.2, bounce: 0.5 },
          }}
          className={cn(
            "absolute flex flex-col items-center bg-background rounded-full w-20 h-20 border-4 border-background -translate-x-1/2 -translate-y-1/2",
            className
          )}
          style={
            {
              "--light-color":
                status === "green"
                  ? "hsl(150,90%,80%)"
                  : status === "red"
                  ? "hsl(350,100%,85%)"
                  : status === "yellow"
                  ? "hsl(40,100%,85%)"
                  : "transparent",
              ...style,
            } as React.CSSProperties
          }
          {...props}
        >
          <div
            className="bg-white/95 dark:bg-gray-800/20 dark:inset-shadow-xs dark:inset-shadow-white/10 dark:shadow-md dark:shadow-black absolute inset-1 rounded-full"
            style={{
              filter: `drop-shadow(0px 1px 1px color(display-p3 .1137 .2431 .4784 / .08)) drop-shadow(0px 2px 2px color(display-p3 .1137 .2431 .4784 / .08))`,
            }}
          ></div>
          <div
            className={cn(
              "masker size-10 mt-0.5 relative! inset-shadow-[0_8px_20px_4px_rgba(0,0,0,0.6)] dark:bg-[var(--light-color)] bg-gray-500 [[data-status=off]_&]:bg-gray-300 dark:[[data-status=off]_&]:bg-black [[data-status=off]_&]:inset-shadow-none"
            )}
            style={
              {
                "--mask-image": `url(${logo})`,
              } as React.CSSProperties
            }
          ></div>
          <div
            className="absolute -top-3.5 opacity-15 size-full inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, var(--light-color) 0%, transparent 50%)",
            }}
          ></div>
          <div className="absolute bottom-3.5 flex flex-col gap-0.25 rounded-sm p-1 inset-shadow-sm bg-black/0.5">
            <div className="flex gap-0.25">
              <Light status={status} />
              <Light status={status} />
              <Light status={status} />
              <Light status={status} />
              <Light status={status} />
            </div>
            <div className="flex gap-0.25">
              <Light status={status} />
              <Light status={status} />
              <Light status={status} />
              <Light status={status} />
              <Light status={status} />
            </div>
          </div>
        </motion.div>
      </HoverCardTrigger>
      <HoverCardContent className="w-96" align="start" side="right">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "size-2 rounded-full",
                  status === "red"
                    ? "bg-red-300"
                    : status === "yellow"
                    ? "bg-amber-300"
                    : "bg-green-300"
                )}
              ></div>
            </div>

            <h2>
              {status === "red"
                ? "Everything is on fire"
                : status === "yellow"
                ? "Anomaly detected"
                : "All systems normal"}
            </h2>
          </div>
          <h3 className="text-sm opacity-50 mt-2">EC2 History</h3>
          <div>
            {status === "red" ? (
              <OnFireChart />
            ) : status === "yellow" ? (
              <AnomalyChart />
            ) : (
              <NormalChart />
            )}
            <div className="relative -top-3 pt-2 border-t border-dashed border-gray-500/50  ">
              <div className="flex justify-between text-sm opacity-50 ">
                <p>6/23/25 12:00 AM</p>
                <p>6/24/25 12:00 AM</p>
              </div>

              <div className="flex w-full gap-8 text-xs mt-4 opacity-80">
                <div className="flex flex-col gap-1">
                  <div className="text-body-detail-regular text-neutral-alpha-normal-alpha">
                    Usage type
                  </div>
                  <div className="text-body-small-regular w-max text-neutral-alpha-mute-alpha">
                    USW-EBS
                  </div>
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <div className="text-body-detail-regular text-neutral-alpha-normal-alpha">
                    Actual
                  </div>
                  <div className="text-body-small-regular w-max text-neutral-alpha-mute-alpha">
                    $60
                  </div>
                  <div className="text-body-small-regular w-max text-neutral-alpha-mute-alpha">
                    $60
                  </div>
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <div className="text-body-detail-regular text-neutral-alpha-normal-alpha">
                    Expected
                  </div>
                  <div className="text-body-small-regular w-max text-neutral-alpha-mute-alpha">
                    $30
                  </div>
                  <div className="text-body-small-regular w-max text-neutral-alpha-mute-alpha">
                    $30
                  </div>
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <div className="text-body-detail-regular text-neutral-alpha-normal-alpha">
                    % Change
                  </div>
                  <div className="bg-neutral-opaque-4 text-body-detail-medium w-max">
                    100%
                  </div>
                  <div className="bg-neutral-opaque-4 text-body-detail-medium w-max">
                    100%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

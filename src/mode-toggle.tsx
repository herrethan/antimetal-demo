import { RiContrast2Line, RiSunLine } from "@remixicon/react";
import { useTheme } from "./theme-provider";
import { ToggleButton } from "./toggle-button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <ToggleButton
      on={theme === "dark"}
      onChange={(on) => setTheme(on ? "dark" : "light")}
    >
      <RiSunLine className="size-5 dark:opacity-80" />
      <RiContrast2Line className="size-5" />
    </ToggleButton>
  );
}

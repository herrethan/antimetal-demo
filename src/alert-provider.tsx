import { RiCheckboxCircleLine, RiErrorWarningLine } from "@remixicon/react";
import { createContext, useContext, useState } from "react";
import { ToggleButton } from "./toggle-button";

type AlertProviderProps = {
  children: React.ReactNode;
};

type AlertProviderState = {
  status: "error" | "idle";
  setStatus: (status: "error" | "idle") => void;
};

const initialState: AlertProviderState = {
  status: "idle",
  setStatus: () => null,
};

const AlertProviderContext = createContext<AlertProviderState>(initialState);

export function AlertProvider({ children, ...props }: AlertProviderProps) {
  const [alert, setAlert] = useState<AlertProviderState["status"]>(
    initialState.status
  );

  return (
    <AlertProviderContext.Provider
      {...props}
      value={{ status: alert, setStatus: setAlert }}
    >
      {children}
    </AlertProviderContext.Provider>
  );
}

export const useAlertStatus = () => {
  const context = useContext(AlertProviderContext);

  if (context === undefined)
    throw new Error("useAlertState must be used within a AlertProvider");

  return context;
};

export const AlertToggler = () => {
  const { status, setStatus } = useAlertStatus();

  return (
    <ToggleButton
      on={status === "error"}
      onChange={(on) => setStatus(on ? "error" : "idle")}
    >
      <RiCheckboxCircleLine className="size-5 text-green-200/80" />
      <RiErrorWarningLine className="size-5 text-red-300 dark:text-foreground/70" />
    </ToggleButton>
  );
};

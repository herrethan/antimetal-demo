import { RiHeart3Line } from "@remixicon/react";
import { AlertProvider, AlertToggler, useAlertStatus } from "./alert-provider";
import "./App.css";
import { Connection, CONNECTIONS_ALERT, CONNECTIONS_GREEN } from "./connection";
import { Dot } from "./dot";
import { ModeToggle } from "./mode-toggle";
import { Pulse, PULSES } from "./pulse";
import { ThemeProvider, useTheme } from "./theme-provider";
import bgLinesBlack from "/bg-lines-black.png";
import bgLinesWhite from "/bg-lines-white.png";

const BgImage = () => {
  const { theme } = useTheme();
  return (
    <div className="opacity-10">
      <img
        className="w-full h-full"
        src={theme === "dark" ? bgLinesWhite : bgLinesBlack}
        alt="bg"
      />
    </div>
  );
};

const Connections = () => {
  const { status } = useAlertStatus();
  return (
    <div>
      {[status === "error" ? CONNECTIONS_ALERT : CONNECTIONS_GREEN].map(
        (connections) =>
          connections.map((connection) => (
            <Connection
              key={`${connection.logo}-${connection.status}`}
              style={{ top: connection.top, left: connection.left }}
              logo={connection.logo}
              status={connection.status}
            />
          ))
      )}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AlertProvider>
        <div>
          <h1 className="my-12 opacity-80">Hello, Antimetal</h1>
          <header className="flex justify-between items-center max-w-52 mx-auto">
            <AlertToggler />
            <ModeToggle />
          </header>
          <div style={{ width: 800, height: 640 }} className="relative">
            <BgImage />
            {PULSES.map((pulse) => (
              <Pulse key={pulse.mask} {...pulse} />
            ))}
            {[...Array(7)].map((_, i) =>
              [...Array(9)].map((_, j) => (
                <Dot
                  key={`${i}-${j}`}
                  style={{ top: 80 * (i + 1), left: 80 * (j + 1) }}
                />
              ))
            )}
            <Connections />
          </div>
          <p className="text-center text-sm opacity-40 mt-16">
            Made with{" "}
            <RiHeart3Line className="size-4 inline-block align-sub mx-0.5" /> by
            Ethan Herr{" "}
            <a href="https://herrmedia.com" className="block">
              herrmedia.com
            </a>
          </p>
        </div>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;

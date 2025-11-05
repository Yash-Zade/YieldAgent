import { Button } from "@heroui/react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { useTheme } from "@heroui/use-theme";
import { Link, useLocation } from "react-router-dom";
import { GithubIcon, SunFilledIcon, MoonFilledIcon } from "@/components/icons";
import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { client } from "@/config/client";
import Logo from "./logo";

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const { pathname } = useLocation();

  const navItems = ["Vault", "Pools", "Docs", "About"];

  return (
    <div className="container max-w-5xl mx-auto">
      <header className="relative pt-4">
        <nav
          className="
            flex items-center justify-between
            rounded-xl border border-border shadow-md
            bg-background/80 backdrop-blur-lg
            py-2 px-5
            transition-all duration-300
          "
        >
          {/* LEFT: Logo + Links */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 logo-theme">
              <Logo className="h-8 w-auto" />
            </Link>


            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => {
                const active = pathname === `/${item.toLowerCase()}`;
                return (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase()}`}
                    className={`
                      text-sm font-medium transition-all duration-200
                      ${active
                        ? "text-primary"
                        : "text-foreground/90 dark:text-foreground/85"
                      }
                      hover:text-primary
                      hover:drop-shadow-[0_0_6px_oklch(0.75_0.26_285)]
                    `}
                  >
                    {item}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Controls */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Theme Toggle */}
            <Button
              isIconOnly
              variant="light"
              className="
                h-9 w-9 relative mx-1
                text-foreground/80 dark:text-foreground/75
                hover:text-primary hover:bg-accent/10
                transition-all duration-200
              "
              onClick={() => setTheme(isDark ? "light" : "dark")}
            >
              <SunFilledIcon className="h-[22px] w-[22px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonFilledIcon className="absolute h-[22px] w-[22px] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* GitHub */}
            <Link
              to="https://github.com/Yash-Zade/YieldAgent"
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-foreground/80 dark:text-foreground/75
                hover:text-primary
                hover:drop-shadow-[0_0_6px_oklch(0.75_0.26_285)]
                transition-all duration-200
              "
            >
              <GithubIcon className="h-[24px] w-[24px]" />
            </Link>

            {/* Wallet Connect */}
            <div className="flex flex-col items-center">
              <ConnectButton
                client={client}
                wallets={wallets}
                theme={isDark ? "dark" : "light"}
                connectButton={{
                  label: "Connect",
                  style: {
                    all: "unset",
                    backgroundColor: isDark
                      ? "oklch(0.14 0.035 280)"
                      : "oklch(0.99 0.008 280)",
                    borderRadius: "10px",
                    fontWeight: "500",
                    transition: "all 0.25s ease",
                    color: isDark
                      ? "oklch(0.95 0.02 260)"
                      : "oklch(0.12 0.03 280)",
                    padding: "0.45rem 1rem",
                    cursor: "pointer",
                    border: isDark
                      ? "1px solid oklch(0.98 0.025 260 / 15%)"
                      : "1px solid oklch(0.86 0.025 270)",
                    boxShadow: isDark
                      ? "0 0 10px oklch(0.75 0.26 285 / 18%)"
                      : "0 0 8px oklch(0.58 0.24 285 / 12%)",
                  },
                }}
                connectModal={{
                  title: "Select a Wallet",
                  showThirdwebBranding: false,
                }}
              />
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  isIconOnly
                  variant="light"
                  className="
                    h-9 w-9 md:hidden 
                    text-foreground/80 dark:text-foreground/75
                    hover:text-primary hover:bg-accent/10
                    transition-all duration-200
                  "
                >
                  <Menu className="h-[18px] w-[18px]" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="
                  w-[240px] sm:w-[300px]
                  bg-background text-foreground
                  border-l border-border
                "
              >
                <nav className="flex flex-col space-y-4 mt-6">
                  {navItems.map((item) => {
                    const active = pathname === `/${item.toLowerCase()}`;
                    return (
                      <Link
                        key={item}
                        to={`/${item.toLowerCase()}`}
                        className={`
                          text-sm font-medium transition-all duration-200
                          ${active
                            ? "text-primary"
                            : "text-foreground/90 dark:text-foreground/85"
                          }
                          hover:text-primary
                          hover:drop-shadow-[0_0_6px_oklch(0.75_0.26_285)]
                        `}
                      >
                        {item}
                      </Link>
                    );
                  })}

                  <Link
                    to="https://github.com/Yash-Zade/YieldAgent"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex items-center gap-2
                      text-sm text-foreground/90 dark:text-foreground/85
                      hover:text-primary
                      hover:drop-shadow-[0_0_6px_oklch(0.75_0.26_285)]
                      transition-all
                    "
                  >
                    <GithubIcon className="h-[22px] w-[22px]" /> GitHub
                  </Link>

                  <div className="flex flex-col gap-4 items-center pt-2">
                    <ConnectButton
                      client={client}
                      wallets={wallets}
                      theme={isDark ? "dark" : "light"}
                    />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
    </div>
  );
}
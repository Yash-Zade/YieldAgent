// components/WalletConnectButton.tsx
import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { client } from "@/config/client";

// Define wallets you want to support
const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
];

export function WalletConnectButton() {
  return (
    <div className="flex flex-col gap-4 items-center ">
      <ConnectButton
        client={client}
        wallets={wallets}
        theme="dark"
        connectButton={{
          label: "Connect",
          style: {
            all: "unset",
            backgroundColor: "#242424ff",
            borderRadius: "8px",
            fontWeight: "400",
            transition: "all 0.3s ease",
            color: "#fff",
            padding: "0.5rem 0.75rem",
            cursor: "pointer",
          },
        }}
        connectModal={{
          title: "Select a Wallet",
          showThirdwebBranding: false,
          termsOfServiceUrl: "/terms",
          privacyPolicyUrl: "/privacy",
        }}
      />
    </div>
  );
}
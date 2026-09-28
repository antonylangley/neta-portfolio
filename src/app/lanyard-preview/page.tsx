import type { Metadata } from "next";
import { PortfolioLanyard } from "@/components/PortfolioLanyard";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Lanyard Preview",
  robots: { index: false, follow: false },
};

export default function LanyardPreviewPage() {
  return (
    <main className={styles.preview} id="main-content">
      <PortfolioLanyard />
    </main>
  );
}

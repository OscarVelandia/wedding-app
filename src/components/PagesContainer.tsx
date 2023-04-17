import { Pacifico } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { camelize } from "../utils/camelize";

import styles from "./PagesContainer.module.scss";

const navbarFont = Pacifico({ weight: "400", subsets: ["latin"] });

export const PagesContainer = ({
  children,
  gap,
}: {
  children: ReactNode;
  gap?: '1rem' | '2rem'
}) => {
  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <main className={styles.mainContainer} style={{ gap }}>
        {children}
      </main>
    </div>
  );
};

const headerTexts = {
  firstOption: "Invitación Oficial",
  secondOption: "Agenda Boda",
  thirdOption: "Despedida de Soltera",
};

const Navbar = () => {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <nav className={`${styles.navbar} ${navbarFont.className}`}>
      <ul>
        {Object.values(headerTexts).map((route, index) => {
          const path = index === 0 ? "" : camelize(route);
          const formattedPath = `/${path}`;

          return (
            <li
              key={path}
              className={
                pathname === formattedPath ? styles.selectedRoute : undefined
              }
            >
              <Link href={formattedPath}>{route}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

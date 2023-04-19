import { GlobalContext } from "@context/index";
import { Pacifico } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useContext } from "react";
import { CodeDialog } from ".";
import { camelize } from "../utils/camelize";

import styles from "./PagesContainer.module.scss";

const navbarFont = Pacifico({ weight: "400", subsets: ["latin"] });

const texts = {
  description:
    "Te invitamos a celebrar con nosotros nuestros 13 años juntos, ¡Ahora es oficial!",
  title: "Karen y Daniel",
};

export const PagesContainer = ({
  children,
  gap,
}: {
  children: ReactNode;
  gap?: "1rem" | "2rem";
}) => {
  const { state } = useContext(GlobalContext);

  return (
    <>
      <Head>
        <title>{texts.title}</title>
        <meta name="description" content={texts.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.pageContainer}>
        <Navbar />
        <main className={styles.mainContainer} style={{ gap }}>
          {Boolean(state.isCodeDialogOpen) && <CodeDialog />}
          {children}
        </main>
      </div>
    </>
  );
};

const Navbar = () => {
  const { state } = useContext(GlobalContext);
  const router = useRouter();
  const pathname = router.pathname;
  const headerTexts = {
    firstOption: "Invitación Oficial",
    secondOption: "Agenda Boda",
    ...(state.guest?.isBacheloretteFormHidden ? {} : { thirdOption: "Despedida de Soltera" }),
    ...(state.guest?.isAdmin ? { fourOption: "Sorteo" } : {}),
  };

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

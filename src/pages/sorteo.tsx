import {
  CodeDialog,
  PagesContainer,
  Separator,
  SubmitAndCancelButtons,
  SubtitleWithDate,
} from "@components/index";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../context";
import { Lottery } from "./api/lotteryWinner";

import styles from "./sorteo.module.scss";

const texts = {
  code: "Còdigo:",
  name: "Nombre:",
  submitButton: "Sortear",
  title: "Selecciona la ganadora",
};

export default function Lottery() {
  const { dispatch, state } = useContext(GlobalContext);
  const router = useRouter();

  const handleRaffleButtonClick = async () => {
    const response = await fetch("/api/lotteryWinner");
    const lotteryWinner: Lottery = await response.json();

    dispatch({ type: "SET_WINNER", payload: lotteryWinner });
  };

  useEffect(() => {
      if (!state.guest) return;

    if (Boolean(state.guest.isAdmin) === false) router.push("/");
  }, [state.guest, state.guest?.isAdmin]);

  return (
    <PagesContainer gap="2rem">
      <section className={styles.container}>
        <SubtitleWithDate />
        <h2 className={styles.title}>{texts.title}</h2>
        {state.winner ? (
          <div className={styles.winnerContainer}>
            <div>
              <h3>{texts.name}</h3>
              <h3>{state.winner.winner}</h3>
            </div>
            <div>
              <h3>{texts.code}</h3>
              <h3>{state.winner.code}</h3>
            </div>
          </div>
        ) : (
          <SubmitAndCancelButtons
            onSubmitButtonClick={handleRaffleButtonClick}
            submitLabel={texts.submitButton}
          />
        )}
      </section>
      <Separator />
    </PagesContainer>
  );
}

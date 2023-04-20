import { PagesContainer, Separator, SubtitleWithDate } from "@components/index";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import * as _Progress from "@radix-ui/react-progress";
import { GlobalContext } from "../context";
import { setLotteryWinner } from "../db/guests";

import styles from "./sorteo.module.scss";

const texts = {
  code: "Código:",
  name: "Nombre:",
  submitButton: "Sortear",
  title: "Selecciona la ganadora",
  winner: "Ganadora",
};

const PROGRESS_COMPLETE = 100;
const PROGRESS_MIN = 0;

export default function Lottery() {
  const router = useRouter();
  const { dispatch, state } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(PROGRESS_MIN);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);
  const isProgressVisible = progress < PROGRESS_COMPLETE && progress > PROGRESS_MIN;
  const isProgressComplete = progress >= PROGRESS_COMPLETE && state.winner;

  useEffect(() => {
    if (!state.guest) return;

    if (Boolean(state.guest.isAdmin) === false) router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.guest, state.guest?.isAdmin]);

  useEffect(() => {
    if (progress >= PROGRESS_COMPLETE) {
      clearInterval(intervalId as NodeJS.Timer);
      setIsLoading(false);
    }
  }, [intervalId, progress]);

  const handleRaffleButtonClick = async () => {
    setIsLoading(true);
    setProgress((oldProgress) => 2 + oldProgress);

    const winner = await setLotteryWinner();

    dispatch({ type: "SET_WINNER", payload: winner });

    const timerId = setInterval(
      () => setProgress((oldProgress) => 5 + oldProgress),
      500
    );

    setIntervalId(timerId);
  };

  return (
    <PagesContainer gap="2rem">
      <section className={styles.container}>
        <SubtitleWithDate />
        <h2 className={styles.title}>
          {isProgressComplete ? texts.winner : texts.title}
        </h2>
        {isProgressVisible ? <Progress progress={progress} /> : null}
        {isProgressComplete ? (
          <div className={styles.winnerContainer}>
            <div>
              <h3>{texts.name}</h3>
              <h3>{state.winner?.name}</h3>
            </div>
            <div>
              <h3>{texts.code}</h3>
              <h3>{state.winner?.code}</h3>
            </div>
          </div>
        ) : (
          <button
            aria-disabled={isLoading}
            className={styles.submitButton}
            disabled={isLoading}
            onClick={handleRaffleButtonClick}
          >
            {texts.submitButton}
          </button>
        )}
      </section>
      <Separator />
    </PagesContainer>
  );
}

const Progress = ({ progress }: { progress: number }) => {
  return (
    <_Progress.Root className={styles.progressRoot} value={progress}>
      <_Progress.Indicator
        className={styles.progressIndicator}
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </_Progress.Root>
  );
};

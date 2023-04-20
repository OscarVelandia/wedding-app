import {
  Address,
  PagesContainer,
  Separator,
  SubmitAndCancelButtons,
} from "@components/index";
import { useContext, useState } from "react";
import { GlobalContext } from "../context";
import { Guest, updateGuest } from "../db/guests";

import styles from "./despedidaDeSoltera.module.scss";

const texts = {
  address: "Cra. 47 #174a-48, Villa del prado. Bogotá, Colombia",
  cancelButton: "No podré asistir :(",
  confirmAssistance: "Confirma tu asistencia a la despedida de soltera:",
  confirmButton: "¡Cuenten conmigo!",
  date: 'Fecha:',
  mainParagraph:
    "Tendremos una noche llena de diversión, nuestra gente favorita, deliciosa comida y excelente vino para despedir la soltería.",
  dateAndTime: 'Sábado 22 a las 7 pm',
  place: "Lugar:",
  sent: "Enviado!",
};

export default function Bachelorette() {
  const { state, dispatch } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleButtonClick = async (
    willAttendToTheBacheloretteParty: boolean
  ) => {
    if (!state.guest) return;

    const updatedGuest: Guest = {
      ...state.guest,
      willAttendToTheBacheloretteParty,
    };
    try {
      setIsLoading(true);
      await updateGuest(state.guestId as string, updatedGuest);
      setIsLoading(false);
      setIsSent(true);
      dispatch({ type: "SET_GUEST", payload: updatedGuest });
      setTimeout(() => setIsSent(false), 3000)
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <PagesContainer gap="2rem">
      <section className={styles.container}>
        <p>{texts.mainParagraph}</p>
        <p>{texts.date}{" "}{texts.dateAndTime}</p>
        <p>
          {texts.place}{" "}
          <Address
            addressUrl="https://www.google.com/maps/place/Cra.+47+%23174a-48,+Bogot%C3%A1/@4.7549521,-74.0478647,18.34z/data=!4m6!3m5!1s0x8e3f859a1b8426fb:0x75b1b0cd60e39b41!8m2!3d4.7551073!4d-74.0472468!16s%2Fg%2F11td_xst47"
            label={texts.address}
          />
        </p>
      </section>
      <Separator />
      <div>
        <h2 className={styles.formTitle}>{texts.confirmAssistance}</h2>
        {isSent ? <h2 className={styles.sentText}>{texts.sent}</h2> : null}
        <SubmitAndCancelButtons
          cancelLabel={texts.cancelButton}
          isLoadingSubmit={isLoading}
          onCancelButtonClick={() => handleButtonClick(false)}
          onSubmitButtonClick={() => handleButtonClick(true)}
          submitLabel={texts.confirmButton}
        />
      </div>
    </PagesContainer>
  );
}

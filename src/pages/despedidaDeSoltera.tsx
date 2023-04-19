import {
  Address,
  PagesContainer,
  Separator,
  SubmitAndCancelButtons
} from "@components/index";

import { useContext } from "react";
import { GlobalContext } from "../context";
import { Guest } from "./api/guest";
import styles from "./despedidaDeSoltera.module.scss";

const texts = {
  confirmAssistance: "Confirma tu asistencia a la despedida de soltera:",
  mainParagraph:
    "Tendremos una noche llena de diversión, nuestra gente favorita, deliciosa comida y excelente vino para despedir la soltería.",
  confirmButton: "¡Cuenten conmigo!",
  cancelButton: "No podrè asistir :(",
  place: "Lugar:",
  address: "Cra. 47 #174a-48, Villa del prado. Bogotá, Colombia",
};

export default function Bachelorette() {
  const { state, dispatch } = useContext(GlobalContext);

  const handleButtonClick = async (
    willAttendToTheBacheloretteParty: boolean
  ) => {
    if (!state.guest) return;

    const updatedGuest: Guest = {
      ...state.guest,
      willAttendToTheBacheloretteParty,
    };
    const response = await fetch("/api/guest", {
      method: "POST",
      body: JSON.stringify(updatedGuest),
    });

    if (response.ok) {
      const guest: Guest = await response.json();

      dispatch({ type: "SET_GUEST", payload: guest });
    } else {
      handleButtonClick(willAttendToTheBacheloretteParty);
    }
  };

  return (
    <PagesContainer gap="2rem">
      <section className={styles.container}>
        <p>{texts.mainParagraph}</p>
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
        <SubmitAndCancelButtons
          submitLabel={texts.confirmButton}
          onCancelButtonClick={() => handleButtonClick(false)}
          onSubmitButtonClick={() => handleButtonClick(true)}
          cancelLabel={texts.cancelButton}
        />
      </div> 
    </PagesContainer>
  );
}

import {
  Address,
  CodeDialog,
  ConfirmationFormContainer,
  PagesContainer,
  Separator,
} from "@components/index";
import * as Form from "@radix-ui/react-form";
import { Great_Vibes } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import banner from "public/mainBanner.gif";
import { useContext } from "react";
import { GlobalContext } from "../context";
import { Guest } from "./api/guest";

import styles from "./index.module.scss";

const inter = Great_Vibes({ weight: "400", subsets: ["latin"] });

interface FormData {
  name: string;
  cellphone: string;
  menu: "vegetarian" | "carnivorous";
}

export const texts = {
  confirm: "Confirma tu asistencia a la ceremonia:",
  date: "29 DE ABRIL DE 2023, 5:00 P.M.",
  firstBannerParagraph:
    "Te invitamos a celebrar con nosotros nuestros 13 años juntos",
  locationExplanation:
    "La ceremonia tendrá lugar en la Parroquia Santa Maria Mazzarello. Ubicada en la",
  location: "Calle 183 #9-09, Usaquén, Bogotá.",
  submitButton: "¡Nos veremos allà!",
  secondBannerParagraph: "¡Ahora es oficial!",
  subtitle: "Karen y Daniel",
};

export default function Home() {
  const { state, dispatch } = useContext(GlobalContext);

  const handleFormSubmit = async (data: FormData) => {
    if (!state.guest) return;

    const updatedGuest: Guest = { ...state.guest, ...data };
    const response = await fetch("/api/guest", {
      method: "POST",
      body: JSON.stringify(updatedGuest),
    });

    if (response.ok) {
      const guest: Guest = await response.json();

      dispatch({ type: "SET_GUEST", payload: guest });
    } else {
      handleFormSubmit(data);
    }
  };

  return (
    <PagesContainer>
      <section className={styles.banner}>
        <Image
          src={banner}
          alt="Banner animation"
          style={{ width: "100%", height: "100%" }}
        />
        <div>
          <p>{texts.firstBannerParagraph}</p>
          <p>{texts.secondBannerParagraph}</p>
        </div>
      </section>
      <section className={styles.locationContainer}>
        <h2 className={inter.className}>{texts.subtitle}</h2>
        <div>
          <h3>{texts.date}</h3>
          <p>
            {texts.locationExplanation}{" "}
            <Address
              addressUrl="https://www.google.com/maps/place/Cl.+183+%239-9,+Bogot%C3%A1/@4.7602503,-74.034144,17z/data=!3m1!4b1!4m5!3m4!1s0x8e3f85898b9be55d:0x75e3c11ae10f1eab!8m2!3d4.7602503!4d-74.0315691"
              label={texts.location}
            />
          </p>
        </div>
      </section>
      <Separator />
      <ConfirmationFormContainer
        onFormSubmit={handleFormSubmit}
        title={texts.confirm}
        submitButtonLabel={texts.submitButton}
      >
        <Form.Field className={styles.fieldContainer} name="guest">
          <Form.Control
            className={styles.formInput}
            defaultValue={state.guest?.name}
            disabled={Boolean(state.guest?.name)}
            required
            title="Nombre completo"
            type="text"
          />
        </Form.Field>
        <Form.Field className={styles.fieldContainer} name="cellphone">
          <Form.Control
            className={styles.formInput}
            defaultValue={state.guest?.cellphone}
            maxLength={10}
            minLength={10}
            pattern="3[0-9]{9}"
            placeholder="Telèfono"
            required
            title="Telèfono"
            type="tel"
          />
          <Form.Message match="valueMissing">
            Por favor agrega el numero de telèfono.
          </Form.Message>
          <Form.Message match="tooShort">
            Por favor agrega el nùmero completo.
          </Form.Message>
          <Form.Message match="patternMismatch">
            Por favor agrega un nùmero de telèfono valido.
          </Form.Message>
        </Form.Field>
        <Form.Field className={styles.fieldContainer} name="menu">
          <Form.Control
            asChild
            defaultValue={state.guest?.menu}
            placeholder="Menù"
          >
            <select className={`${styles.menuSelect} ${styles.formInput}`}>
              <option value="carnivorous">Quiero menù con carnita</option>
              <option value="veggie">Quiero menù vegetariano</option>
            </select>
          </Form.Control>
        </Form.Field>
      </ConfirmationFormContainer>
    </PagesContainer>
  );
}

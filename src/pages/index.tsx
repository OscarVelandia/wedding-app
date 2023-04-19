import {
  Address,
  ConfirmationFormContainer,
  PagesContainer,
  Separator
} from "@components/index";
import * as Form from "@radix-ui/react-form";
import { Great_Vibes } from "next/font/google";
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
  willAttend: "true" | "false";
}

export const texts = {
  CantAttend: "No puedo ir, ¡pasenla bien!",
  confirm: "Confirma tu asistencia a la ceremonia:",
  date: "29 DE ABRIL DE 2023, 5:00 P.M.",
  firstBannerParagraph:
    "Te invitamos a celebrar con nosotros nuestros 13 años juntos",
  location: "Calle 183 #9-09, Usaquén, Bogotá.",
  locationExplanation:
    "La ceremonia tendrá lugar en la Parroquia Santa Maria Mazzarello. Ubicada en la",
  menu: "Menù",
  secondBannerParagraph: "¡Ahora es oficial!",
  selectMenuPlaceholder: "Selecciona tu menù",
  sendForm: "Enviar",
  subtitle: "Karen y Daniel",
  willAttend: "¡Nos veremos allà!",
  willIAttend: "Irè a la celebraciòn?",
};

export default function Home() {
  const { state, dispatch } = useContext(GlobalContext);

  const handleFormSubmit = async (data: FormData) => {
    if (!state.guest) return;

    const updatedGuest: Guest = {
      ...state.guest,
      ...data,
      willAttend: data.willAttend === "true",
    };
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
          alt="Banner animation"
          className={styles.imageBanner}
          priority
          src={banner}
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
        submitButtonLabel={texts.sendForm}
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
          <Form.Control asChild placeholder={texts.menu} required>
            <select
              // Hack to make the defaultValue change when state.guest change
              key={
                state.guest?.menu === undefined
                  ? null
                  : String(state.guest?.willAttend)
              }
              className={`${styles.menuSelect} ${styles.formInput}`}
              defaultValue={state.guest?.menu || ""}
            >
              <option value="" disabled hidden>
                {texts.selectMenuPlaceholder}
              </option>
              <option value="carnivorous">Quiero menù con carnita</option>
              <option value="veggie">Quiero menù vegetariano</option>
            </select>
          </Form.Control>
          <Form.Message match="valueMissing">
            Por favor selecciona un menù.
          </Form.Message>
        </Form.Field>
        <Form.Field className={styles.fieldContainer} name="willAttend">
          <Form.Control asChild placeholder={texts.willIAttend} required>
            <select
              // Hack to make the defaultValue change when state.guest change
              key={
                state.guest?.willAttend === undefined
                  ? null
                  : String(state.guest?.willAttend)
              }
              className={`${styles.menuSelect} ${styles.formInput}`}
              defaultValue={
                state.guest?.willAttend === undefined
                  ? ""
                  : state.guest?.willAttend
                  ? "true"
                  : "false"
              }
            >
              <option disabled hidden value="">
                {texts.willIAttend}
              </option>
              <option value="true">{texts.willAttend}</option>
              <option value="false">{texts.CantAttend}</option>
            </select>
          </Form.Control>
          <Form.Message match="valueMissing">
            Por favor selecciona una opciòn.
          </Form.Message>
        </Form.Field>
      </ConfirmationFormContainer>
    </PagesContainer>
  );
}

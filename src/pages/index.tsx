import { Address, PagesContainer, Separator, SubmitButton } from "@components/index";
import * as Form from "@radix-ui/react-form";
import Lottie from "lottie-react";
import { Great_Vibes } from "next/font/google";
import Head from "next/head";
import bannerAnimation from "public/test.json";

import styles from "./index.module.scss";

const inter = Great_Vibes({ weight: "400", subsets: ["latin"] });

const texts = {
  confirm: "Confirma tu asistencia a la ceremonia:",
  date: "29 DE ABRIL DE 2023, 5:00 P.M.",
  description:
    "Te invitamos a celebrar con nosotros nuestros 13 años juntos, ¡Ahora es oficial!",
  firstBannerParagraph:
    "Te invitamos a celebrar con nosotros nuestros 13 años juntos",
  locationExplanation:
    "La ceremonia tendrá lugar en la Parroquia Santa Maria Mazzarello. Ubicada en la",
  location: "Calle 183 #9-09, Usaquén, Bogotá.",
  submitButton: "¡Nos veremos allà!",
  secondBannerParagraph: "¡Ahora es oficial!",
  subtitle: "Karen y Daniel",
  title: "Karen y Daniel",
};

export default function Home() {
  return (
    <>
      <Head>
        <title>{texts.title}</title>
        <meta name="description" content={texts.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PagesContainer>
        <section className={styles.banner}>
          <Lottie animationData={bannerAnimation} />
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
        <ConfirmationForm />
      </PagesContainer>
    </>
  );
}

const ConfirmationForm = () => {
  return (
    <>
      <h2 className={styles.formTitle}>{texts.confirm}</h2>

      <Form.Root
        className={styles.formContainer}
        // `onSubmit` only triggered if it passes client-side validation
        onSubmit={(event) => {
          const data = Object.fromEntries(new FormData(event.currentTarget));

          console.log(data);

          // // Submit form data and catch errors in the response
          // submitForm(data)
          //   .then(() => {})
          //   /**
          //    * Map errors from your server response into a structure you'd like to work with.
          //    * In this case resulting in this object: `{ email: false, password: true }`
          //    */
          //   .catch((errors) => setServerErrors(mapServerErrors(errors)));

          // prevent default form submission
          event.preventDefault();
        }}
      >
        <Form.Field name="name">
          <Form.Control
            className={styles.formInput}
            minLength={10}
            placeholder="Nombre completo"
            required
            title="Nombre completo"
            type="text"
          />
          <Form.Message match="valueMissing">
            Por favor agrega tu nombre.
          </Form.Message>
          <Form.Message match="tooShort">
            Por favor agrega tu nombre completo.
          </Form.Message>
        </Form.Field>
        <Form.Field name="cellphone">
          <Form.Control
            className={styles.formInput}
            placeholder="Telèfono"
            maxLength={10}
            minLength={10}
            pattern="3[0-9]{9}"
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

        <SubmitButton label={texts.submitButton} />
      </Form.Root>
    </>
  );
};

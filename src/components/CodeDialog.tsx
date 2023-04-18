import React from "react";

import styles from "./CodeDialog.module.scss";
import { ConfirmationFormContainer } from ".";

const texts = {
  title: "Ingresa tu codigo",
  inputPlaceholder: "Ingresa tù codigo de 4 digitos",
  sendCode: "Envia el còdigo!",
};

export const CodeDialog = () => {
  return (
    <div className={styles.container}>
      <div className={styles.dialogContent}>
        <ConfirmationFormContainer
          title={texts.title}
          submitButtonLabel={texts.sendCode}
        >
          <input
            className={styles.formInput}
            type="tel"
            placeholder={texts.inputPlaceholder}
          />
        </ConfirmationFormContainer>
      </div>
    </div>
  );
};

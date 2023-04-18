import * as Form from "@radix-ui/react-form";
import { ConfirmationFormContainer } from "./index";

import styles from "./CodeDialog.module.scss";

const texts = {
  title: "Ingresa tu codigo",
  inputPlaceholder: "Ingresa tù codigo de 4 digitos",
  sendCode: "Envia el còdigo!",
};

export const CodeDialog = () => {

  // Add an interface here
  const handleFormSubmit = async (data: Record<string, unknown>) => {

  }

  return (
    <div className={styles.container}>
      <div className={styles.dialogContent}>
        <ConfirmationFormContainer
          onFormSubmit={handleFormSubmit}
          title={texts.title}
          submitButtonLabel={texts.sendCode}
        >
          <Form.Field name="code">
            <Form.Control
              className={styles.formInput}
              placeholder={texts.inputPlaceholder}
              maxLength={4}
              minLength={4}
              pattern="[0-9]"
              required
              type="tel"
            />
            <Form.Message match="valueMissing">
              Por favor agrega el còdigo.
            </Form.Message>
            <Form.Message match="tooShort">
              Por favor agrega 4 digitos.
            </Form.Message>
            <Form.Message match="patternMismatch">
              El còdigo solamente incluye nùmeros.
            </Form.Message>
          </Form.Field>
        </ConfirmationFormContainer>
      </div>
    </div>
  );
};

import { ConfirmationFormContainer } from "@components/index";
import { GlobalContext } from "@context/index";
import { Guest } from "@pages/api/guest";
import * as Form from "@radix-ui/react-form";
import { useContext, useState } from "react";

import styles from "./CodeDialog.module.scss";

const texts = {
  title: "Ingresa tu codigo",
  inputPlaceholder: "Ingresa tù codigo de 5 digitos",
  sendCode: "Envia el còdigo!",
};

export const CodeDialog = () => {
  const { dispatch } = useContext(GlobalContext);
  const [serverErrors, setServerErrors] = useState<{ code: string | null }>({
    code: null,
  });
  // Add an interface here
  const handleFormSubmit = async (data: { code: string }) => {
    try {
      const response = await fetch(`/api/guest?code=${Number(data.code)}`);

      if (response.ok) {
        const guest: Guest = await response.json();

        setServerErrors({ code: null });
        dispatch({ type: "SET_GUEST", payload: guest });
        dispatch({ type: "SET_CODE_DIALOG_STATUS", payload: false });
      } else {
        setServerErrors({ code: String(await response.json()) });
      }
    } catch (error) {
      setServerErrors({ code: String(error) as string });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.dialogContent}>
        <ConfirmationFormContainer
          onClearServerErrors={() => setServerErrors({ code: null })}
          onFormSubmit={handleFormSubmit}
          title={texts.title}
          submitButtonLabel={texts.sendCode}
        >
          <Form.Field className={styles.fieldContainer} name="code">
            <Form.Control
              className={styles.formInput}
              placeholder={texts.inputPlaceholder}
              maxLength={5}
              minLength={5}
              pattern="[0-9]+"
              required
              type="tel"
            />
            {serverErrors.code && (
              <Form.Message>{serverErrors.code}</Form.Message>
            )}
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

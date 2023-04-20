import { ConfirmationFormContainer } from "@components/index";
import { GlobalContext } from "@context/index";
import * as Form from "@radix-ui/react-form";
import { useContext, useEffect, useState } from "react";
import { getGuestByCode } from "../db/guests";

import styles from "./CodeDialog.module.scss";

const texts = {
  title: "Ingresa tu codigo",
  inputPlaceholder: "Ingresa tu código de 5 digitos",
  sendCode: "Envia el código!",
};

export const CodeDialog = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [serverErrors, setServerErrors] = useState<{ code: string | null }>({
    code: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "scroll";
    };
  }, [state.isCodeDialogOpen]);

  const handleFormSubmit = async (data: { code: string }) => {
    try {
      setIsLoading(true);
      const { guest, guestId } = await getGuestByCode(data.code);

      setIsLoading(false);

      if (!guest) return setServerErrors({ code: 'Còdigo no valido.' });

      dispatch({ type: "SET_GUEST", payload: guest });
      dispatch({ type: "SET_GUEST_ID", payload: guestId });
      dispatch({ type: "SET_CODE_DIALOG_STATUS", payload: false });
    } catch (error) {
      setServerErrors({ code: String(error) as string });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.dialogContent}>
        <ConfirmationFormContainer
          isLoadingSubmitButton={isLoading}
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
              Por favor agrega el código.
            </Form.Message>
            <Form.Message match="tooShort">
              Por favor agrega 5 digitos.
            </Form.Message>
            <Form.Message match="patternMismatch">
              El código solamente incluye números.
            </Form.Message>
          </Form.Field>
        </ConfirmationFormContainer>
      </div>
    </div>
  );
};

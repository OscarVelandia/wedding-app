import { SubmitAndCancelButtons } from "@components/index";
import * as Form from "@radix-ui/react-form";
import { ReactNode } from "react";

import styles from "./ConfirmationForm.module.scss";

export const ConfirmationFormContainer = ({
  cancelButtonLabel,
  children,
  onCancelButtonClick,
  submitButtonLabel,
  title,
}: {
  cancelButtonLabel?: string;
  children: ReactNode;
  onCancelButtonClick?: () => void;
  submitButtonLabel: string;
  title: string;
}) => {
  return (
    <>
      <h2 className={styles.formTitle}>{title}</h2>
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
        {children}

        <SubmitAndCancelButtons
          cancelLabel={cancelButtonLabel}
          onCancelButtonClick={onCancelButtonClick}
          submitLabel={submitButtonLabel}
        />
      </Form.Root>
    </>
  );
};

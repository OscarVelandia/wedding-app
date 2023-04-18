import { SubmitAndCancelButtons } from "@components/index";
import * as Form from "@radix-ui/react-form";
import { ReactNode } from "react";

import styles from "./ConfirmationForm.module.scss";

export const ConfirmationFormContainer = <TFormData,>({
  cancelButtonLabel,
  children,
  onFormSubmit,
  onCancelButtonClick,
  onClearServerErrors,
  submitButtonLabel,
  title,
}: {
  cancelButtonLabel?: string;
  children: ReactNode;
  onCancelButtonClick?: () => void;
  onClearServerErrors?: () => void;
  onFormSubmit: (data: TFormData) => Promise<void>
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
          const data =
            Object.fromEntries(new FormData(event.currentTarget)) as unknown as TFormData;
          
          onFormSubmit(data)
          event.preventDefault();
        }}
        onClearServerErrors={onClearServerErrors}
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

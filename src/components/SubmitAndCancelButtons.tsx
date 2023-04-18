import * as Form from "@radix-ui/react-form";

import styles from "./SubmitAndCancelButtons.module.scss";

export const SubmitAndCancelButtons = ({
  cancelLabel,
  onCancelButtonClick,
  onSubmitButtonClick,
  submitLabel,
}: {
  cancelLabel?: string;
  onCancelButtonClick?: () => void;
  onSubmitButtonClick?: () => void;
  submitLabel: string;
}) => {
  return (
    <div className={styles.container}>
      {onCancelButtonClick && cancelLabel && (
        <button className={styles.submitButton} onClick={onCancelButtonClick}>
          {cancelLabel}
        </button>
      )}
      <Form.Submit className={styles.submitButton} onClick={onSubmitButtonClick}>{submitLabel}</Form.Submit>
    </div>
  );
};

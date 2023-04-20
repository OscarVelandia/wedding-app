import * as Form from "@radix-ui/react-form";

import styles from "./SubmitAndCancelButtons.module.scss";

export const SubmitAndCancelButtons = ({
  cancelLabel,
  isLoadingSubmit,
  onCancelButtonClick,
  onSubmitButtonClick,
  submitLabel,
}: {
  cancelLabel?: string;
  isLoadingSubmit?: boolean;
  onCancelButtonClick?: () => void;
  onSubmitButtonClick?: () => void;
  submitLabel: string;
}) => {
  return (
    <div className={styles.container}>
      {onCancelButtonClick && cancelLabel && (
        <button
          className={styles.submitButton}
          onClick={onCancelButtonClick}
        >
          {cancelLabel}
        </button>
      )}
      <Form.Submit
        className={styles.submitButton}
        aria-disabled={isLoadingSubmit}
        disabled={isLoadingSubmit}
        onClick={onSubmitButtonClick}
      >
        {submitLabel}
      </Form.Submit>
    </div>
  );
};

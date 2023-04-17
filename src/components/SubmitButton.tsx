import * as Form from '@radix-ui/react-form'

import styles from './SubmitButton.module.scss'

export const SubmitButton = ({label}: {label: string}) => {
    return (
        <Form.Submit className={styles.submitButton}>
          {label}
        </Form.Submit>
    )
}
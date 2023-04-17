import { PagesContainer, Separator, SubmitButton, SubtitleWithDate } from "@components/index";

import styles from './despedidaDeSoltera.module.scss';

const texts = {
    confirmAssistance: 'Confirma tu asistencia a la despedida de soltera:',
    mainParagraph: 'Tendremos una noche llena de diversión, nuestra gente favorita, deliciosa comida y excelente vino para despedir la soltería.',
    confirmButton: '¡Cuenten conmigo!',
}

export default function Bachelorette() {
  return (
    <PagesContainer gap="2rem">
        <section className={styles.container}>
            <p>{texts.mainParagraph}</p>
            <Separator />
        </section>
        <h2 className={styles.title}>{texts.confirmAssistance}</h2>
        <SubmitButton label={texts.confirmButton}/>
    </PagesContainer>
  );
}

import { Address, PagesContainer, Separator, SubtitleWithDate } from "@components/index";

import styles from "./agendaBoda.module.scss";

const texts = {
  introduction:
    "Estamos increíblemente agradecidos por habernos encontrado como compañeros de vida. Por eso, queremos compartir con ustedes lo que nos encanta hacer: reírnos, contar historias, cantar y comer!, así que entre risas y alegrías iremos a una fiesta de boda con nuestra familia y amigos.",
  dressCode: "CÓDIGO DE VESTIMENTA",
  dressCodeExplanation:
    '"Traje de fiesta". Como sabrán, no nos gustan las cosas acartonadas, ni clásicas, ni convencionales, sin embargo, queremos que todos estén bonitos, así que piensen más en un estilo casual elegante.',
  locationTitle: "UBICACIÓN",
  locationExplanation:
    "La celebración se llevará a cabo en el norte de Bogotá en",
  address: "La Rioja Calle 173 #7 - 95.",
  confirmMenu: 'Confirma tu menú',
  lluviaDeSobres: 'Lluvia de sobres',
  gift: 'REGALO'
};

export default function WeddingSchedule() {
  return (
    <PagesContainer gap="2rem">
      <section>
        <SubtitleWithDate />
        <p>{texts.introduction}</p>
      </section>
      <section>
        <h2 className={styles.title}>{texts.dressCode}</h2>
        <p>{texts.dressCodeExplanation}</p>
      </section>
      <section>
        <h2 className={styles.title}>{texts.gift}</h2>
        <p>{texts.lluviaDeSobres}</p>
      </section>
      <section>
        <h2 className={styles.title}>{texts.locationTitle}</h2>
        <p>
          {texts.locationExplanation}{" "}
          <Address
            addressUrl="https://www.google.com/maps/dir//Conjunto+Residencial+Hacienda+La+Estancia+-+Rioja,+Cl.+173+%237+-+95,+Bogot%C3%A1/@4.7490916,-74.0270391,16.52z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8e3f8fff4a2b4915:0x7500b13159af6139!2m2!1d-74.025257!2d4.7514984"
            label={texts.address}
          />
        </p>
      </section>
      <Separator />
    </PagesContainer>
  );
}

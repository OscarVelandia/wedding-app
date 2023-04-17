import styles from './SubtitleWithDate.module.scss'
import { EB_Garamond } from "next/font/google";

const inter = EB_Garamond({ weight: "400", subsets: ["latin"], style: 'italic' });


const texts = {
    weedingSchedule: "Agenda Boda",
    date: "29 de abril de 2023",
}

export const SubtitleWithDate = () => {
    return (
        <div className={`${inter.className} ${styles.container}`}>
            <h3>{texts.weedingSchedule}</h3>
            <h3>{texts.date}</h3>
        </div>
    )
}
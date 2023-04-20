import { promises as fs, writeFileSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { Guest } from "../../db/guests";

export interface Lottery {
  winner: null | string;
  code: null | string;
}

const LOTTERY_FILE_PATH = `${path.join(process.cwd(), "data")}/lotteryConfig.json`;
const GUEST_INFORMATION_FILE_PATH = `${path.join(process.cwd(), "data")}/guestInformation.json`;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Lottery>) {

    const guests = await fs.readFile(GUEST_INFORMATION_FILE_PATH, "utf8");
    const parsedGuests: Array<Guest> = JSON.parse(guests);
    const femaleGuests = parsedGuests.filter(guest => guest.genre === 'female')
    const winnerIndex = Math.floor(Math.random() * femaleGuests.length);
    const winner = femaleGuests[winnerIndex];
    const updatedLotteryConfig: Lottery = { winner: winner.name, code: winner.code  }

    writeFileSync(LOTTERY_FILE_PATH, JSON.stringify(updatedLotteryConfig, null, 4));
    res.status(200).json(updatedLotteryConfig);
}  
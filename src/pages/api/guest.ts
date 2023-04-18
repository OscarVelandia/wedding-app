import { promises as fs, writeFileSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export interface Guest {
  cellphone?: string;
  code: string;
  genre: "male" | "female";
  isBacheloretteFormHidden: boolean;
  menu?: "vegetarian" | "carnivorous";
  name: string;
  willAttendToTheBacheloretteParty: boolean;
}

type HandlerRes = NextApiResponse<Guest | string>;

const FILE_PATH = `${path.join(process.cwd(), "data")}/guestInformation.json`;

export default async function handler(req: NextApiRequest, res: HandlerRes) {
  const fileContents = await fs.readFile(FILE_PATH, "utf8");
  const guests = JSON.parse(fileContents) as Array<Guest>;
  const guest = guests.find((guest: Guest) => guest.code === req.query.code);

  switch (req.method) {
    case "GET":
      getGuests(res, guest);
      break;

    case "POST":
      postGuests(res, guests, JSON.parse(req.body))
      break;
  }
}

function getGuests(res: HandlerRes, guest?: Guest) {
  if (guest) {
    res.status(200).json(guest);
  } else {
    res.status(400).json("Còdigo no valido!.");
  }
}

function postGuests(
  res: HandlerRes,
  guests: Array<Guest>,
  updatedGuest: Guest
) {
  try {
    const updatedGuests = guests.map(guest => {
      return guest.code === updatedGuest.code ? updatedGuest : guest;
    })
    writeFileSync(FILE_PATH, JSON.stringify(updatedGuests, null, 4));

    res.status(200).json(updatedGuest);
  } catch (error) {
    res.status(400).json(error as string);
  }
}

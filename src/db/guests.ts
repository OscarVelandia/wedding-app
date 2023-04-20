import {
  CollectionReference,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getRandomItemIndex } from "../utils/getRandomItemIndex";
import { database } from "./config";

export interface Guest {
  isAdmin: boolean;
  cellphone?: string;
  code: string;
  genre: "male" | "female";
  hasWon?: boolean;
  isBacheloretteFormHidden: boolean;
  menu?: "vegetarian" | "carnivorous";
  name: string;
  willAttend: boolean;
  willAttendToTheBacheloretteParty: boolean;
}

const guestsReference = collection(database, "guests") as CollectionReference<Guest>;

export const getAllGuests = async () => {
  return (await getDocs(guestsReference)).docs
}

export const getGuestByCode = async (code: string) => {
  const guestQuery = query(guestsReference, where("code", "==", code));
  const [guest] = (await getDocs(guestQuery)).docs;

  return { guest: guest?.data(), guestId: guest?.id };
};

const documentReferenceById = (id: string) => {
  return doc(database, "guests", id);
};

export const updateGuest = async (guestId: string, data: Guest) => {
  await updateDoc(documentReferenceById(guestId), { ...data });
};

type FemaleGuests = Array<Guest & { id: string}>

export const setLotteryWinner = async () => {
	const guests = await getAllGuests();
	const femaleGuests = guests.reduce((selectedGuests: FemaleGuests, currentGuest) => {
		const guest = currentGuest.data();
		
		if (guest.genre === 'female') selectedGuests.push({...guest, id: currentGuest.id})
		
		return selectedGuests
	}, [])
  const winnerIndex = getRandomItemIndex(femaleGuests.length);
  const {id: winnerId, ...winner} = femaleGuests[winnerIndex];

	await updateDoc(documentReferenceById(winnerId), {...winner, hasWon: true});

  return winner;
};

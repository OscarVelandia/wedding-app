import { database } from "@db/config";
import {
  CollectionReference,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export interface Guest {
  isAdmin: boolean;
  cellphone?: string;
  code: string;
  genre: "male" | "female";
  isBacheloretteFormHidden: boolean;
  menu?: "vegetarian" | "carnivorous";
  name: string;
  willAttend: boolean;
  willAttendToTheBacheloretteParty: boolean;
}

const guestsReference = collection(database, "guests") as CollectionReference<Guest>;

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

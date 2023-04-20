import { Guest } from "../db/guests";
import { Lottery } from "../pages/api/lotteryWinner";
import { customCreateContext } from "./customCreateContext";

interface GlobalContextType {
  guest: Guest | null;
  guestId: string | null;
  isCodeDialogOpen: boolean;
  winner: Lottery | null;
}

const initialState: GlobalContextType = {
  guest: null,
  guestId: null,
  isCodeDialogOpen: true,
  winner: null,
};

type Action =
  | { type: "SET_CODE_DIALOG_STATUS"; payload: boolean }
  | { type: "SET_GUEST"; payload: Guest }
  | { type: "SET_GUEST_ID"; payload: string }
  | { type: "SET_WINNER"; payload: Lottery };

function reducer(state: GlobalContextType, action: Action): GlobalContextType {
  switch (action.type) {
    case "SET_GUEST":
      return { ...state, guest: action.payload };

    case "SET_GUEST_ID":
      return { ...state, guestId: action.payload };

    case "SET_CODE_DIALOG_STATUS":
      return { ...state, isCodeDialogOpen: action.payload };

    case "SET_WINNER":
      return { ...state, winner: action.payload };

    default:
      // @ts-ignore Handle incorrect action type
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const [context, provider] = customCreateContext(reducer, initialState);

export const GlobalContext = context;

export const GlobalProvider = provider;

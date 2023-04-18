import { Guest } from "../pages/api/guest";
import { customCreateContext } from "./customCreateContext";

interface GlobalContextType {
  guest: Guest | null;
  isCodeDialogOpen: boolean;
}

const initialState: GlobalContextType = {
  guest: null,
  isCodeDialogOpen: true,
};

type Action =
  | { type: "SET_GUEST"; payload: Guest }
  | { type: "SET_CODE_DIALOG_STATUS"; payload: boolean };

function reducer(state: GlobalContextType, action: Action): GlobalContextType {
  switch (action.type) {
    case "SET_GUEST":
      return { ...state, guest: action.payload };

    case "SET_CODE_DIALOG_STATUS":
      return { ...state, isCodeDialogOpen: action.payload };

    default:
      // @ts-ignore Handle incorrect action type
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const [context, provider] = customCreateContext(reducer, initialState);

export const GlobalContext = context;

export const GlobalProvider = provider;

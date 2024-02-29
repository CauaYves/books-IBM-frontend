import { Reserve } from "@/api/books/findManyReserves";
import {
  createContext,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

export interface ReserveContextType {
  reservesList: Reserve[];
  setReservesList: Dispatch<SetStateAction<Reserve[]>>;
}

const reservesContext = createContext<ReserveContextType>({
  reservesList: [],
  setReservesList: () => {},
});

export default reservesContext;

export function ReservesProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [reservesList, setReservesList] = useState<Reserve[]>([]);

  const contextData = useMemo(
    () => ({
      reservesList,
      setReservesList,
    }),
    [reservesList, setReservesList]
  );

  return (
    <reservesContext.Provider value={contextData}>
      {children}
    </reservesContext.Provider>
  );
}

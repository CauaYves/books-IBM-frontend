import {
  createContext,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

export type BookCopy = {
  id: number;
  title: string;
  author: string;
  publicationYear: string;
  bookcopies: number;
};

export interface CopiesContextType {
  copiesList: BookCopy[];
  setCopiesList: Dispatch<SetStateAction<BookCopy[]>>;
}

const copiesContext = createContext<CopiesContextType>({
  copiesList: [],
  setCopiesList: () => {},
});

export default copiesContext;

export function CopiesProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [copiesList, setCopiesList] = useState<BookCopy[]>([]);

  const contextData = useMemo(
    () => ({
      copiesList,
      setCopiesList,
    }),
    [copiesList, setCopiesList]
  );

  return (
    <copiesContext.Provider value={contextData}>
      {children}
    </copiesContext.Provider>
  );
}

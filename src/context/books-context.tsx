import {
  createContext,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { Book } from "@/api/books/findManyBook";

export interface BookContextType {
  bookList: Book[];
  setBookList: Dispatch<SetStateAction<Book[]>>;
}

const booksContext = createContext<BookContextType>({
  bookList: [],
  setBookList: () => {},
});

export default booksContext;

export function BooksProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [bookList, setBookList] = useState<Book[]>([]);

  const contextData = useMemo(
    () => ({
      bookList,
      setBookList,
    }),
    [bookList, setBookList]
  );

  return (
    <booksContext.Provider value={contextData}>
      {children}
    </booksContext.Provider>
  );
}

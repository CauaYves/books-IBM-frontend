import {
  ReactNode,
  createContext,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

export interface ModuleContextType {
  module: string;
  setModule: Dispatch<SetStateAction<string>>;
}

const moduleContext = createContext<ModuleContextType | null>(null);

export default moduleContext;

export function ModuleProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [module, setModule] = useState("Books");

  const contextData = useMemo(
    () => ({
      module,
      setModule,
    }),
    [module, setModule]
  );

  return (
    <moduleContext.Provider value={contextData}>
      {children}
    </moduleContext.Provider>
  );
}

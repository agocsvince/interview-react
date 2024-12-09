import { createContext, useState, useContext, ReactNode, SetStateAction, Dispatch } from "react";

type contextType = {isChanging: boolean, setIsChanging: Dispatch<SetStateAction<boolean>>}
const defaultContextValue = { isChanging: false, setIsChanging: () => {}} as contextType
const TableChangeContext = createContext(defaultContextValue);

export const TableChangeProvider = ({ children }: {children: ReactNode}) => {
  const [isChanging, setIsChanging] = useState(false);

  return <TableChangeContext.Provider value={{ isChanging, setIsChanging}}>
    {children}
  </TableChangeContext.Provider>
}

export const useTableChange = () => useContext(TableChangeContext);
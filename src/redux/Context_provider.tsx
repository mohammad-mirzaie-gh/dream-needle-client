import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';  

interface ModalHandlersContextProps {  
    true_handler?: () => void;  
    false_handler?: () => void;  
    setTrueHandler: Dispatch<SetStateAction<() => void>>;  
    setFalseHandler: Dispatch<SetStateAction<() => void>>;  
}  

const ModalHandlersContext = createContext<ModalHandlersContextProps>({  
    setTrueHandler: () => {},  
    setFalseHandler: () => {},  
});  

export const useModalHandlers = () => {  
    return useContext(ModalHandlersContext);  
};  

const ModalHandlersProvider = ({ children }: { children: ReactNode }) => {  
    const [true_handler, setTrueHandler] = useState<() => void>(() => () => {});  
    const [false_handler, setFalseHandler] = useState<() => void>(() => () => {});  

    return (  
        <ModalHandlersContext.Provider value={{ true_handler, false_handler, setTrueHandler, setFalseHandler }}>  
            {children}  
        </ModalHandlersContext.Provider>  
    );  
};

export default ModalHandlersProvider
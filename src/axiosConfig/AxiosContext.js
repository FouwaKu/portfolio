import { createContext, useContext } from "react";


const AxiosContext = createContext(null);

export const useAxiosContext = () =>{
    const context = useContext(AxiosContext);
    if (!context) {
        throw new Error('useAxiosContext must be used within an AxiosProvider');
    }

    return context;
}

export default AxiosContext;
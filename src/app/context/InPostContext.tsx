import React, { createContext, useState } from 'react';

interface InPostContextType {
    inPost: number | null;
    setInPost: React.Dispatch<React.SetStateAction<number | null>>;
}

export const InPostContext = createContext<InPostContextType>({
    inPost: null,
    setInPost: () => { },
});

interface InPostProviderProps {
    children: React.ReactNode;
}

export const InPostProvider: React.FC<InPostProviderProps> = ({ children }) => {
    const [inPost, setInPost] = useState<number | null>(null);
    return (
        <InPostContext.Provider value={{ inPost, setInPost }}>
            {children}
        </InPostContext.Provider>
    );
};

import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface UIContextType {
    isChatOpen: boolean;
    setIsChatOpen: (isOpen: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <UIContext.Provider value={{ isChatOpen, setIsChatOpen }}>
            {children}
        </UIContext.Provider>
    );
};

export const useUI = () => {
    const context = useContext(UIContext);
    if (!context) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
};

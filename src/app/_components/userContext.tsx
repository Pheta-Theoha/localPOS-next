"use client"

// UserContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface UserContextType {
    username: string | null;
    loginTime: string | null;
    previousUser: string | null;
    setUsernameAndTime: (username: string | null, loginTime: string | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [username, setUsername] = useState<string | null>(null);
    const [loginTime, setLoginTime] = useState<string | null>(null);
    const [previousUser, setPreviousUser] = useState<string | null>(null);

    const setUsernameAndTime = (newUsername: string | null, newLoginTime: string | null) => {
        if (username && loginTime) {
            setPreviousUser(username);
        }
        setUsername(newUsername);
        setLoginTime(newLoginTime);
    };

    return (
        <UserContext.Provider value={{ username, loginTime, previousUser, setUsernameAndTime }}>
            {children}
        </UserContext.Provider>
    );
};

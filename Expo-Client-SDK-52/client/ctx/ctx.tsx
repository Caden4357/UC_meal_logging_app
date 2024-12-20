import { useContext, createContext, type PropsWithChildren, useEffect, useState } from 'react';
import { getAuthToken, setAuthToken, deleteAuthToken } from '@/context/useStorageState';

const AuthContext = createContext<{
    signIn: (token:string) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}>({
    signIn: () => null,
    signOut: () => null,
    session: null,
    isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = useContext(AuthContext);
    console.log('useSession', value);
    return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [session, setSession] = useState<string | null | undefined>(null);
    const [isLoading, setIsLoading] = useState(true);

    const signIn = async (token:string) => {
        try {
            const storageToken = await setAuthToken(token);
            setSession(token);
            setIsLoading(false);
        } catch (error) {
            console.log('Error getting token:', error);
        }
    }

    const signOut = async () => {
        try {
            await deleteAuthToken();
            setSession(null);
        } catch (error) {
            console.log('Error deleting token:', error);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signOut,
                session,
                isLoading,
            }}>
            {children}
        </AuthContext.Provider>
    );
}

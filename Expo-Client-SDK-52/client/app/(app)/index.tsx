import { Pressable, Text, View } from 'react-native';

import { useSession } from '@/ctx/ctx';
import { Link, Redirect, router } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
    const { signOut, session } = useSession();

    useEffect(() => {
        console.log('USE EFFECT');
        if (!session) {
            router.replace('/');
        }
    }, []);

    // console.log('session', session);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Pressable onPress={() => {
                // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
                signOut();
                router.replace('/');
            }}>
                <Text>
                    Sign Out
                </Text>
            </Pressable>
        </View>
    );
}

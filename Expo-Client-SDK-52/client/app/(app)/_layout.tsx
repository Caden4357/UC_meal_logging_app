// AppLayout.tsx
import { Text } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { useSession } from '@/ctx/ctx';

export default function AppLayout() {
    console.log('AppLayout');
    // const { session, isLoading } = useSession();

    // if (isLoading) {
    //     return <Text>Loading...</Text>;
    // }

    // if (!session) {
    //     return <Redirect href="/" />;
    // }

    return <Stack />;
}

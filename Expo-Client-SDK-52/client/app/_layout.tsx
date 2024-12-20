// import { Stack } from "expo-router";
// import '../global.css'
// export default function RootLayout() {
//   return (
//       <Stack>
//         <Stack.Screen name="index" options={{ headerShown: false }} />
//         <Stack.Screen name="register" options={{ headerShown: false }} />
//       </Stack>
//   )
// }

import { Slot } from 'expo-router';
import { SessionProvider } from '@/ctx/ctx';

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}

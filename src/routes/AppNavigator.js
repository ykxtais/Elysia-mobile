import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';

import BtnLanguage from '../components/BtnLanguage';
import BtnTheme from '../components/BtnTheme';

import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import DrawerRoutes from './Drawer.routes';

import { auth } from '../firebase/firebaseConfig';
import { useThemedStyles } from '../context/ThemeContext';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const styles = useThemedStyles(({ colors }) => StyleSheet.create({
    loader: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background },
  }));

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => { setUser(u); setLoading(false); });
    return unsub;
  }, []);

  if (loading) return <View style={styles.loader}><ActivityIndicator size="large" /></View>;

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      {!user ? (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: true,
              headerTitle: 'Login',
              headerRight: () => (
                <View style={{ flexDirection: 'row', paddingRight: 8 }}>
                  <BtnLanguage compact />
                  <BtnTheme compact />
                </View>
              ),
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: true,
              headerTitle: 'Cadastro',
              headerRight: () => (
                <View style={{ flexDirection: 'row', paddingRight: 8 }}>
                  <BtnLanguage compact />
                  <BtnTheme compact />
                </View>
              ),
            }}
          />
        </>
      ) : (
        <Stack.Screen name="Main" component={DrawerRoutes} />
      )}
    </Stack.Navigator>
  );
}

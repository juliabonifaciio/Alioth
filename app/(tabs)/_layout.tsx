import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { Colors } from '@/constants/Colors';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';

import Login from '@/app/screens/login';
import Index from '@/app/screens/Teachers/index';
import Profile from '@/app/screens/Teachers/profile';
import Timetable from '@/app/screens/Teachers/timetable';
import EditProfile from '@/app/screens/Teachers/edit'; 
import Password from '@/app/screens/password';

// Define o tipo das rotas para o Stack Navigator
export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  EditProfile: undefined;
  Password: undefined;
};

// Define o tipo das rotas para o Tab Navigator
export type MainTabParamList = {
  Index: undefined;
  Profile: undefined;
  Timetable: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Função que configura o navegador com abas (Bottom Tabs)
function BottomTabNavigator() {
  const { theme } = useTheme(); // Usa o hook para obter o tema atual.
  const currentColors = Colors[theme];
  
  return (
    <Tab.Navigator // Menu de navegação
      screenOptions={{
        tabBarStyle: {
          height: '6%',
          backgroundColor: currentColors.headerMenuAndDetails,
          borderTopWidth: 0,  // Remove a borda superior
        },
        tabBarActiveTintColor: currentColors.secondaryDetails,
        headerShown: false,
        tabBarLabel: () => null, // Esconde os rótulos de texto das abas
      }}
    >

      <Tab.Screen
        name='Index' 
        component={Index}
        options={{
          tabBarIcon: ({ color, focused }: any) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      
      <Tab.Screen 
        name='Timetable' 
        component={Timetable}
        options={{
          tabBarIcon: ({ color, focused }: any) => (
            <TabBarIcon name={focused ? 'time' : 'time-outline'} color={color} />
          ),
        }}
      />
      
      <Tab.Screen 
        name='Profile' 
        component={Profile}
        options={{
          tabBarIcon: ({ color, focused }: any) => (
            <TabBarIcon name={focused ? 'school' : 'school-outline'} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Função que configura o navegador estilo stack (Stack Navigator)
function MainNavigator() {
  const { theme } = useTheme();
  const currentColors = Colors[theme];

  return (
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: currentColors.headerMenuAndDetails,
        },
      }}
    >
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Main' component={BottomTabNavigator} />
      <Stack.Screen name='EditProfile' component={EditProfile} />
      <Stack.Screen name='Password' component={Password} />
    </Stack.Navigator>
  );
}

// Função principal que renderiza o aplicativo com o provedor de tema e navegação
export default function TabLayout() {
  return (
    <ThemeProvider>      
      <MainNavigator/>
    </ThemeProvider>
  );
}
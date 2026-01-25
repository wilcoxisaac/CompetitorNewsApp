import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import BankingNewsScreen from './src/screens/BankingNewsScreen';
import POSNewsScreen from './src/screens/POSNewsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Banking') {
              iconName = focused ? 'business' : 'business-outline';
            } else if (route.name === 'POS') {
              iconName = focused ? 'card' : 'card-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen
          name="Banking"
          component={BankingNewsScreen}
          options={{
            title: 'Banking News',
            tabBarLabel: 'Banking',
          }}
        />
        <Tab.Screen
          name="POS"
          component={POSNewsScreen}
          options={{
            title: 'POS News',
            tabBarLabel: 'POS',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

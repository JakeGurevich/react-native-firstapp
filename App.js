import React, {useState} from 'react';
import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';

import {
  FlatList,
  Text,
  Button,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import EditListScreen from './src/screens/EditListScreen';
import ListScreen from './src/screens/ListScreen';
import AppStateProvider from './src/context/AppStateProvider';
import StudentsListScreen from './src/screens/StudentsListScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AppStateProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="My Lists">
          <Stack.Screen name="Edit" component={EditListScreen} />
          <Stack.Screen name="My Lists" component={ListScreen} />
          <Stack.Screen name="Students" component={StudentsListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppStateProvider>
  );
};
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  item: {
    padding: 5,
    backgroundColor: 'lightgrey',

    fontSize: 20,
    width: '70%',
  },
  btn: {
    marginTop: 20,
  },
  h1: {
    fontSize: 30,
  },
  input: {
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,
    width: '80%',
  },
  flex: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

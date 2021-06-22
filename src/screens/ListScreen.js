import React, {useState, useContext} from 'react';
import {
  FlatList,
  Text,
  Button,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {AppStateContext} from '../context/AppStateProvider';
const ListScreen = ({navigation, route}) => {
  const {lists} = useContext(AppStateContext);

  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
        }}>
        <ScrollView>
          {lists.map((item, index) => {
            return (
              <TouchableOpacity
                key={index.toString()}
                onPress={() => navigation.navigate('Edit', {id: item.id})}>
                <View
                  style={{
                    width: 300,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#fad390',
                  }}>
                  <Text style={styles.item}>{index + 1} :</Text>
                  <Text style={styles.item}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <Button
          title="Students List"
          onPress={() => navigation.navigate('Students')}
        />
      </View>
    </>
  );
};

export default ListScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  item: {
    marginTop: 5,
    marginRight: 10,
    fontSize: 16,
  },
  btn: {
    marginTop: 20,
  },
  h1: {
    fontSize: 50,
  },
  input: {
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,
    width: '60%',
  },
});

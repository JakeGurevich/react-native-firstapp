import React, {useState, useContext, useEffect} from 'react';
import 'react-native-gesture-handler';
import ListItem from '../components/ListItem';
import ReadyList from '../components/ReadyList';
import Icon from 'react-native-vector-icons/FontAwesome';
import ButtomBar from '../components/ButtomBar';
import {AppStateContext} from '../context/AppStateProvider';
import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  Button,
  StyleSheet,
  View,
} from 'react-native';

const EditListScreen = ({navigation, route}) => {
  const {id} = route.params;
  const {lists, setLists} = useContext(AppStateContext);

  const [list, setList] = useState([]);
  const [input, setInput] = useState('');
  const [readyList, setReadyList] = useState([{id: '1122', value: 'milk'}]);
  const handleInput = enteredText => {
    setInput(enteredText);
  };
  const editListItem = listItem => {
    if (!listItem.isActive) {
      const tempList = list.map(item => {
        return item.id === listItem.id
          ? {...item, isActive: true}
          : {...item, isActive: false};
      });
      setList(tempList);
    } else {
      const tempList = list.map(item => {
        return {...item, isActive: false};
      });
      setList(tempList);
    }
  };
  const addObjItem = obj => {
    console.log(obj);
    setList([...list, obj]);
  };
  const addItem = () => {
    setList([...list, {id: Math.random().toString(), value: input}]);
  };
  const addItemToRL = item => {
    console.log(item);
    console.log('item');
    setReadyList([...readyList, item]);
  };
  const deleteItem = id => {
    setList(currentList => {
      return currentList.filter(item => item.id !== id);
    });
  };
  useEffect(() => {
    const initialList = lists.filter(list => {
      console.log(list);
      return list.id === id;
    });
    console.log(initialList[0]);
    setList(initialList[0].items);
  }, []);
  return (
    <View style={styles.container}>
      {console.log(list)}
      {readyList && <ReadyList list={readyList} add={addObjItem} />}
      <Text style={styles.h1}>Need to buy{console.log(list)} :</Text>
      <View style={styles.flex}>
        <TextInput
          style={styles.input}
          value={input}
          placeholder="Add new item ..."
          onChangeText={handleInput}></TextInput>
        <Button style={styles.btn} title="Add" onPress={addItem} />
      </View>
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={list}
          renderItem={({item}) => (
            <ListItem
              item={item}
              delete={deleteItem}
              add={addItemToRL}
              edit={editListItem}
            />
          )}
          numColumns={3}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <ButtomBar />
    </View>
  );
};

export default EditListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  item: {
    padding: 5,
    backgroundColor: 'lightgrey',

    fontSize: 20,
  },
  btn: {
    marginTop: 20,
  },
  h1: {
    fontSize: 30,
  },
  input: {
    padding: 5,

    width: '70%',
    borderBottomWidth: 1,
    borderBottomColor: 'blue',
  },
  flex: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    marginTop: 16,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  iconContainer: {
    marginTop: 16,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

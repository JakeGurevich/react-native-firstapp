import React, {useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Button} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
const ListItem = props => {
  const [edit, setEdit] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        props.edit(props.item);
      }}>
      <View style={styles.wrap}>
        {props.item.isActive ? (
          <View style={styles.flex}>
            <Icon.Button
              name="close"
              // style={{width: 40, size: 20, iconStyle: {margin: 0}}}
              backgroundColor="#d63031"
              onPress={() => {
                props.delete(props.item.id);
              }}></Icon.Button>

            <Icon.Button
              name="plus"
              backgroundColor="#3b5998"
              onPress={() => {
                props.add(props.item);
              }}></Icon.Button>
          </View>
        ) : null}
        <Text style={styles.item}>{props.item.value}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  item: {
    paddingVertical: 10,

    backgroundColor: 'coral',
    borderRadius: 4,
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
  },
  btn: {
    alignSelf: 'center',
    width: '50%',
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
    width: '100%',
    justifyContent: 'space-between',
  },
  wrap: {
    width: 100,

    marginTop: 10,
    marginLeft: 10,
  },
});

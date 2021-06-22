import React from 'react';
import {
  Touchable,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const ReadyList = props => {
  return (
    <View style={styles.containerList}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={props.list}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              props.add(item);
            }}>
            <View style={styles.item}>
              <Text>
                {item.value}
                {console.log(item)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        horizontal={true}
      />
    </View>
  );
};

export default ReadyList;
const styles = StyleSheet.create({
  containerList: {
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 5,
    height: 60,
    marginTop: 10,
  },
  item: {
    paddingHorizontal: 10,
    backgroundColor: '#ffeaa7',
    marginLeft: 10,
    height: '90%',
    borderRadius: 4,

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    fontSize: 17,
    // width: '70%',
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

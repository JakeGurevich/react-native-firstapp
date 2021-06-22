import React from 'react';
import {
  FlatList,
  Text,
  Button,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
const ButtomBar = () => {
  return (
    <View style={styles.flex}>
      <TouchableOpacity>
        <View>
          <Text style={styles.block}>Lists</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View>
          <Text style={styles.block}>Edit</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View>
          <Text style={styles.block}>More</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ButtomBar;
const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  block: {
    fontSize: 30,
  },
});

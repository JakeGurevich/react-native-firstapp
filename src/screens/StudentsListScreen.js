import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  FlatList,
  Text,
  Button,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

const StudentsListScreen = () => {
  const [list, setList] = useState('');
  const getStudents = async () => {
    const data = {
      search: '',
      sorting: 'userid',
      desc: true,
      userstatus: 1,
      page: 0,
      token: '11750dc91b6898b32cf0cfb09519f9e22bb4',
    };
    try {
      const res = await axios.post(
        'http://54.93.207.96/server/datagate.php?type=SearchNewUsers',
        data,{ transformResponse: (r) => r }
      );
     console.log(res.headers,typeof res.data)
     const resjson= JSON.parse(res.data)
     console.log(resjson)
      // setList(res.data);
    } catch (error) {
      {
        error;
      }
    }
  };
  useEffect(() => {
    getStudents();
  });
  return (
    <View>
      <Text>Students list{list}</Text>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={list}
        renderItem={({item}) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({});
export default StudentsListScreen;

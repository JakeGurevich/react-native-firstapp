import React, {useEffect, useState} from 'react';
import api from '../api/api';
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
  // const [token, setToken] = useState('');

  function replacestr(str ,replace, raplacer ){
    const newStr = str.replace(replace, raplacer)
    console.log(`Old string : ${str}`)
    console.log(`New string : ${newStr}`)
    return newStr
  }
  function splitString(stringToSplit, separator) {
    const arrayOfStrings = stringToSplit.split(separator)
  
    console.log('The original string is: ', stringToSplit)
    console.log('The separator is: ', separator)
    // console.log('The array has ', arrayOfStrings.length, ' elements: ', arrayOfStrings.join(' / '))
    const arr = arrayOfStrings.map((array,i) => console.log(`Array ${i} : ${array}`))
  }
  
  
  
  const space = ' '
  const comma = '},'
 const logIn = async()=>{
 const res = await api.post('/datagate.php?type=login',{
  email:"admin@email.com",
  pass:"1234"
})
let tokenArr = res.data.split(',')
let token = tokenArr[0].replace('{"token":','')
token = token.replace(/\"/g,'')
console.log(token)
 getStudents(token)
 }
 
  const getStudents = async (tok) => {
    const data = {
      search: '',
      sorting: 'userid',
      desc: true,
      userstatus: 1,
      page: 0,
      token:tok,
      
      
    };
    console.log(data)
    
    try {
      const res = await api.post(
        'datagate.php?type=SearchNewUsers',
      data,
      );
    //  console.log(res)
    // const resjson= eval(res.data)
    // const datajson = JSON.parse(resjson)
    //  console.log(` raw data : ${resjson}`)
    let newStr = replacestr(res.data,'{"users":','')
    newStr =replacestr(newStr,'"pages":124}','')
    console.log(typeof newStr)
    splitString(newStr,comma)
    //  const arr = JSON.parse(newStr)
    //  console.log(arr)
      setList(res.data);
    } catch (error) {
      {
        error;
      }
    }
  };
  useEffect(() => {
    logIn()
   
   
  },[]);
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

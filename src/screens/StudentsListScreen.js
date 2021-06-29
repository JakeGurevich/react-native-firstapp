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
  ScrollView,
} from 'react-native';

const StudentsListScreen = () => {
  const [list, setList] = useState('');
  // const [objNames, setObjNames] = useState([]);
  // const [columnNames, setColumnNames] = useState([]);
  const [selectedHeaders, setSelectedHeaders] = useState([]);
  const [headers, setHeaders] = useState([
    {columnName: 'First name', objName: 'firstname', isSelected: true},
    {columnName: 'Last name', objName: 'lastname', isSelected: true},
    {columnName: 'City', objName: 'cityname', isSelected: true},
    {columnName: 'Phone', objName: 'phone', isSelected: false},
    {columnName: 'Email', objName: 'email', isSelected: false},
    {columnName: 'Birthday', objName: 'birthday', isSelected: false},
    {
      columnName: 'FN  in arabic',
      objName: 'firstnameinarabic',
      isSelected: false,
    },
    {
      columnName: 'LN in arabic',
      objName: 'lastnameinarabic',
      isSelected: false,
    },
    {columnName: 'User id', objName: 'userid', isSelected: false},
    {columnName: 'T.z.', objName: 'tznumber', isSelected: false},
    {columnName: 'Religion name', objName: 'religionname', isSelected: false},
  ]);

  //{itemKey:columnName, firstName:First Name}

  function replacestr(str, replace, raplacer) {
    const newStr = str.replace(replace, raplacer);

    return newStr;
  }

  function splitArray(arr, i) {
    let temp = arr.split(',')[i].split(':')[1].replace(/"/g, '');
    if (temp.includes('\\u')) {
      temp = '{UNICODE}';
      // temp = temp.split('\\');
      //   let arr = [];
      //   for (let i = 1; i < temp.length - 1; i++) {
      //     temp[i] = temp[i].replace('u', '\\u');
      //     arr.push(temp[i]);
      //   }
      //   console.log(arr);
    }
    return temp;
  }

  function splitString(stringToSplit) {
    const arrayOfStrings = stringToSplit.split('},');

    let newArr = [];
    for (let i = 0; i < arrayOfStrings.length; i++) {
      newArr.push({
        userid: splitArray(arrayOfStrings[i], 0),
        firstname: splitArray(arrayOfStrings[i], 1),
        lastname: splitArray(arrayOfStrings[i], 2),
        firstnameinarabic: splitArray(arrayOfStrings[i], 3),
        lastnameinarabic: splitArray(arrayOfStrings[i], 4),
        tznumber: splitArray(arrayOfStrings[i], 5),
        phone: splitArray(arrayOfStrings[i], 6),
        birthday: splitArray(arrayOfStrings[i], 7),
        email: splitArray(arrayOfStrings[i], 8),
        cityname: splitArray(arrayOfStrings[i], 9),
        gendername: splitArray(arrayOfStrings[i], 10),
        religionname: splitArray(arrayOfStrings[i], 11),
      });
    }
    return newArr;
  }

  const logIn = async () => {
    const res = await api.post('/datagate.php?type=login', {
      email: 'admin@email.com',
      pass: '1234',
    });
    let tokenArr = res.data.split(',');
    console.log(tokenArr);
    let token = tokenArr[0].replace('{"token":', '');
    token = token.split('"')[1];

    console.log('token:', token);
    getStudents(token);
  };

  const getStudents = async tok => {
    const data = {
      search: '',
      sorting: 'userid',
      desc: true,
      userstatus: 1,
      page: 0,
      token: tok,
    };
    console.log(data.token);

    try {
      const res = await api.post('/datagate.php?type=SearchNewUsers', data);

      let newStr = replacestr(res.data, '{"users":', '');
      newStr = replacestr(newStr, '"pages":124}', '');

      const studentsList = splitString(newStr);

      setList(studentsList);
      // let name = studentsList[0].firstname;
      // name = name.split('\\')[1];
      // name = name.replace('u', '\\u');
      // name = name.replace('d', 'D');
      // console.log(name);
      // setTok(name);
      console.log(studentsList[0]);
    } catch (error) {
      {
        error;
      }
    }
  };
  const createSelectedHeaders = () => {
    const filteredHeaders = headers.filter(item => item.isSelected === true);
    setSelectedHeaders(filteredHeaders);
  };

  const editHeaders = item => {
    console.log(item);
    const mapedHeaders = headers.map(header => {
      return header.objName === item.objName
        ? {...header, isSelected: !header.isSelected}
        : {...header};
    });
    console.log(mapedHeaders);
    setHeaders(mapedHeaders);
  };
  useEffect(() => {
    createSelectedHeaders();
  }, [headers]);
  useEffect(() => {
    logIn();
  }, []);
  return (
    <View style={{flex: 1}}>
      <View style={styles.headers}>
        {headers.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => editHeaders(item)}
              style={styles.itemWrap}>
              <Text style={styles.item}>{item.columnName}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.h1}>{console.log(selectedHeaders)}</Text>
      <Text style={styles.h1}>Students list</Text>
      {/* <View style={styles.listHeader}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={selectedHeaders}
          horizontal
          renderItem={({item}) => (
            <>
              <Text style={styles.headerRow}>{item.columnName}</Text>
            </>
          )}
        />
      
      </View> */}
      {/* <View style={styles.listWrapper}> */}
      <ScrollView horizontal style={{width: '100%'}}>
        <ScrollView>
          <View style={styles.listHeader}>
            {selectedHeaders.map(header => {
              return <Text style={styles.headerRow}>{header.columnName}</Text>;
            })}
          </View>
          {list.length > 1 &&
            list.map(item => {
              return (
                <View key={item.userid} style={styles.listWrapper}>
                  {selectedHeaders.map(header => {
                    return (
                      <Text style={styles.row}>{item[header.objName]}</Text>
                    );
                  })}
                </View>
              );
            })}
        </ScrollView>
      </ScrollView>
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#3D9970',
    paddingHorizontal: 5,
    paddingLeft: 10,
  },
  listWrapper: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // backgroundColor: '',
    borderBottomWidth: 1,
    borderBottomColor: '#7FDBFF',
    paddingVertical: 10,
    paddingHorizontal: 5,
    paddingLeft: 10,
  },
  row: {flex: 1, width: 100},
  headerRow: {
    flex: 1,
    fontSize: 20,
    width: 100,
  },
  h1: {
    fontSize: 20,
    alignSelf: 'center',
    padding: 10,
    fontWeight: 'bold',
  },
  headers: {
    flexDirection: 'row',
    width: '100%',
    height: 30,
    marginTop: 10,
  },
  itemWrap: {
    flex: 1,
    height: 30,
    backgroundColor: '#FF851B',
    marginLeft: 5,
  },
  item: {
    fontSize: 15,
  },
});
export default StudentsListScreen;

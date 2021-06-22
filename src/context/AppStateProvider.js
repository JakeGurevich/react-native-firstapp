import React, {useState} from 'react';
export const AppStateContext = React.createContext();
const AppStateProvider = props => {
  const [lists, setLists] = useState([
    {
      title: 'Demo list',
      id: '133',
      items: [
        {id: '11111', value: 'bread'},
        {id: '11112', value: 'water'},
        {id: '11113', value: 'milk'},
      ],
    },
    {
      title: 'Demo ',
      id: '134',
      items: [
        {id: '11111', value: 'bread'},
        {id: '11112', value: 'water'},
        {id: '11113', value: 'milk'},
      ],
    },
  ]);
  const context = {lists, setLists};
  return (
    <AppStateContext.Provider value={context}>
      {props.children}
    </AppStateContext.Provider>
  );
};
export default AppStateProvider;

import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';

export default function (props) {
  const {birthday, deleteBirthday} = props;
  /* devuelve true o false si falta para llegar o si ya paso */
  const pasat = birthday.days > 0 ? true : false;



  const infoDay = () => {
    if(birthday.days === 0){
      return <Text style={{color: "#767180", fontSize: 25}}>¡Hoy Cumple años!</Text>
    } else{
      const days = -birthday.days;
      
      return(
        <View style={styles.textCurrent}>
          <Text>{days}</Text>
          <Text>{days === 1 ? 'Dia' : 'Dias'}</Text>
        </View>
      )
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        pasat
          ? styles.pasat
          : birthday.days === 0
          ? styles.actual
          : styles.current,
      ]}
      onPress={() => deleteBirthday(birthday)}>
      <Text style={styles.userName}>
        {' '}
        {birthday.name} {birthday.lastname}{' '}
      </Text>
      {pasat ? <Text style={{color: '#767180', fontSize: 20}}>Ya Paso</Text> : infoDay()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 10,
    margin: 12,
    borderRadius: 15,
    marginTop:5,
  },
  current: {
    backgroundColor: '#d8fcfc',
  },
  pasat: {
    backgroundColor: '#ebe2ff',
  },
  actual: {
    backgroundColor: '#66FF00',
  },
  userName: {
    color: '#3d464c',
    fontSize: 20, 
  },
  textCurrent:{
    width:50,
    alignItems:'center',
    borderRadius:14,
    justifyContent:'center',
    backgroundColor:"#f2fefe",
  }
});

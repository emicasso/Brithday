import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGadient from 'react-native-linear-gradient';
import firebase from '../utils/firebase';

export default function ActionBar(props) {
  const {showList, setShowList} = props;

  return (
    <View style={styles.viewFooter}>
      <View style={styles.viewClose}>
        <LinearGadient colors={['#f9caca', '#fc9995']} style={styles.viewClose}>
          {/* con el firebase y su funcion signOut podemos cerrar sesion */}
          <Text style={styles.text} onPress={() => firebase.auth().signOut()}>
            Cerrar Session
          </Text>
        </LinearGadient>
      </View>
      <View style={styles.viewAdd}>
        <LinearGadient colors={['#e1caf9', '#cacaf9']} style={styles.viewAdd}>
          {/* con la destructuracion del showlist podemos agregar cumpleaños simpre devolviedo lo contrario */}
          <Text style={styles.text} onPress={() => setShowList(!showList)}>
            {showList ? 'Nueva Fecha' : 'Cancelar Fecha'}
          </Text>
        </LinearGadient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewFooter: {
    width:'100%',
    bottom: 0,
    height: 60,
    position: 'absolute',
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },
  viewClose: {
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginHorizontal: -15,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  viewAdd: {
    borderRadius: 50,
    paddingVertical: 10,
    marginHorizontal: -5,
    paddingHorizontal: 30,
  },
});

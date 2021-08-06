import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import firebase from '../utils/firebase';
import 'firebase/firestore';

/* implementacion para que funcione el firebase en android  */
firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase);

export default function AddBirthday(props) {
  const {user, setShowList, setReloadData} = props;
  const [formData, setformData] = useState({});
  const [isDatePicketVisible, setisDatePicketVisible] = useState(false);
  const [formError, setFormError] = useState({});

  /*ocultar el calendario una vez seleccionado*/
  const hideDatePicker = () => {
    setisDatePicketVisible(false);
  };

  /* mostrar el calendario para elejir la fecha de nacimiento */
  const showDatePicker = () => {
    setisDatePicketVisible(true);
  };

  /* confirmar el calendario, crea la fecha con hs00*/
  const handlerConfirm = (date) => {
    const dateBirth = date;
    dateBirth.setHours(0);
    dateBirth.setMinutes(0);
    dateBirth.setSeconds(0);
    setformData({...formData, dateBirth});
    hideDatePicker();
  };

  /* actualizar en base de datos firebase */
  const onChange = (e, type) => {
    setformData({...formData, [type]: e.nativeEvent.text});
  };

  /* confirmar si no hay errores y subir a firebase*/
  const onSubmit = () => {
    let errors = {};
    if (!formData.name || !formData.lastname || !formData.dateBirth) {
      if (!formData.name) errors.name = true;
      if (!formData.lastname) errors.lastname = true;
      if (!formData.dateBirth) errors.dateBirth = true;
    } else {
    /* gestiona el cumpleaños de forma automatica pasando por todos los años sin hacer nada */
      const data = formData;
      data.dateBirth.setYear(0);
      /* crear una coleccion para cada id de usuario, trayendo el props user desde el app.js */
      db.collection(user.uid)
        .add(data)
        //nos devuelve a la lista de cumpleaños una vez cargada la fecha 
        .then(() => {
          /* lo trajimos a travez de los props */
          setReloadData(true);
          setShowList(true);
        })
        .catch(() => {
          setFormError({name: true, lastname: true, dateBirth: true});
        });
    }
    setFormError(errors);
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={[styles.input, formError.name && {borderColor: '#940c0c'}]}
          placeholder="Nombre"
          placeholderTextColor="#969696"
          onChange={(e) => onChange(e, 'name')}
        />
        <TextInput
          style={[styles.input, formError.lastname && {borderColor: '#940c0c'}]}
          placeholder="Apellido"
          placeholderTextColor="#969696"
          onChange={(e) => onChange(e, 'lastname')}
        />
        <View
          style={[
            styles.input,
            styles.datePicker,
            formError.dateBirth && {borderColor: '#940c0c'},
          ]}>
          <Text
            style={{
              color: formData.dateBirth ? '#fff' : '#969696',
              fontSize: 18,
            }}
            onPress={showDatePicker}>
            {formData.dateBirth
              ? moment(formData.dateBirth).format('LL')
              : 'Fecha de Nacimiento'}
          </Text>
        </View>
        <TouchableOpacity onPress={onSubmit}>
          <Text style={styles.addButton}>Crear Cumpleaños</Text>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={isDatePicketVisible}
        mode="date"
        onConfirm={handlerConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    color: '#fff',
    width: '80%',
    marginBottom: 25,
    backgroundColor: '#1e3040',
    paddingHorizontal: 20,
    paddingRight: 50,
    fontSize: 18,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#1e3040',
  },
  datePicker: {
    justifyContent: 'center',
  },
  addButton: {
    fontSize: 18,
    color: '#6a7e7e',
  },
});

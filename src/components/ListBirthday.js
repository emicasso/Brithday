import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Alert,
  View,
  ScrollView,
  ImageBackground,
} from 'react-native';
import moment from 'moment';
import AddBirthday from './AddBirthday';
import ActionBar from './ActionBar';
import Birthday from './Birthday';
import firebase from '../utils/firebase';
import 'firebase/firestore';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase);

export default function ListBirthday(props) {
  const {user} = props;
  const [showList, setShowList] = useState(true);
  /* estado para cumpleados por llegar */
  const [birthday, setBirthday] = useState([]);
  /* estado para cumpleados pasados */
  const [pasatBirthday, setPasatBirthday] = useState([]);
  /* recargar los datos automaticamente (true se vuelve a ejecutar el useEffect) */
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => {
    setBirthday([]);
    setPasatBirthday([]);
    db.collection(user.uid)
      .orderBy('dateBirth', 'asc')
      .get()
      .then((response) => {
        const itemsArray = [];
        response.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          itemsArray.push(data);
        });
        formatData(itemsArray);
      });
    setReloadData(false);
  }, [reloadData]);

  /* se encarga de separar todos los cumpleaños */
  const formatData = (items) => {
    const currentDate = moment().set({
      hours: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
    const birthdayTempArray = [];
    const pasastBirthdayTempArray = [];

    items.forEach((item) => {
      /* fecha actual del cumpleaños que hemos ingresado */
      const dateBirth = new Date(item.dateBirth.seconds * 1000);
      /* creamos el objeto fecha con moment */
      const dateBrithday = moment(dateBirth);
      /* obtenemos el año actual en el que estamos */
      const currentYear = moment().get('year');
      dateBrithday.set({year: currentYear});

      const diffDate = currentDate.diff(dateBrithday, 'days');
      const itemTemp = item;
      itemTemp.dateBirth = dateBrithday;
      itemTemp.days = diffDate;

      if (diffDate <= 0) {
        birthdayTempArray.push(itemTemp);
      } else {
        pasastBirthdayTempArray.push(itemTemp);
      }
    });
    setBirthday(birthdayTempArray);
    setPasatBirthday(pasastBirthdayTempArray);
  };

  const deleteBirthday = (birthday) => {
    Alert.alert(
      'Eliminar Cumpleaños',
      `¿Estas seguro de eliminar el cumpleaños de ${birthday.name} ${birthday.lastname} `,
      [
        {
          text: 'Cancelar',
          styles: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => {
            db.collection(user.uid)
              .doc(birthday.id)
              .delete()
              .then(() => {
                setReloadData();
              });
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <ImageBackground
      source={require('../assets/fondo.png')}
      style={styles.container}>
      {showList ? (
        //el scrollview sirve para poder deslizar hacia abajo o arriba en caso de que se llene la pantalla
        <ScrollView style={styles.scrollView}>
          {/* mostrar los cumpleaños por venir */}
          {birthday.map((item, index) => (
            <Birthday
              key={index}
              birthday={item}
              deleteBirthday={deleteBirthday}
            />
          ))}
          {/* mostrar los cumpleaños pasados */}
          {pasatBirthday.map((item, index) => (
            <Birthday
              key={index}
              birthday={item}
              deleteBirthday={deleteBirthday}
            />
          ))}
        </ScrollView>
      ) : (
        <AddBirthday
          user={user}
          setShowList={setShowList}
          setReloadData={setReloadData}
        />
      )}
      <ActionBar showList={showList} setShowList={setShowList} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
  },
  scrollView: {
    marginBottom: 50,
    width: '100%',
  },
});

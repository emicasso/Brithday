import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import LinearGadient from 'react-native-linear-gradient';
import {validateEmail} from '../utils/validations';
import firebase from '../utils/firebase';

export default function LoginForm(props) {
  const {changeForm} = props;
  const [formData, setFormData] = useState(defaultValue());
  const [formError, setFormError] = useState({});

  /* comprovacion de errores a la hora de cargar los usuarios a firebase */
  const login = () => {
    let errors = {};
    if (!formData.email || !formData.password) {
      if (!formData.email) errors.email = true;
      if (!formData.password) errors.password = true;
    } else if (!validateEmail(formData.email)) {
      errors.email = true;
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          console.log('ok');
        })
        .catch(() => {
          setFormError({
            email: true,
            password: true,
          });
        });
    }
    setFormError(errors);
  };

  const onChange = (e, type) => {
    /* recuperar datos anteriores y actualizar, sirve para guardar datos del formulario en un solo estado*/
    setFormData({...formData, [type]: e.nativeEvent.text});
  };

  return (
    <>
      <TextInput
        style={[styles.input, formError.email && styles.error]}
        placeholder="Correo Electronico"
        placeholderTextColor="#535b65"
        onChange={(e) => onChange(e, 'email')}
      />
      <TextInput
        style={[styles.input, formError.password && styles.error]}
        placeholder="Contraseña"
        placeholderTextColor="#535b65"
        secureTextEntry={true}
        onChange={(e) => onChange(e, 'password')}
      />

      <View style={styles.register}>
        <TouchableOpacity onPress={login}>
          <LinearGadient colors={['#ece4fc','#eee7fc']} style={styles.btnText}>
            <Text style={styles.btnText}>Iniciar Sesion</Text>
          </LinearGadient>
        </TouchableOpacity>
      </View>

      <View style={styles.register}>
        <TouchableOpacity onPress={changeForm}>
          <LinearGadient colors={['#ece4fc','#eee7fc']} style={styles.btnText}>
            <Text style={styles.btnText}>Registrate</Text>
          </LinearGadient>
        </TouchableOpacity>
      </View>
    </>
  );
}

function defaultValue() {
  return {
    email: '',
    password: '',
  };
}

const styles = StyleSheet.create({
  btnText: {
    color: '#76727e',
    fontSize: 19,
    borderRadius: 50,
    paddingVertical: 7,
    paddingHorizontal: 25,
  },
  input: {
    color: '#f3f3f4',
    width: '80%',
    height: 55,
    fontSize: 18,
    borderWidth: 1,
    marginBottom: 25,
    borderRadius: 50,
    paddingHorizontal: 20,
    borderColor: '#b0b6ca',
    backgroundColor: '#9aa0b0',
  },
  register: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 25,
  },
  error: {
    borderColor: '#dd617d',
  },
});

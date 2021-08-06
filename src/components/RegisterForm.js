import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import LinearGadient from 'react-native-linear-gradient';
import {validateEmail} from '../utils/validations';
import firebase from '../utils/firebase';

export default function RegisterForm(props) {
  const {changeForm} = props;
  const [formData, setFormData] = useState(defaultValue());
  const [formError, setFormError] = useState({});

  /* validaciones para comprobar si los campos son validos y si estan correctos */
  const register = () => {
    let errors = {};
    if (!formData.email || !formData.password || !formData.repeatPassword) {
      if (!formData.email) errors.email = true;
      if (!formData.password) errors.password = true;
      if (!formData.repeatPassword) errors.repeatPassword = true;
    } else if (!validateEmail(formData.email)) {
      errors.email = true;
    } else if (formData.password != formData.repeatPassword) {
      errors.password = true;
      errors.repeatPassword = true;
    } else if (formData.password.length < 6) {
      errors.password = true;
      errors.repeatPassword = true;
    } else {
      /* crea un usuario en la base de datos creada de firebase */
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .catch(() => {
          setFormError({
            email: true,
            password: true,
            repeatPassword: true,
          });
        });
    }
    setFormError(errors);
  };

  return (
    <>
      {/* sirven para ingresar los datos */}
      <TextInput
        style={[styles.input, formError.email && styles.error]}
        placeholder="Correo Electronico"
        placeholderTextColor="#535b65"
        /* pide el valor actual, y luego cambia con lo agregado */
        onChange={(e) => setFormData({...formData, email: e.nativeEvent.text})}
      />
      <TextInput
        style={[styles.input, formError.password && styles.error]}
        placeholder="Contraseña"
        placeholderTextColor="#535b65"
        /* hace que la contraseña sea oculta */
        secureTextEntry={true}
        onChange={(e) =>
          setFormData({...formData, password: e.nativeEvent.text})
        }
      />
      <TextInput
        style={[styles.input, formError.repeatPassword && styles.error]}
        placeholder="Confirmar Contraseña"
        placeholderTextColor="#535b65"
        secureTextEntry={true}
        onChange={(e) =>
          setFormData({...formData, repeatPassword: e.nativeEvent.text})
        }
      />
      <View style={styles.login}>
        <TouchableOpacity onPress={register}>
          <LinearGadient colors={['#ece4fc', '#eee7fc']} style={styles.btnText}>
            <Text style={styles.btnText}>Registrate</Text>
          </LinearGadient>
        </TouchableOpacity>
      </View>

      <View style={styles.login}>
        <TouchableOpacity onPress={changeForm}>
          <LinearGadient colors={['#ece4fc', '#eee7fc']} style={styles.btnText}>
            <Text style={styles.btnText}>Iniciar Sesion</Text>
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
    repeatPassword: '',
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
    marginBottom: 20,
    borderRadius: 50,
    paddingHorizontal: 20,
    borderColor: '#b0b6ca',
    backgroundColor: '#9aa0b0',
  },
  login: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 22,
  },
  error: {
    borderColor: '#dd617d',
  },
});

import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function Auth(){
    const [isLogin, setIsLogin] = useState(true);

    /* cambia a lo contraio del valor actual del login */
    const changeForm = () =>{
        setIsLogin(!isLogin);
    }

    return(
        <ImageBackground source={require('../assets/fondo.png')} style={styles.view} > 
            <Image style={styles.logo} source={require('../assets/logo.png')}/>
            {/* sirve para cambiar entre formularios */}
            {isLogin ? <LoginForm changeForm={changeForm} /> : <RegisterForm changeForm={changeForm}/>}
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    view:{
        flex:1,
        alignItems:'center',
    },
    logo:{
        width:"80%",
        height: 210,
        marginTop:50,
        marginBottom:50,
    }
})
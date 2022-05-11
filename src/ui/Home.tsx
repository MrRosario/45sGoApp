import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";

import { Font } from '../styles';

import { Card, Button } from '../components'

const Home: FC = () => {
    return(
        <View style={styles.container}>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>
                    Vamos Exercitar!
                </Text>
            </View>

            <View style={styles.content}>
                <Card type='prepare' title='Preparar' time='00:05' />
                <Card type='exercise' title='Exercitar' time='00:45' />
                <Card type='rest' title='Descansar' time='00:30' />
                <Card type='rounds' title='Rodadas' time='1' />
            </View>

            <Button 
                size='large' 
                title='INICIAR'  
                callBack={() => console.log('INICIAR Exercicio')} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    content: {
        flexDirection: 'column',
        width: '100%',
        paddingHorizontal: 33,
    },
    titleWrapper: {
        marginVertical: 40,
    },
    title: {
        fontFamily: Font.FAMILY.BOLD,
        fontWeight: Font.WEIGHT.BOLD,
        fontSize: Font.SIZE.SIZE_25,
        color: '#000000',
    },
});

export default Home;
import React, { useState, FC } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';

type Props = {
    modalTitle: string
}
const TimerEditor: FC<Props> = ({ modalTitle }) => {
    return(
        <TouchableHighlight 
            activeOpacity={1}
            underlayColor="rgba(0,0,0, .5)"
            style={styles.overlay} 
            onPress={()=> console.log("Olaa")}
        >
            <View style={styles.editorContainer}>
                <View style={styles.header}>
                    <Text>{modalTitle}</Text>
                </View>
                <View style={styles.body}>
                    <View>
                        <Input title="minutos" />
                        <Text>:</Text>
                        <Input title="segundos" />
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    )
}

const Input: FC = ({ title, onChangeNumber, value }:any) => (
    <View style={styles.inputWrapper}>
        <TextInput 
            style={styles.input}
            onChangeText={onChangeNumber}
            value={value}
            keyboardType="numeric"
        />
        <Text>{title}</Text>
    </View>
)
const styles = StyleSheet.create({
    overlay: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0, .5)',
        alignItems: 'center',
        position: 'absolute'
    },
    editorContainer: {
        width: '90%',
        height: 210,
        backgroundColor: '#ffffff',
        marginTop: 100,
        borderRadius: 6,
    },
    header: {
        width: '1000%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {},
    inputWrapper: {},
    input: {}
});

export default TimerEditor;
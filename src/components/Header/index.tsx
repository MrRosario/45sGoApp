import React from "react";
import { View, StyleSheet, Text } from "react-native";

import Menu from '../../../assets/icons/menu_icon.svg';
import Logo from '../../../assets/icons/Logo.svg';

const Header = () => {
    return(
        <View style={{overflow: "hidden", paddingBottom: 5 }}>
            <View style={styles.container}>
                <Menu />
                <Logo />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 10,
    }
});

export default Header;
import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Home = () => {
    return(
        <View style={styles.container}>
            <Text>Ola Home</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default Home;
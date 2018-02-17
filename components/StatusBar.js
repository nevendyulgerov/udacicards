import React from 'react';
import { StatusBar, View, StyleSheet } from "react-native";
import { Constants } from 'expo';

export default function AppStatusBar({ backgroundColor, ...props }) {
	return (
		<View style={[{backgroundColor}, styles.bar]}>
			<StatusBar backgroundColor={backgroundColor} { ...props } />
		</View>
	);
}

const styles = StyleSheet.create({
  bar: {
    height: Constants.statusBarHeight
  }
});

import React from 'react';
import {
  HeaderButton,
  HeaderButtonProps,
} from 'react-navigation-header-buttons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, Platform } from 'react-native';
// Colors
import Colors from '../constansts/Colors';

type Props = any;

const CustomHeaderButton: React.FC<Props> = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={MaterialIcon}
      iconSize={23}
      color={Platform.OS === 'android' ? 'white' : Colors.primary}
    />
  );
};

const styles = StyleSheet.create({
  mealRow: {
    flexDirection: 'row',
  },
});

export default CustomHeaderButton;

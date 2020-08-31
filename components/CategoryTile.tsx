import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

type Props = {
  title: string;
  color: string;
  onSelect: () => void;
};

const CategoryTile: React.FC<Props> = ({ title, onSelect, color }) => {
  return (
    <View style={styles.gridItem}>
      {Platform.OS === 'android' && Platform.Version >= 21 ? (
        <TouchableNativeFeedback onPress={onSelect}>
          <View style={{ ...styles.container, ...{ backgroundColor: color } }}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </TouchableNativeFeedback>
      ) : (
        <TouchableOpacity onPress={onSelect}>
          <View style={{ ...styles.container, ...{ backgroundColor: color } }}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 8,
    overflow:
      Platform.OS === 'android' && Platform.Version >= 21
        ? 'hidden'
        : 'visible',
    elevation: 5,
  },
  container: {
    flex: 1,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    padding: 16,
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
  title: {
    fontFamily: 'Lato-BlackItalic',
    fontSize: 16,
    color: 'black',
    textAlign: 'right',
  },
});

export default CategoryTile;

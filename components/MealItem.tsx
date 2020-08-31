import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

type Props = {
  title: string;
  duration: number;
  complexity: string;
  affordability: string;
  image: string;
  onSelect: () => void;
};

const MealItem: React.FC<Props> = ({
  title,
  onSelect,
  duration,
  complexity,
  affordability,
  image,
}) => {
  return (
    <View style={styles.mealItem}>
      <TouchableOpacity onPress={onSelect}>
        <View>
          <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
            <ImageBackground source={{ uri: image }} style={styles.bgImage}>
              <View style={styles.titleWrapper}>
                <Text style={styles.title} numberOfLines={1}>
                  {title}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
            <Text style={styles.text}>{duration}m</Text>
            <Text style={styles.text}>{complexity}</Text>
            <Text style={styles.text}>{affordability}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mealRow: {
    flexDirection: 'row',
  },
  mealItem: {
    marginVertical: 10,
    height: 200,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#ede7f6',
  },
  mealHeader: {
    height: '85%',
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '15%',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  titleWrapper: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  text: {
    fontFamily: 'Lato-Regular',
  },
});

export default MealItem;

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {
  NavigationStackScreenProps,
  NavigationStackScreenComponent,
} from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
// Data
import { MEALS } from '../data/data';
// Components
import CustomHeaderButton from '../components/HeaderButton';
import { ScrollView } from 'react-native-gesture-handler';

type Props = NavigationStackScreenProps;

const MealDetailContainer: React.FC<Props> & NavigationStackScreenComponent = ({
  navigation,
}) => {
  const mealId = navigation.getParam('mealId');

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal?.imageUrl }} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.text}>{selectedMeal?.duration}m</Text>
        <Text style={styles.text}>{selectedMeal?.complexity}</Text>
        <Text style={styles.text}>{selectedMeal?.affordability}</Text>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal?.ingredients.map((ingredient) => (
        <View style={styles.listItem}>
          <Text>{ingredient}</Text>
        </View>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal?.steps.map((step) => (
        <View style={styles.listItem}>
          <Text>{step}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

// Dinamic Navigations Options
MealDetailContainer.navigationOptions = (
  navigationData: NavigationStackScreenProps,
) => {
  const mealId = navigationData.navigation.getParam('mealId');

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  return {
    headerTitle: selectedMeal?.title,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="favorite"
          iconName="grade"
          onPress={() => console.log('mack favorite')}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Lato-Regular',
  },
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
  },
  details: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-around',
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#eeeeee',
  },
});

export default MealDetailContainer;

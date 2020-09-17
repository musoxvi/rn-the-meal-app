import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import {
  NavigationStackScreenProps,
  NavigationStackScreenComponent,
} from 'react-navigation-stack';
import { CATEGORIES } from '../data/data';
import MealList from '../components/MealList';
// Models
import { InitialState } from '../store/models/types';

type Props = NavigationStackScreenProps;

const CategoryMealsContainer: React.FC<Props> &
  NavigationStackScreenComponent = ({ navigation }) => {
  const categoryId = navigation.getParam('categoryId');

  const availableMeals = useSelector(
    (state: InitialState) => state.meals.filteredMeals,
  );

  const displayedMeals = availableMeals.filter((meal) =>
    meal.categoryIds.includes(categoryId),
  );

  if (!displayedMeals.length) {
    return (
      <View style={styles.content}>
        <Text>No meals found, meybe check your filters?</Text>
      </View>
    );
  }

  return <MealList listData={displayedMeals} navigation={navigation} />;
};

// Dinamic Navigations Options
CategoryMealsContainer.navigationOptions = (
  navigationData: NavigationStackScreenProps,
) => {
  const categoryId = navigationData.navigation.getParam('categoryId');
  const selectCategory = CATEGORIES.find((cat) => cat.id === categoryId);

  return {
    headerTitle: selectCategory?.title,
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
});

export default CategoryMealsContainer;

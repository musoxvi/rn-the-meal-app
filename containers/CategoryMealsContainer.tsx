import React from 'react';
import { StyleSheet } from 'react-native';
import {
  NavigationStackScreenProps,
  NavigationStackScreenComponent,
} from 'react-navigation-stack';
import { CATEGORIES, MEALS } from '../data/data';
import Meal from '../models/meal';
import MealItem from '../components/MealItem';
import MealList from '../components/MealList';

type Props = NavigationStackScreenProps;

const CategoryMealsContainer: React.FC<Props> &
  NavigationStackScreenComponent = ({ navigation }) => {
  /**
   * renderMealItem
   * @param itemData
   */
  const renderMealItem = (itemData: { item: Meal }) => {
    return (
      <MealItem
        title={itemData.item.title}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity.toLocaleUpperCase()}
        affordability={itemData.item.affordability.toLocaleUpperCase()}
        image={itemData.item.imageUrl}
        onSelect={() => {
          navigation.navigate({
            routeName: 'MealDetail',
            params: {
              mealId: itemData.item.id,
            },
          });
        }}
      />
    );
  };

  const categoryId = navigation.getParam('categoryId');

  const displayedMeals = MEALS.filter((meal) =>
    meal.categoryIds.includes(categoryId),
  );

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
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
});

export default CategoryMealsContainer;

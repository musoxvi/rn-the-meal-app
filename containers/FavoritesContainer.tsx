import React from 'react';
import { StyleSheet } from 'react-native';
import {
  NavigationStackScreenComponent,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { MEALS } from '../data/data';
import Meal from '../models/meal';
// Components
import MealList from '../components/MealList';
import HeaderButton from '../components/HeaderButton';

type Props = NavigationStackScreenProps;

const FavoritesContainer: React.FC<Props> & NavigationStackScreenComponent = ({
  navigation,
}) => {
  const favMeals = MEALS.filter(
    (meal: Meal) => meal.id === 'm1' || meal.id === 'm2',
  );
  return <MealList listData={favMeals} navigation={navigation} />;
};

// Dinamic Navigations Options
FavoritesContainer.navigationOptions = (
  navigationData: NavigationStackScreenProps,
) => {
  return {
    headerTitle: 'Your Favorites',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="menu"
          onPress={() => {
            navigationData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FavoritesContainer;

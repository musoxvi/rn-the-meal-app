// Dependencies
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { createDrawerNavigator } from 'react-navigation-drawer';

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Platform, Text } from 'react-native';
// Containers
import CategoriesContainer from '../containers/CategoriesContainer';
import CategoryMealsContainer from '../containers/CategoryMealsContainer';
import MealDetailContainer from '../containers/MealDetailContainer';
import FavoritesContainer from '../containers/FavoritesContainer';
import FiltersContainer from '../containers/FiltersContainer';
// Colors
import Colors from '../constansts/Colors';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesContainer,
    },
    CategoryMeals: {
      screen: CategoryMealsContainer,
    },
    MealDetail: {
      screen: MealDetailContainer,
    },
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  },
);

const FavNavigator = createStackNavigator(
  {
    Favorite: {
      screen: FavoritesContainer,
    },
    MealDetail: {
      screen: MealDetailContainer,
    },
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  },
);

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo: { tintColor?: string }) => {
        return (
          <MaterialIcon name="restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primary,
    },
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo: { tintColor?: string }) => {
        return <MaterialIcon name="star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.secondary,
    },
  },
};

const MealsFavTabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: Colors.white,
        activeColorDark: Colors.green,
        shifting: true,
        barStyle: {
          backgroundColor: Colors.primary,
        },
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: Colors.secondary,
        },
      });

const FiltersNavigator = createStackNavigator(
  {
    Filters: FiltersContainer,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  },
);

const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealsFavTabNavigator,
      navigationOptions: {
        drawerLabel: 'Meals',
      },
    },
    Filters: FiltersNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.secondary,
      labelStyle: {
        fontFamily: 'Lato-Bold',
      },
    },
  },
);

export default createAppContainer(MainNavigator);

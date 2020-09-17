import React from 'react';
import { useSelector } from 'react-redux';
import { View, FlatList, StyleSheet, ListRenderItemInfo } from 'react-native';

import MealItem from './MealItem';
import Meal from '../models/meal';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { NavigationRoute, NavigationParams } from 'react-navigation';
import { InitialState } from '../store/models/types';

type Props = {
  listData: any;
  navigation: StackNavigationProp<
    NavigationRoute<NavigationParams>,
    NavigationParams
  >;
};

const MealList: React.FC<Props> = ({ navigation, listData }) => {
  const favoriteMeals = useSelector(
    (state: InitialState) => state.meals.favoriteMeals,
  );

  const renderMealItem = (itemData: ListRenderItemInfo<Meal>) => {
    const isFavorite = favoriteMeals.some(
      (meal) => meal.id === itemData.item.id,
    );

    return (
      <MealItem
        title={itemData.item.title}
        image={itemData.item.imageUrl}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        onSelect={() => {
          navigation.navigate({
            routeName: 'MealDetail',
            params: {
              mealId: itemData.item.id,
              mealTitle: itemData.item.title,
              isFav: isFavorite,
            },
          });
        }}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={listData}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={{ width: '100%' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
});

export default MealList;

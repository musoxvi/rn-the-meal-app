import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Image } from 'react-native';
import {
  NavigationStackScreenProps,
  NavigationStackScreenComponent,
} from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
// Components
import CustomHeaderButton from '../components/HeaderButton';
import { ScrollView } from 'react-native-gesture-handler';
// Redux
import { InitialState } from '../store/models/types';
import { toogleFavorite } from '../store/actions/meals';

type Props = NavigationStackScreenProps;

const MealDetailContainer: React.FC<Props> & NavigationStackScreenComponent = ({
  navigation,
}) => {
  const mealId = navigation.getParam('mealId');

  const availableMeals = useSelector(
    (state: InitialState) => state.meals.meals,
  );

  const currentMealIsfavorite = useSelector((state: InitialState) =>
    state.meals.favoriteMeals.some((meal) => meal.id === mealId),
  );

  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toogleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    navigation.setParams({
      toggleFav: toggleFavoriteHandler,
    });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    navigation.setParams({
      isFav: currentMealIsfavorite,
    });
  }, [currentMealIsfavorite]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal?.imageUrl }} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.text}>{selectedMeal?.duration}m</Text>
        <Text style={styles.text}>{selectedMeal?.complexity}</Text>
        <Text style={styles.text}>{selectedMeal?.affordability}</Text>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal?.ingredients.map((ingredient, i) => (
        <View key={i} style={styles.listItem}>
          <Text>{ingredient}</Text>
        </View>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal?.steps.map((step, i) => (
        <View key={i} style={styles.listItem}>
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
  const mealTitle = navigationData.navigation.getParam('mealTitle');
  const toogleFavorite = navigationData.navigation.getParam('toggleFav');
  const isFavorite = navigationData.navigation.getParam('isFav');

  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="favorite"
          iconName={isFavorite ? 'star' : 'star-border'}
          onPress={toogleFavorite}
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

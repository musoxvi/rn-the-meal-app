import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import {
  NavigationStackScreenComponent,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
// Components
import MealList from '../components/MealList';
import HeaderButton from '../components/HeaderButton';
// Models
import { InitialState } from '../store/models/types';

type Props = NavigationStackScreenProps;

const FavoritesContainer: React.FC<Props> & NavigationStackScreenComponent = ({
  navigation,
}) => {
  const favMeals = useSelector(
    (state: InitialState) => state.meals.favoriteMeals,
  );

  if (!favMeals || !favMeals.length) {
    return (
      <View style={styles.content}>
        <Text>No favorite meals found. Start adding some!</Text>
      </View>
    );
  }

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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FavoritesContainer;

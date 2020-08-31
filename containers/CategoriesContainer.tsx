import React from 'react';
import { StyleSheet, FlatList, ListRenderItemInfo } from 'react-native';
import {
  NavigationStackScreenProps,
  NavigationStackScreenComponent,
} from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
// Data
import { CATEGORIES } from '../data/data';
// Colors
import Colors from '../constansts/Colors';
import { CategoryItemT } from '../models/category';
// Components
import CategoryTile from '../components/CategoryTile';
import HeaderButton from '../components/HeaderButton';
import { DrawerActions } from 'react-navigation-drawer';

type Props = NavigationStackScreenProps;
const CategoriesContainer: React.FC<Props> & NavigationStackScreenComponent = ({
  navigation,
}) => {
  const renderGridItem = (itemData: ListRenderItemInfo<CategoryItemT>) => {
    return (
      <CategoryTile
        color={itemData.item.color}
        title={itemData.item.title}
        onSelect={() =>
          navigation.navigate({
            routeName: 'CategoryMeals',
            params: {
              categoryId: itemData.item.id,
            },
          })
        }
      />
    );
  };

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={CATEGORIES}
      renderItem={renderGridItem}
      numColumns={2}
    />
  );
};

// Dinamic Navigations Options
CategoriesContainer.navigationOptions = (
  navigationData: NavigationStackScreenProps,
) => {
  return {
    headerTitle: 'Meal Categories',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="menu"
          onPress={() => {
            navigationData.navigation.navigate('Settings');
            navigationData.navigation.dispatch(DrawerActions.openDrawer());
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
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
  },
});

export default CategoriesContainer;

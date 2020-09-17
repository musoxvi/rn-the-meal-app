import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import {
  NavigationStackScreenComponent,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
//colors
import Colors from '../constansts/Colors';
// Components
import HeaderButton from '../components/HeaderButton';
import { DrawerActions } from 'react-navigation-drawer';
//Redux
import { setFilters } from '../store/actions/meals';

type FilterSwitchProps = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

/**
 * FilterSwitch
 * @param {string} label
 * @param {boolean} value
 * @param onChange
 */
const FilterSwitch: React.FC<FilterSwitchProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{label}</Text>
      <Switch
        trackColor={{
          true: Colors.secondary,
          false: Colors.grey,
        }}
        thumbColor={Platform.OS === 'android' ? Colors.primary : ''}
        value={value}
        onValueChange={onChange}
      />
    </View>
  );
};

type FiltersContainerProps = NavigationStackScreenProps;

const FiltersContainer: React.FC<FiltersContainerProps> &
  NavigationStackScreenComponent = ({ navigation }) => {
  // State Hooks
  const [isGlutenFree, setIsGlutenFree] = useState<boolean>(false);
  const [isLactoseFree, setIsLactoseFree] = useState<boolean>(false);
  const [isVegan, setIsVegan] = useState<boolean>(false);
  const [isVegetarian, setIsVegetarian] = useState<boolean>(false);

  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian,
    };

    dispatch(setFilters(appliedFilters));
    console.log(appliedFilters);
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

  useEffect(() => {
    navigation.setParams({ save: saveFilters });
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Avilable Filtes / Restrictions</Text>
      <FilterSwitch
        label="Glutten-free"
        value={isGlutenFree}
        onChange={setIsGlutenFree}
      />
      <FilterSwitch
        label="Lactose-free"
        value={isLactoseFree}
        onChange={setIsLactoseFree}
      />
      <FilterSwitch label="Vegan" value={isVegan} onChange={setIsVegan} />
      <FilterSwitch
        label="Vegetarian"
        value={isVegetarian}
        onChange={setIsVegetarian}
      />
    </View>
  );
};

// Dinamic Navigations Options
FiltersContainer.navigationOptions = (
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName="save"
          onPress={navigationData.navigation.getParam('save')}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: 22,
    margin: 20,
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 12,
  },
});

export default FiltersContainer;

import { MEALS } from '../../data/data';
import Meal from '../../models/meal';
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/meals';
import { MealState, MealsActionTypes } from '../models/types';

const initialState: MealState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealsReducer = (state = initialState, action: MealsActionTypes) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = (state.favoriteMeals as Meal[]).findIndex(
        (meal) => {
          return meal.id === action.mealId;
        },
      );

      if (existingIndex >= 0) {
        const updatedFavMeals = [...state.favoriteMeals];
        updatedFavMeals.splice(existingIndex, 1);

        return {
          ...state,
          favoriteMeals: updatedFavMeals,
        };
      }

      const meal = state.meals.find((meal) => {
        return meal.id === action.mealId;
      });
      if (meal) {
        return {
          ...state,
          favoriteMeals: state.favoriteMeals.concat(meal),
        };
      }

    case SET_FILTERS:
      const appliedFilter = action.filters;
      const updatedfilteredMeals = state.meals.filter((meal) => {
        if (
          (appliedFilter.gluttenFree && !meal.isGlutenFree) ||
          (appliedFilter.lactoseFree && !meal.isLactoseFree) ||
          (appliedFilter.vegetarian && !meal.isVegetarian) ||
          (appliedFilter.vegan && !meal.isVegan)
        ) {
          return false;
        }

        return true;
      });

      return {
        ...state,
        filteredMeals: updatedfilteredMeals,
      };

    default:
      return state;
  }
};

export default mealsReducer;

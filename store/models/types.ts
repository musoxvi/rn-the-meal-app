import Meal from '../../models/meal';

export interface MealState {
  meals: Meal[];
  filteredMeals: Meal[];
  favoriteMeals: Meal[];
}

export interface InitialState {
  meals: MealState;
}

export interface MealsActionTypes {
  type: string;
  mealId: string;
  filters: { [key: string]: boolean };
}

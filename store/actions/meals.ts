export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const SET_FILTERS = 'SET_FILTERS';

//Action Creators
export const toogleFavorite = (mealId: string) => {
  return {
    type: TOGGLE_FAVORITE,
    mealId: mealId,
  };
};

export const setFilters = (filterSettins: { [key: string]: boolean }) => {
  return {
    type: SET_FILTERS,
    filters: filterSettins,
  };
};

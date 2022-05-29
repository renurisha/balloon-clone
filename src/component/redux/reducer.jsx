import {
  TOTAL_CIRCLES,
  TOTAL_SELECTED_CIRCLES,
  RESTORE_CIRCLES,
} from "./action";
const init = {
  totalCircles: [],
  selectedCircles: [],
};
export const reducers = (state = init, { type, payload }) => {
  switch (type) {
    case TOTAL_CIRCLES:
      return {
        ...state,
        totalCircles: [...state.totalCircles, payload],
      };

    case TOTAL_SELECTED_CIRCLES:
      console.log("payload", payload);
      const match = state.totalCircles.filter((e) => e.id == payload);
      console.log("match", match);
      const filtermatch = state.totalCircles.filter((e) => e.id != payload);
      console.log("filter", filtermatch);
      return {
        ...state,
        selectedCircles: [...state.selectedCircles, ...match],
        totalCircles: [...filtermatch],
      };

    case RESTORE_CIRCLES:
      if (state.totalCircles.length == 0) {
        const removeselected = state.selectedCircles.filter(
          (e) => e.id !== payload.id
        );
        return {
          ...state,
          totalCircles: [payload],
          selectedCircles: [...removeselected],
        };
      } else {
        const sorteddata = state.totalCircles.sort((a, b) => {
          return a - b;
        });
        console.log("restotestate", state.totalCircles);
        const removeselected = state.selectedCircles.filter(
          (e) => e.id != payload.id
        );
        var flag = false;
        var low = 0;
        var high = sorteddata.length - 1;
        while (high >= low) {
          if (sorteddata[high].id > payload.id) {
            sorteddata[high + 1] = sorteddata[high];
            high--;
          } else {
            sorteddata[high + 1] = payload;
            flag = true;
            return {
              ...state,
              totalCircles: [...sorteddata],
              selectedCircles: [...removeselected],
            };
          }
        }
        if (flag === false) {
          sorteddata[low] = payload;
          return {
            ...state,
            totalCircles: [...sorteddata],
            selectedCircles: [...removeselected],
          };
        }
      }
      break;
    default:
      return state;
  }
};

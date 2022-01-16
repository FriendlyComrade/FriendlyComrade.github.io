import { Middleware } from "redux";
import { addFavLocalStore, removeFavLocalStore } from "../utils/utils";

const userActionList = ["favorites/addFav", "favorites/removeFav"];

const addFavoritesToLocalStoreMiddleware: Middleware =
  (store) => (next) => (action) => {
    const state = store.getState();
    if (userActionList.includes(action.type)) {
      switch (action.type) {
        case userActionList[0]: {
          console.log('12')
          const getJsonUserFromLocalStore = JSON.parse(
            localStorage.getItem("user") || "[]"
          );
          const getMailList = getJsonUserFromLocalStore.map((user: any) => {
            return Object.values(user);
          });
          console.log(getMailList[0])
          if (getMailList[0].includes(state.userSlice.email)) {
            console.log('yes')
            // console.log('')
            addFavLocalStore(state.userSlice.id, action.payload.movie);
          }
          break;
        }
        case userActionList[1]: {
          removeFavLocalStore(state.userSlice.id, action.payload);
          break;
        }
      }
    }
    next(action);
  };

export default addFavoritesToLocalStoreMiddleware;
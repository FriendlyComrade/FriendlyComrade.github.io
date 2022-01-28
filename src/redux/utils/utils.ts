import { User } from "../../types/User";

const getUserList = () => {
  const userListString: string = localStorage.getItem("user") || "[]";
  return JSON.parse(userListString);
};

const addFavLocalStore = (currentUserID: number, movieId: number) => {
  const userList: User[] = getUserList();
  const newUserList = userList.map((el) => {
    if (el.id === currentUserID) {
      if (!el.favorites) {
        el.favorites = [movieId];
      } else {
        el.favorites = [...el.favorites, movieId];
      }
    }
    return el;
  });
  const newUserListStringified = JSON.stringify(newUserList);
  localStorage.setItem("user", newUserListStringified);
};

const removeFavLocalStore = (currentUserID: number, movieId: number) => {
  const userList: User[] = getUserList();
  const newUserList = userList.map((el) => {
    if (el.id === currentUserID) {
      if (!el.favorites) {
        el.favorites = [];
      } else {
        el.favorites = [...el.favorites.filter((movie) => movie !== movieId)];
      }
    }
    return el;
  });
  const newUserListStringified = JSON.stringify(newUserList);
  localStorage.setItem("user", newUserListStringified);
};

const addHistoryLocalStore = (currentUserID: number, searchValue: string) => {
  const userList: User[] = getUserList();
  const newUserList = userList.map((el) => {
    if (el.id === currentUserID) {
      if (!el.history) {
        el.history = [searchValue];
      } else {
        el.history = [...el.history, searchValue];
      }
    }
    return el;
  });

  const newUserListStringified = JSON.stringify(newUserList);
  localStorage.setItem("user", newUserListStringified);
};

const debounce = (callback: Function, delay: number) => {
  let timerID: number;
  return function (this: any, ...args: any[]) {
    if (timerID) {
      window.clearTimeout(timerID);
    }
    timerID = window.setTimeout(() => callback.apply(this, args), delay);
  };
};

export {debounce, addHistoryLocalStore, addFavLocalStore, removeFavLocalStore}
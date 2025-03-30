import { defineStore } from 'pinia';
import { getAppList, getMenuList, getUserData } from '../services';
import { clearUserToken } from '../services/token';

interface storeState {
  currentUser: any,
  appList: Array<any>,
  menuList: Array<any>,
}

export const useStore = defineStore('store', {
  state: (): storeState => ({
    currentUser: {},
    appList: [],
    menuList: [],
  }),

  actions: {
    logout() {
      clearUserToken();
      this.currentUser = {};

    },

    async handleUserData(router: any) {
      try {
        this.currentUser = await getUserData();
        router && router.push('/');
      } catch (error) {
        console.error(error);
      }
    },

    async handleGetAppList() {
      this.appList = await getAppList();
      return;
    },

    async handleGetMenuList() {
      this.menuList = await getMenuList();
      return;
    }
  }
});
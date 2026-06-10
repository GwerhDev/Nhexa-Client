import { defineStore } from 'pinia';
import { getAppList, getMenuList, getUserData } from '../services';
import { clearUserToken } from '../services/token';

interface storeState {
  currentUser: any,
  appList: { user: Array<any>, admin?: Array<any> },
  menuList: Array<any>,
  isLoading: boolean,
  activeSection: string,
}

export const useStore = defineStore('store', {
  state: (): storeState => ({
    currentUser: {},
    appList: { user: [], admin: [] },
    menuList: [],
    isLoading: false,
    activeSection: '',
  }),

  actions: {
    setActiveSection(id: string) {
      this.activeSection = id;
    },

    logout() {
      clearUserToken();
      this.currentUser = {};

    },

    async handleUserData(router: any) {
      this.isLoading = true;
      try {
        this.currentUser = await getUserData();
        router && router.push('/');
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
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

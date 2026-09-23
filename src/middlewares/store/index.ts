import { defineStore } from 'pinia';
import { getNhexaEnv, getMenuList, getUserData } from '../services';
import { clearUserToken } from '../services/token';

export interface AppEntry { label: string; url: string; icon: string; color?: string; description?: string; route?: string }
export interface EnvCategory { id: string; name: string; apps: AppEntry[] }

interface storeState {
  currentUser: any,
  appList: EnvCategory[],
  menuList: Array<any>,
  isLoading: boolean,
  activeSection: string,
  // Shared by every AccMenu instance (the top-row one and its copy in the compact nav), so
  // the account popover stays open/closed consistently when the nav switches between them.
  accMenuOpen: boolean,
}

export const useStore = defineStore('store', {
  state: (): storeState => ({
    currentUser: {},
    appList: [],
    menuList: [],
    isLoading: false,
    activeSection: '',
    accMenuOpen: false,
  }),

  actions: {
    setActiveSection(id: string) {
      this.activeSection = id;
    },

    setAccMenuOpen(open: boolean) {
      this.accMenuOpen = open;
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

    async handleGetNhexaEnv() {
      this.appList = await getNhexaEnv();
      return;
    },

    async handleGetMenuList() {
      this.menuList = await getMenuList();
      return;
    }
  }
});

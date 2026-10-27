// @vitest-environment happy-dom
import { describe, it, expect, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import DesktopDock from '../app/components/AppMenu/DesktopDock.component.vue';

// Where each tool goes comes from the app's configuration (its .env): fixed ones here.
vi.mock('../middlewares/misc/const', () => ({
  CLIENT_URL: 'https://home.example.com',
  ACCOUNTS_URL: 'https://accounts.example.com',
}));

const originalLocation = window.location;
const watchNavigation = () => {
  const location = { href: 'https://home.example.com/here' };
  Object.defineProperty(window, 'location', { configurable: true, value: location });
  return location;
};

const mountDock = () => mount(DesktopDock, { global: { stubs: { 'font-awesome-icon': true } } });

describe("the desktop's dock", () => {
  afterEach(() => {
    Object.defineProperty(window, 'location', { configurable: true, value: originalLocation });
  });

  it("closes the desktop for Nhexa's home, since this is it", async () => {
    const location = watchNavigation();
    const wrapper = mountDock();
    const home = wrapper.find('[data-testid="dock-home"]');
    expect(home.classes()).toContain('current');
    await home.trigger('click');
    expect(wrapper.emitted('close')).toHaveLength(1);
    expect(location.href).toBe('https://home.example.com/here');
  });

  it('goes to the account', async () => {
    const location = watchNavigation();
    const wrapper = mountDock();
    await wrapper.find('[data-testid="dock-account"]').trigger('click');
    expect(location.href).toBe('https://accounts.example.com');
    expect(wrapper.emitted('close')).toBeUndefined();
  });

  it("shows the settings, but they can't be opened yet", () => {
    const settings = mountDock().find('[data-testid="dock-settings"]');
    expect(settings.exists()).toBe(true);
    expect(settings.attributes('disabled')).toBeDefined();
  });
});

import { describe, it, expect } from 'vitest';
import { HOME_ITEM, SUPPORT_ITEM, withMenuFallbacks } from '../middlewares/misc/menu';

const DEPARTMENTS = { label: 'Departamentos', section: '#departments', submenu: [] };
const APPS = { label: 'Aplicaciones', section: '#apps' };

describe("the site's menu", () => {
  it('is Home and Support when the export answers nothing, or an error', () => {
    for (const answer of [undefined, null, { error: 'Not found' }, 'oops', []]) {
      expect(withMenuFallbacks(answer)).toEqual([HOME_ITEM, SUPPORT_ITEM]);
    }
  });

  it("puts the export's items between Home and Support, in their order", () => {
    expect(withMenuFallbacks([DEPARTMENTS, APPS])).toEqual([HOME_ITEM, DEPARTMENTS, APPS, SUPPORT_ITEM]);
  });

  it("doesn't repeat Home or Support if the export still lists them", () => {
    const answer = [{ label: 'Home', route: '/' }, DEPARTMENTS, { label: 'Soporte', section: '#support' }, { label: 'Soporte', route: '/#support' }];
    expect(withMenuFallbacks(answer)).toEqual([HOME_ITEM, DEPARTMENTS, SUPPORT_ITEM]);
  });

  it('ignores what is not a menu item', () => {
    expect(withMenuFallbacks([null, 3, { section: '#x' }, APPS])).toEqual([HOME_ITEM, APPS, SUPPORT_ITEM]);
  });
});

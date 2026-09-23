import { describe, it, expect } from 'vitest';
import { getMenuHref, getMenuTarget } from '../menu';

describe('getMenuHref', () => {
  it('returns "href" when present', () => {
    expect(getMenuHref({ href: 'https://a.example' })).toBe('https://a.example');
  });

  it('falls back to "url" when "href" is absent', () => {
    expect(getMenuHref({ url: 'https://spectra.nhexa.cl' })).toBe('https://spectra.nhexa.cl');
  });

  it('prefers "href" over "url" when both are present', () => {
    expect(getMenuHref({ href: 'https://a.example', url: 'https://b.example' })).toBe('https://a.example');
  });

  it('returns null when neither is present', () => {
    expect(getMenuHref({ route: '#apps' })).toBeNull();
    expect(getMenuHref(undefined)).toBeNull();
  });
});

describe('getMenuTarget', () => {
  it('turns a bare hash into an explicit home-page location', () => {
    expect(getMenuTarget('#audiovisual')).toEqual({ name: 'LandingPage', hash: '#audiovisual' });
  });

  it('leaves a real path untouched', () => {
    expect(getMenuTarget('/technology')).toBe('/technology');
  });

  it('returns null for an empty/missing route', () => {
    expect(getMenuTarget('')).toBeNull();
    expect(getMenuTarget(undefined)).toBeNull();
  });
});

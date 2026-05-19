import { stripInjectionKeys } from '../middleware/security';

describe('stripInjectionKeys', () => {
  it('removes MongoDB operator keys from objects', () => {
    const input = {
      email: 'user@example.com',
      $gt: '',
      nested: { $where: '1==1', safe: 'ok' },
    };
    expect(stripInjectionKeys(input)).toEqual({
      email: 'user@example.com',
      nested: { safe: 'ok' },
    });
  });

  it('preserves arrays and primitives', () => {
    expect(stripInjectionKeys(['a', 1, true])).toEqual(['a', 1, true]);
    expect(stripInjectionKeys('plain')).toBe('plain');
  });
});

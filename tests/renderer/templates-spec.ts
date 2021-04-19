import { MAIN_JS } from '../../src/interfaces';
import { getTemplateValues } from '../../src/renderer/templates';

jest.unmock('fs-extra');

describe('templates', () => {
  const KNOWN_GOOD_TEMPLATE = 'clipboard';
  const KNOWN_BAD_TEMPLATE = 'not-a-real-show-me';

  describe('getTemplateValues()', () => {
    it('loads templates', async () => {
      const values = await getTemplateValues(KNOWN_GOOD_TEMPLATE);
      expect(values[MAIN_JS].length).toBeGreaterThan(0);
    });

    it('handles errors', async () => {
      const values = await getTemplateValues(KNOWN_BAD_TEMPLATE);
      expect(values[MAIN_JS]).toBe('');
    });

    it('reports missing files', async () => {
      console.log = jest.fn();

      await getTemplateValues(KNOWN_BAD_TEMPLATE);

      expect(console.log).toHaveBeenCalledTimes(1);
      expect((console.log as jest.Mock).mock.calls[0][0]).toMatch(
        'Got Fiddle from',
      );

      (console.log as jest.Mock).mockClear();
    });
  });
});

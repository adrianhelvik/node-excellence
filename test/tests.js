const excellence = require('../index.js');
const assert = require('assert');

describe('excellence', () => {
  describe('.xml()', () => {
    it('Generates the correct content xml for one row', () => {
      const actual = excellence.xml({
        data: [
          ['hello', 'world']
        ],
        _justContent: true
      });
      const expected = '<Row><Cell><Data ss:Type="String">hello</Data></Cell><Cell><Data ss:Type="String">world</Data></Cell></Row>';

      assert.equal(actual, expected);
    });

    it('Generates the correct content xml for multiple rows', () => {
      const actual = excellence.xml({
        data: [
          ['hello', 'world'],
          ['lol', 'cats']
        ],
        _justContent: true
      });
      const expected = (
        '<Row><Cell><Data ss:Type="String">hello</Data></Cell><Cell><Data ss:Type="String">world</Data></Cell></Row>' +
        '<Row><Cell><Data ss:Type="String">lol</Data></Cell><Cell><Data ss:Type="String">cats</Data></Cell></Row>'
      );

      assert.equal(actual, expected);
    });
  });

  describe('.csv()', () => {
    it('can generate csv data', () => {
      const actual = excellence.csv([['a', 'b', 'c']]);
      const expected = '"a","b","c"';
      assert.equal(actual, expected);
    });

    it('escapes double quotes', () => {
      const actual = excellence.csv([['"']]);
      const expected = '""""';
      assert.equal(actual, expected);
    });

    it('handles multiple rows', () => {
      const actual = excellence.csv([
        ['a', '"b"'],
        ['c', 'd']
      ]);
      const expected = '"a","""b"""\n"c","d"';
      assert.equal(actual, expected);
    });
  });
});

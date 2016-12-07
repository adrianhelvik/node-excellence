const excellence = require('../index.js');
const assert = require('assert');

describe('excellence', () => {
  it('Generates the correct content xml', () => {
    const actual = excellence({
      data: [
        ['hello', 'world']
      ],
      _justContent: true
    });
    const expected = '<Row><Cell><Data ss:Type="String">hello</Data></Cell><Cell><Data ss:Type="String">world</Data></Cell></Row>';

    assert.equal(actual, expected);
  });
});

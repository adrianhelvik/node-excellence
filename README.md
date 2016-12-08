Installation
============
`npm install --save excellence`

Usage
=====
```javascript
const excellence = require('excellence');

const xml = excellence.xml([
    ['this', 'is', 'the', 'first', 'row'],
    ['this', 'is', 'the', 'second', 'row']
]);

const csv = excellence.csv([
    ['this', 'is', 'the', 'first', 'row'],
    ['this', 'is', 'the', 'second', 'row']
]);
```

Tests
=====
`npm test`

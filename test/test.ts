import test = require('blue-tape');

import target = require('html2json');

test('roundtrip', t => {
  const html = `<div id="1" class="foo"><h2>sample text with <code>inline tag</code></h2><pre id="demo" class="foo bar">foo</pre><pre id="output" class="goo">goo</pre><input id="execute" type="button" value="execute"/></div>`;
  const json = {
    node: 'root',
    child: [
      {
        node: 'element',
        tag: 'div',
        attr: { id: '1', class: 'foo' },
        child: [
          {
            node: 'element',
            tag: 'h2',
            child: [
              { node: 'text', text: 'sample text with ' },
              { node: 'element', tag: 'code', child: [{ node: 'text', text: 'inline tag' }] }
            ]
          },
          {
            node: 'element',
            tag: 'pre',
            attr: { id: 'demo', class: ['foo', 'bar'] },
            child: [{ node: 'text', text: 'foo' }]
          },
          {
            node: 'element',
            tag: 'pre',
            attr: { id: 'output', class: 'goo' },
            child: [{ node: 'text', text: 'goo' }]
          },
          {
            node: 'element',
            tag: 'input',
            attr: { id: 'execute', type: 'button', value: 'execute' }
          }
        ]
      }
    ]
  };
  t.is(html, target.json2html(json));
  t.deepEqual(json, target.html2json(html));
  t.is(html, target.json2html(target.html2json(html)));
  t.end();
});

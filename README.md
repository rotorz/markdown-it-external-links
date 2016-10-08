# markdown-it-external-links [![Build Status](https://travis-ci.org/rotorz/markdown-it-external-links.svg?branch=master)](https://travis-ci.org/rotorz/markdown-it-external-links) 

[![npm version](https://badge.fury.io/js/markdown-it-external-links.svg)](https://badge.fury.io/js/markdown-it-external-links)
[![Dependency Status](https://david-dm.org/rotorz/markdown-it-external-links.svg)](https://david-dm.org/rotorz/markdown-it-external-links)
[![devDependency Status](https://david-dm.org/rotorz/markdown-it-external-links/dev-status.svg)](https://david-dm.org/rotorz/markdown-it-external-links#info=devDependencies)

Plugin for markdown-it that adds CSS classes to links that fall outside of the specified
internal domain(s).


Example input:
```markdown
- [Internal Link A](/)
- [Internal Link B](//example.org)
- [Internal Link C](http://example.org)
- [Internal Link D](other-page.html)
- [Internal Link E](.././other-page.html)
- [External Link A](//example.com)
- [External Link B](http://example.com)
```

Output (without internal link class - default):
```html
<ul>
  <li><a href="/">Internal Link A</a></li>
  <li><a href="//example.org">Internal Link B</a></li>
  <li><a href="http://example.org">Internal Link C</a></li>
  <li><a href="other-page.html">Internal Link D</a></li>
  <li><a href=".././other-page.html">Internal Link E</a></li>
  <li><a href="//example.com" class="external-link">External Link A</a></li>
  <li><a href="http://example.com" class="external-link">External Link B</a></li>
</ul>
```

Output (with internal link class):
```html
<ul>
  <li><a href="/" class="internal-link">Internal Link A</a></li>
  <li><a href="//example.org" class="internal-link">Internal Link B</a></li>
  <li><a href="http://example.org" class="internal-link">Internal Link C</a></li>
  <li><a href="other-page.html" class="internal-link">Internal Link D</a></li>
  <li><a href=".././other-page.html" class="internal-link">Internal Link E</a></li>
  <li><a href="//example.com" class="external-link">External Link A</a></li>
  <li><a href="http://example.com" class="external-link">External Link B</a></li>
</ul>
```


## Install

```
$ npm install --save markdown-it-external-links
```


## Usage

```javascript
var md = require('markdown-it')();
var externalLinks = require('markdown-it-external-links');

md.use(externalLinks, {
  externalClassName: "custom-external-link",
  internalClassName: "custom-internal-link",
  internalDomains: [ "example.org" ]
});

var input = '[Some External Link](http://example.com)';
var output = md.render(input);

console.log(output);
```


### Options

Option              | Type               | Default              | Description
:-------------------|:-------------------|:---------------------|:----------------------------------------------------------------------------------------
`externalClassName` | `string` \| `null`  | `"external-link"`    | External class to use for external links. Specify a value of `null` to disable output.
`internalClassName` | `string` \| `null`  | `null`               | Internal class to use for external links. Specify a value of `null` to disable output.
`internalDomains`   | `string[]`         | `[]`                 | An array of domains that are considered internal. **Example Value:** `[ "example.org" ]`
`externalTarget`    | `string`           | `"_self"`            | Target attribute for external links.
`internalTarget`    | `string`           | `"_self"`            | Target attribute for internal links.
`externalRel`       | `string`           | `null`               | Rel attribute for external links.
`internalRel`       | `string`           | `null`               | Rel attribute for internal links.


## Contribution Agreement

This project is licensed under the MIT license (see LICENSE). To be in the best
position to enforce these licenses the copyright status of this project needs to
be as simple as possible. To achieve this the following terms and conditions
must be met:

- All contributed content (including but not limited to source code, text,
  image, videos, bug reports, suggestions, ideas, etc.) must be the
  contributors own work.

- The contributor disclaims all copyright and accepts that their contributed
  content will be released to the public domain.

- The act of submitting a contribution indicates that the contributor agrees
  with this agreement. This includes (but is not limited to) pull requests, issues,
  tickets, e-mails, newsgroups, blogs, forums, etc.

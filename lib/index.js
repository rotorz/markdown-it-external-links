// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.

"use strict";


module.exports = function externalLinksPlugin(md, options) {
  options = options || {};

  var externalClassName = (typeof options.externalClassName === "string" || options.externalClassName === null)
      ? options.externalClassName
      : "external-link";
  var internalClassName = (typeof options.internalClassName === "string" || options.internalClassName === null)
      ? options.internalClassName
      : null;
  var internalDomains = Array.isArray(options.internalDomains)
      ? options.internalDomains.map(domain => domain.toLowerCase())
      : [];

  var externalTarget = options.externalTarget || "_self";
  var internalTarget = options.internalTarget || "_self";

  if (externalClassName === null && internalClassName === null
      && externalTarget === "_self" && internalTarget === "_self") {
    // No point proceeding!
    return;
  }

  function externalLinks(state) {
    function applyFilterToTokenHierarchy(token) {
      if (token.children) {
        token.children.map(applyFilterToTokenHierarchy);
      }

      if (token.type === "link_open") {
        var href = token.attrGet("href");
        var internal = isInternalLink(href);

        var newClasses = internal ? internalClassName : externalClassName;
        if (newClasses) {
          var existingClasses = token.attrGet("class") || "";
          if (existingClasses != "") {
            newClasses = existingClasses + " " + newClasses;
          }
          token.attrSet("class", newClasses);
        }

        var target = internal ? internalTarget : externalTarget;
        if (target !== "_self") {
          token.attrSet("target", target);
        }
      }
    }

    state.tokens.map(applyFilterToTokenHierarchy);
  }

  function isInternalLink(href) {
    var domain = getDomain(href);
    return domain === null || internalDomains.indexOf(domain) !== -1;
  }

  function getDomain(href) {
    var domain = href.split("//")[1];
    if (domain) {
      domain = domain.split("/")[0].toLowerCase();
      return domain || null;
    }
    return null;
  }

  md.core.ruler.push("external_links", externalLinks);
};

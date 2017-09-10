// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.

"use strict";


function externalLinksPlugin(md, options) {
  options = options || {};

  let externalClassName = (typeof options.externalClassName === "string" || options.externalClassName === null)
      ? options.externalClassName
      : "external-link";
  let mailtoClassName = (typeof options.mailtoClassName === "string" || options.mailtoClassName === null)
      ? options.mailtoClassName
      : "mailto-link";
  let internalClassName = (typeof options.internalClassName === "string" || options.internalClassName === null)
      ? options.internalClassName
      : null;
  let internalDomains = Array.isArray(options.internalDomains)
      ? options.internalDomains.map(domain => domain.toLowerCase())
      : [];

  let externalTarget = options.externalTarget || "_self";
  let mailtoTarget = options.mailtoTarget || "_blank";
  let internalTarget = options.internalTarget || "_self";

  let externalRel = options.externalRel || null;
  let mailtoRel = options.mailtoRel || null;
  let internalRel = options.internalRel || null;

  if (externalClassName === null && internalClassName === null
      && externalTarget === "_self" && internalTarget === "_self"
      && externalRel === null && internalRel === null) {
    // No point proceeding!
    return;
  }

  function externalLinks(state) {
    function applyFilterToTokenHierarchy(token) {
      if (token.children) {
        token.children.map(applyFilterToTokenHierarchy);
      }

      if (token.type === "link_open") {
        let href = token.attrGet("href");
        let internal = isInternalLink(href);
        let mailto = isMailtoLink(href);

        let newClasses, target, rel;

        if (internal) {
          newClasses = internalClassName;
          target = internalTarget;
          rel = internalRel;
        } else if (mailto) {
          newClasses = mailtoClassName;
          target = mailtoTarget;
          rel = mailtoRel;
        } else {
          newClasses = externalClassName;
          target = externalTarget;
          rel = externalRel;
        }

        if (newClasses) {
          let existingClasses = token.attrGet("class") || "";
          if (existingClasses !== "") {
            newClasses = existingClasses + " " + newClasses;
          }
          token.attrSet("class", newClasses);
        }

        if (target !== "_self") {
          token.attrSet("target", target);
        }

        if (rel) {
          let existingRel = token.attrGet("rel") || "";
          if (existingRel !== "") {
            rel = existingRel + " " + rel;
          }
          token.attrSet("rel", rel);
        }
      }
    }

    state.tokens.map(applyFilterToTokenHierarchy);
  }

  function isInternalLink(href) {
    if (isMailtoLink(href)) {
      return false;
    }
    let domain = getDomain(href);
    return domain === null || internalDomains.indexOf(domain) !== -1;
  }

  function getDomain(href) {
    let domain = href.split("//")[1];
    if (domain) {
      domain = domain.split("/")[0].toLowerCase();
      return domain || null;
    }
    return null;
  }

  function isMailtoLink(href) {
    // regex taken from https://stackoverflow.com/questions/46155/how-to-validate-email-address-in-javascript
    let regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; // eslint-disable-line
    let emailAddress = href.indexOf("mailto:") !== -1 ? href.split(":")[1] : href;
    return regex.test(emailAddress);
  }

  md.core.ruler.push("external_links", externalLinks);
}


module.exports = externalLinksPlugin;

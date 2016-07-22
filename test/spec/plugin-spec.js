// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.

"use strict";


const given = require("mocha-testdata");
const should = require("should");
const markdownIt = require("markdown-it");

const externalLinks = require("../../lib");


describe("markdown-it-external-links", function () {

  given(
    "//external-domain.com/foo",
    "//external-domain.com",
    "http://external-domain.com",
    "https://external-domain.com"
  ).
  it("adds 'external-link' class to external links by default", function (href) {
    let source = `Text with [link](${href}).`;
    let expected = `<p>Text with <a href="${href}" class="external-link">link</a>.</p>`;

    let markdownProcessor = markdownIt().use(externalLinks);
    markdownProcessor.render(source)
      .trim()
      .should.be.eql(expected);
  });

  given(
    "//internal-domain.com/foo",
    "//internal-domain.com",
    "http://internal-domain.com",
    "https://internal-domain.com",
    "/index.html",
    "index.html",
    "../index.html"
  ).
  it("does not add class to internal links by default", function (href) {
    let source = `Text with [link](${href}).`;
    let expected = `<p>Text with <a href="${href}">link</a>.</p>`;

    let markdownProcessor = markdownIt().use(externalLinks, {
      internalDomains: [ "internal-domain.com" ]
    });
    markdownProcessor.render(source)
      .trim()
      .should.be.eql(expected);
  });

  given(
    "//external-domain.com/foo",
    "//external-domain.com",
    "http://external-domain.com",
    "https://external-domain.com"
  ).
  it("adds custom class to external links", function (href) {
    let source = `Text with [link](${href}).`;
    let expected = `<p>Text with <a href="${href}" class="custom-external-class">link</a>.</p>`;

    let markdownProcessor = markdownIt().use(externalLinks, {
      externalClassName: "custom-external-class"
    });
    markdownProcessor.render(source)
      .trim()
      .should.be.eql(expected);
  });

  given(
    "//internal-domain.com/foo",
    "//internal-domain.com",
    "http://internal-domain.com",
    "https://internal-domain.com",
    "/index.html",
    "index.html",
    "../index.html"
  ).
  it("adds custom class to internal links", function (href) {
    let source = `Text with [link](${href}).`;
    let expected = `<p>Text with <a href="${href}" class="custom-internal-class">link</a>.</p>`;

    let markdownProcessor = markdownIt().use(externalLinks, {
      internalClassName: "custom-internal-class",
      internalDomains: [ "internal-domain.com" ]
    });
    markdownProcessor.render(source)
      .trim()
      .should.be.eql(expected);
  });

  given(
    "//external-domain.com/foo",
    "//external-domain.com",
    "http://external-domain.com",
    "https://external-domain.com"
  ).
  it("adds custom target attribute to external links by default", function (href) {
    let source = `Text with [link](${href}).`;
    let expected = `<p>Text with <a href="${href}" class="external-link" target="_blank">link</a>.</p>`;

    let markdownProcessor = markdownIt().use(externalLinks, {
      externalTarget: "_blank"
    });
    markdownProcessor.render(source)
      .trim()
      .should.be.eql(expected);
  });

  given(
    "//internal-domain.com/foo",
    "//internal-domain.com",
    "http://internal-domain.com",
    "https://internal-domain.com",
    "/index.html",
    "index.html",
    "../index.html"
  ).
  it("adds custom target attribute to internal links", function (href) {
    let source = `Text with [link](${href}).`;
    let expected = `<p>Text with <a href="${href}" class="custom-internal-class" target="_blank">link</a>.</p>`;

    let markdownProcessor = markdownIt().use(externalLinks, {
      internalTarget: "_blank",
      internalClassName: "custom-internal-class",
      internalDomains: [ "internal-domain.com" ]
    });
    markdownProcessor.render(source)
      .trim()
      .should.be.eql(expected);
  });

  given(
    "//external-domain.com/foo",
    "//external-domain.com",
    "http://external-domain.com",
    "https://external-domain.com"
  ).
  it("adds custom rel attribute to external links", function (href) {
    let source = `Text with [link](${href}).`;
    let expected = `<p>Text with <a href="${href}" class="external-link" rel="noopener">link</a>.</p>`;

    let markdownProcessor = markdownIt().use(externalLinks, {
      externalRel: "noopener"
    });
    markdownProcessor.render(source)
      .trim()
      .should.be.eql(expected);
  });

  given(
    "//internal-domain.com/foo",
    "//internal-domain.com",
    "http://internal-domain.com",
    "https://internal-domain.com",
    "/index.html",
    "index.html",
    "../index.html"
  ).
  it("adds custom rel attribute to internal links", function (href) {
    let source = `Text with [link](${href}).`;
    let expected = `<p>Text with <a href="${href}" rel="nofollow">link</a>.</p>`;

    let markdownProcessor = markdownIt().use(externalLinks, {
      internalDomains: [ "internal-domain.com" ],
      internalRel: "nofollow"
    });
    markdownProcessor.render(source)
      .trim()
      .should.be.eql(expected);
  });

});

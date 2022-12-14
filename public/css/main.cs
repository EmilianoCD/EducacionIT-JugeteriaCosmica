/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */
/* Document
   ========================================================================== */
/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 */
html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
}

/* Sections
   ========================================================================== */
/**
 * Remove the margin in all browsers.
 */
body {
  margin: 0;
}

/**
 * Render the `main` element consistently in IE.
 */
main {
  display: block;
}

/**
 * Correct the font size and margin on `h1` elements within `section` and
 * `article` contexts in Chrome, Firefox, and Safari.
 */
h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

/* Grouping content
   ========================================================================== */
/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */
hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd `em` font sizing in all browsers.
 */
pre {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/* Text-level semantics
   ========================================================================== */
/**
 * Remove the gray background on active links in IE 10.
 */
a {
  background-color: transparent;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */
abbr[title] {
  border-bottom: none; /* 1 */
  text-decoration: underline; /* 2 */
  text-decoration: underline dotted; /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */
b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd `em` font sizing in all browsers.
 */
code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */
small {
  font-size: 80%;
}

/**
 * Prevent `sub` and `sup` elements from affecting the line height in
 * all browsers.
 */
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Embedded content
   ========================================================================== */
/**
 * Remove the border on images inside links in IE 10.
 */
img {
  border-style: none;
}

/* Forms
   ========================================================================== */
/**
 * 1. Change the font styles in all browsers.
 * 2. Remove the margin in Firefox and Safari.
 */
button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  line-height: 1.15; /* 1 */
  margin: 0; /* 2 */
}

/**
 * Show the overflow in IE.
 * 1. Show the overflow in Edge.
 */
button,
input { /* 1 */
  overflow: visible;
}

/**
 * Remove the inheritance of text transform in Edge, Firefox, and IE.
 * 1. Remove the inheritance of text transform in Firefox.
 */
button,
select { /* 1 */
  text-transform: none;
}

/**
 * Correct the inability to style clickable types in iOS and Safari.
 */
button,
[type=button],
[type=reset],
[type=submit] {
  -webkit-appearance: button;
}

/**
 * Remove the inner border and padding in Firefox.
 */
button::-moz-focus-inner,
[type=button]::-moz-focus-inner,
[type=reset]::-moz-focus-inner,
[type=submit]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

/**
 * Restore the focus styles unset by the previous rule.
 */
button:-moz-focusring,
[type=button]:-moz-focusring,
[type=reset]:-moz-focusring,
[type=submit]:-moz-focusring {
  outline: 1px dotted ButtonText;
}

/**
 * Correct the padding in Firefox.
 */
fieldset {
  padding: 0.35em 0.75em 0.625em;
}

/**
 * 1. Correct the text wrapping in Edge and IE.
 * 2. Correct the color inheritance from `fieldset` elements in IE.
 * 3. Remove the padding so developers are not caught out when they zero out
 *    `fieldset` elements in all browsers.
 */
legend {
  box-sizing: border-box; /* 1 */
  color: inherit; /* 2 */
  display: table; /* 1 */
  max-width: 100%; /* 1 */
  padding: 0; /* 3 */
  white-space: normal; /* 1 */
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */
progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */
textarea {
  overflow: auto;
}

/**
 * 1. Add the correct box sizing in IE 10.
 * 2. Remove the padding in IE 10.
 */
[type=checkbox],
[type=radio] {
  box-sizing: border-box; /* 1 */
  padding: 0; /* 2 */
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */
[type=number]::-webkit-inner-spin-button,
[type=number]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * 1. Correct the odd appearance in Chrome and Safari.
 * 2. Correct the outline style in Safari.
 */
[type=search] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */
[type=search]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Change font properties to `inherit` in Safari.
 */
::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/* Interactive
   ========================================================================== */
/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */
details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */
summary {
  display: list-item;
}

/* Misc
   ========================================================================== */
/**
 * Add the correct display in IE 10+.
 */
template {
  display: none;
}

/**
 * Add the correct display in IE 10.
 */
[hidden] {
  display: none;
}

*,
*::after,
*::before {
  box-sizing: inherit;
}

body {
  box-sizing: border-box;
  background-image: url(..imglogo-cosmica.png);
}

.u-text-align-left {
  text-align: left !important;
}

.u-text-align-right {
  text-align: right !important;
}

.u-text-align-center {
  text-align: center !important;
}

.u-text-align-justify {
  text-align: justify !important;
}

.hamburger-button {
  display: block;
  cursor: pointer;
  width: 2em;
  height: 2em;
  background-color: #222;
  position: relative;
  border-radius: 0.2em;
}
.hamburger-button:hover {
  background-color: #2a2a2a;
}
.hamburger-button__top-bread {
  display: block;
  position: absolute;
  width: 80%;
  height: 10%;
  top: 20%;
  left: 10%;
  background-color: #eee;
}
.hamburger-button__meat {
  display: block;
  position: absolute;
  width: 80%;
  height: 10%;
  top: 50%;
  left: 10%;
  background-color: #eee;
  transform: translateY(-50%);
}
.hamburger-button__bottom-bread {
  display: block;
  position: absolute;
  width: 80%;
  height: 10%;
  bottom: 20%;
  left: 10%;
  background-color: #eee;
}

.main-header {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  top: 0;
  box-sizing: border-box;
  flex-wrap: wrap;
}
.main-header__logo-container {
  background-color: #47b;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
}
.main-header__logo-container_logo {
  height: 30px;
  margin: auto 10%;
}
.main-header__logo-container_logo:hover {
  transform: scale(1.6) translateX(10%) skewX(-2deg) skewY(3deg);
  transform-origin: left;
  border: solid #ED1C24;
  border-radius: 5%;
  box-shadow: -5px 5px 15px #ED1C24;
}
@media (min-width: 768px) {
  .main-header__logo-container {
    flex-basis: 15%;
  }
}
.main-header__search-form-container {
  color: white;
  border: solid 1px;
  background-color: #ED1C24;
  padding: 1em;
  height: 50px;
  width: 200px;
  flex-grow: 1;
}
@media (min-width: 768px) {
  .main-header__search-form-container {
    order: 2;
    flex-basis: 15em;
    flex-grow: 0;
    flex-shrink: 1;
  }
}
.main-header__search-form__input {
  min-width: none;
  width: 100px;
}
.main-header__cart-button-container {
  border: solid 1px;
  background-color: white;
  padding: 0.5em;
}
.main-header__cart-button-container_cart {
  height: 30px;
  margin: auto;
}
@media (min-width: 768px) {
  .main-header__cart-button-container {
    order: 3;
  }
}
.main-header__hamburger-button-container {
  padding: 0.5em;
  background-color: #47b;
  height: 50px;
}
@media (min-width: 768px) {
  .main-header__hamburger-button-container {
    display: none;
  }
}
.main-header__main-nav-container {
  flex-basis: 100%;
  height: 150px;
  display: none;
}
@media (min-width: 768px) {
  .main-header__main-nav-container {
    flex-basis: auto;
    order: 1;
    display: block;
    flex-grow: 1;
  }
}

.main-nav {
  border: solid 2px;
  position: relative;
  z-index: 10;
}
.main-nav__list {
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
}
@media (min-width: 768px) {
  .main-nav__list {
    flex-direction: row;
  }
}
.main-nav__item {
  text-align: center;
}
.main-nav__link {
  display: block;
  background-color: #47b;
  padding: 0.7em;
  color: #ED1C24;
  font-size: 1.2em;
  text-decoration: none;
  height: 50px;
}
.main-nav__link:hover, .main-nav__link:focus {
  background-color: orangered;
  outline: none;
}
@media (min-width: 1024px) {
  .main-nav__link {
    padding-left: 1em;
    padding-right: 1em;
  }
}

.main-nav-toggle {
  display: none;
}
.main-nav-toggle:checked ~ .main-header .main-header__main-nav-container {
  display: block;
}

.main-footer {
  background-color: white;
  background-image: url(../../img/logo-cosmica-footer.png);
  background-repeat: no-repeat;
  background-size: 100%;
  border: solid #ED1C24 8px;
  border-radius: 12px;
  padding: 0.5em;
  height: 300px;
}

.card {
  border: 7px solid #ED1C24;
  padding: 1.5em;
  width: 100%;
  max-width: 1200px;
  box-shadow: 0 10px 5px rgba(0, 0, 0, 0.2), 0 0 30px rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  /*transition: background-color .4s, transform 2s;*/
  transition: all 0.5s;
  transform: skewY(-3deg) skewX(-3deg);
  /*    
      &:nth-child(5n+1) {
          background-color: #c9d2da;
      }

      &:nth-child(5n+2) {
          background-color: #dee8eb;
      }

      &:nth-child(5n+3) {
          background-color: #f0f6de;
      }

      &:nth-child(5n+4) {
          background-color: #f3ded3;
      }

      &:nth-child(5n+5) {
          background-color: #dbcec0;
      }
  */
}
.card:hover {
  color: white;
  background-color: #47b;
  box-shadow: -2px 2px 5px #ED1C24, -2px -2px 5px #ED1C24, 2px 2px 5px #ED1C24, 2px -2px 5px #ED1C24;
  transform: skewY(3deg) skewX(3deg) skewX(180deg);
}
@media (min-width: 768px) {
  .card {
    transform: skewY(-1deg) skewX(-1deg);
  }
  .card:hover {
    color: white;
    background-color: #47b;
    box-shadow: -5px 5px 5px #ED1C24, -5px -5px 5px #ED1C24, 5px 5px 5px #ED1C24, 5px -5px 5px #ED1C24;
    color: white;
    background-color: #47b;
    transform: scale(1.05);
    box-shadow: -5px 5px 10px #47b, -5px -5px 10px #47b, 5px -5px 10px #47b, 5px 5px 10px #47b;
  }
}
@media (min-width: 1064px) {
  .card {
    transform: none;
  }
  .card:hover {
    transition: transform 1s;
  }
}

.cards-container {
  width: 100%;
  border: solid 15px black;
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: center;
  align-items: center;
}

/*# sourceMappingURL=main.cs.map */

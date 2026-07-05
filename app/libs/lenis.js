// Module-level handle to the page's Lenis instance so deep components
// (chapter rail) can drive programmatic smooth scroll without prop drilling.
let lenisInstance = null;

export function setLenis(instance) {
  lenisInstance = instance;
}

export function getLenis() {
  return lenisInstance;
}

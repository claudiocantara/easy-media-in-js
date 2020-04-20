export default class {
  constructor() {
    this.defaultSizes = {
      smallPhone: 300,
      phone: 600,
      tablet: 960,
      desktop: 1280,
      largeDesktop: 1600,
    };
    this.sizes = this.defaultSizes;
  }

  getSizes () {
    return this.sizes;
  }

  setSizes (newSizes) {
    this.validateSizes();
    this.sizes = { ...this.defaultSizes, ...newSizes };
  }

  validateSizes(newSizes) {   
    if (
    newSizes &&
    typeof newSizes === "object" &&
    newSizes.constructor !== Object
  )
    throw new Error(`Your parameter must be a Object, try to fix it.`);}
}
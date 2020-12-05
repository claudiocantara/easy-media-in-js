const Sizes = function () {
  this.defaultSizes = {
    smallPhone: 300,
    phone: 600,
    tablet: 960,
    desktop: 1280,
    largeDesktop: 1600,
  };
  this.sizes = this.defaultSizes;
};

Sizes.prototype.getSizes = function () {
  return this.sizes;
};

Sizes.prototype.setSizes = function (newSizes) {
  this.validateSizes();
  this.sizes = { ...this.defaultSizes, ...newSizes };
};

Sizes.prototype.validateSizes = function (newSizes) {
  if (
    newSizes &&
    typeof newSizes === "object" &&
    newSizes.constructor !== Object
  )
    throw new Error(`Your parameter must be a Object, try to fix it.`);
};

export default Sizes;

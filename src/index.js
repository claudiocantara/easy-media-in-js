const Sizes = {
  defaultSizes: {
    smallPhone: 300,
    phone: 600,
    tablet: 960,
    desktop: 1280,
    largeDesktop: 1600,
  },
  sizes: function () {
    return this.defaultSizes;
  },
  getSizes: function () {
    return this.sizes;
  },
  setSizes: function (newSizes) {
    this.validateSizes();
    this.sizes = { ...this.defaultSizes, ...newSizes };
  },
  validateSizes: function (newSizes) {   
    if (
    newSizes &&
    typeof newSizes === "object" &&
    newSizes.constructor !== Object
  )
    throw new Error(`Your parameter must be a Object, try to fix it.`);}
};

const rgxMediaRules = () => {
  const sizeNames = Object.keys(Sizes.getSizes()).join("|");

  return new RegExp(
    `(^(${sizeNames}) ([<=|>=|>|< ${sizeNames} <=|>=|>|<]+) (${sizeNames})$|(^(<=|>=|>|<) (${sizeNames})$)|(^(${sizeNames})$))`,
    "g"
  );
};

const validateParam = (media) => {
  if (typeof media !== "string")
    throw new Error(
      `Invalid parameter, provide a string instead ${typeof media}`
    );
  if (!media.trim().length)
    throw new Error("Your string is empty, please provide a valid query");
  if (!rgxMediaRules().test(media.trim()))
    throw new Error(
      "Your media query rule seems not match with a valid pattern, please provide a valid query! https://github.com/claudiocantara/easy-media-in-js#possibilities"
    );

  media
    .trim()
    .split(" ")
    .reduce((accumulator, currentValue) => {
      if (accumulator === "" && accumulator === currentValue)
        throw new Error(
          "Your string has extra spaces between words, please fix it."
        );
      return currentValue;
    });
};

const unSerializeString = (medias) => {
  const mediaRules = medias.trim().match(rgxMediaRules())[0];

  return mediaRules
    .split(" ")
    .map(mapMediaQuery.bind(null, { value: false }))
    .reduce(serializeMediaQuery, "@media");
};

const mapMediaQuery = (previosWasEquals, rule, _index, array) => {
  const isCondition = /<=|>=|>|</g.test(rule);

  validateRule(rule, isCondition);

  const mediaQuery = resolveMedias(previosWasEquals, rule, array, isCondition);

  return mediaQuery;
};

const validateRule = (rule, isCondition) => {

  if (!isCondition && typeof Sizes.getSizes()[rule] != "number")
    throw new Error(
      `Your rule ${rule} with value ${Sizes.getSizes()[rule]} must be a Number.`
    );
};

const resolveMedias = (previosWasEquals, rule, array, isCondition) => {
  let lastRule;

  if (array.length === 1) {
    return `(min-width: ${Sizes.getSizes()[rule]}px)`;
  } else if (isCondition) {
    previosWasEquals.value = /=/g.test(rule);
    return />/g.test(rule) ? "(min-width: " : "(max-width: ";
  } else {
    lastRule = previosWasEquals.value
      ? `${Sizes.getSizes()[rule] - 1}px)`
      : `${Sizes.getSizes()[rule]}px)`;

    previosWasEquals.value = false;
  }

  return lastRule;
};

const serializeMediaQuery = (accumulator, currentValue, index, array) => {
  if (array.length <= 2) return accumulator + currentValue;

  const isFirstValue = index == 0 && /px/g.test(currentValue);
  const isCondition = /-/g.test(currentValue);
  const arrayLength = array.length - 1;

  const firsResult = `(min-width: ${currentValue} and `;

  const secondResult =
    index !== arrayLength && !isCondition
      ? `${currentValue} and `
      : currentValue;

  return accumulator + (isFirstValue ? firsResult : secondResult);
};

const setSizes = (newSizes) => {
  Sizes.setSizes(newSizes);
};

const useMedia = (media) => {
  validateParam(media);
  const mediaQuery = unSerializeString(media);

  return mediaQuery;
};

export default useMedia;
export { setSizes };

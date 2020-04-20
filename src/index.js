import breakpoints from "./sizes";
const Sizes = new breakpoints();

const rgxMediaRules = () => {
 
  const sizeNames = Object.keys(Sizes.getSizes()).join("|");
  return new RegExp(
    `(^(${sizeNames}) ([<=|>=|>|< ${sizeNames} <=|>=|>|<]+) (${sizeNames})$|(^(<=|>=|>|<) (${sizeNames})$)|(^(${sizeNames})$))`,
    "g"
  );
};

const validateParam = (media) => {
  if (!rgxMediaRules().test(media.trim()))
    throw new Error(
      "Your media query rule seems not match with a valid pattern, please provide a valid query! https://github.com/claudiocantara/easy-media-in-js#possibilities"
    );
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
  if (!isCondition && rule === "") throw new Error("Your string has empty spaces");
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

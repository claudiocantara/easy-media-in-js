let sizes = {
  small: 300,
  phone: 480,
  tablet: 720,
  desktop: 1280,
  largeDesktop: 1440
}

const sizesNames = Object.keys(sizes).join('|');

const rgxMediaRules = new RegExp(`(^(${sizesNames}) ([<=|>=|>|< ${sizesNames} <=|>=|>|<]+) (${sizesNames})$|(^(<=|>=|>|<) (${sizesNames})$)|(^(${sizesNames})$))`, 'g')

const rgxConditions = /<=|>=|>|</g

const validateParam = media => {
  if (typeof media !== "string")
    throw new Error(
      `Invalid parameter, provide a string instead ${typeof media}`
    )

  if (!media.trim().length)
    throw new Error("Your string is empty, please provide a valid query")
  // TODO point to documentation
  if (!rgxMediaRules.test(media.trim()))
    throw new Error(
      "Your media query rule seems not match with a valid pattern, please provide a valid query!"
    )

  media
    .trim()
    .split(" ")
    .reduce((accumulator, currentValue) => {
      if (accumulator === "" && accumulator === currentValue)
        throw new Error(
          "Your string has extra spaces between words, please fix it."
        )
      return currentValue
    })
}

const unSerializeString = medias => {
  const mediaRules = medias.trim().match(rgxMediaRules)[0]
  let previosWasEquals = { value: false }

  return mediaRules
    .split(" ")
    .map(mapMediaQuery.bind(null, previosWasEquals))
    .reduce(serializeMediaQuery, "@media")
}

const mapMediaQuery = (previosWasEquals, rule, _index, array) => {
  if( typeof sizes[rule] != 'number') throw new Error(`Your rule ${rule} with value ${sizes[rule]} must be a Number.`);

  if (array.length === 1) return `(min-width: ${sizes[rule]}px)`

  if (rgxConditions.test(rule)) {
    previosWasEquals.value = /=/g.test(rule)
    return />/g.test(rule) ? "(min-width: " : "(max-width: "
  }
  const lastRule = previosWasEquals.value
    ? `${sizes[rule] - 1}px)`
    : `${sizes[rule]}px)`

  previosWasEquals.value = false

  return lastRule
}

const serializeMediaQuery = (accumulator, currentValue, index, array) => {
  if (array.length <= 2) return accumulator + currentValue

  const isFirstValue = index == 0 && /px/g.test(currentValue)
  const isCondition = /-/g.test(currentValue)
  const arrayLength = array.length - 1

  const firsResult = `(min-width: ${currentValue} and `
  const secondResult =
    index !== arrayLength && !isCondition
      ? `${currentValue} and `
      : currentValue

  return accumulator + (isFirstValue ? firsResult : secondResult)
}

const setSizes = newSizes => {
  sizes = newSizes
}

const useMedia = media => {
  validateParam(media)
  const mediaQuery = unSerializeString(media)

  return mediaQuery
}

export default useMedia
export { setSizes }

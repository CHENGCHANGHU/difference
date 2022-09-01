
/**
 * tail recursive function of difference
 * @param {*} stack stack to difference
 * @param {*} differences result differences accumulator
 * @param {*} option options of difference
 * @returns 
 */
 function differenceTR(stack, differences, option) {
  if (!stack.length) return differences;
  const { before, after, routes } = stack.pop();
  
  if (option.covers.length) {
    const cover = option.covers.find(({ routes: r }) => difference(r, routes).length === 0);
    if (cover && cover.handler) {
      const specifiedDifferences = cover.handler(before, after, routes);
      if (specifiedDifferences) {
        // const { before, after, routes } = specifiedDifferences;
        // differences.push({ before, after, routes });
        differences.push(...specifiedDifferences);
        return differenceTR(stack, differences, option);
      } else {
        return differenceTR(stack, differences, option);
      }
    } else if (cover) {
      if (difference(before, after).length) {
        differences.push({ before, after, routes });
        return differenceTR(stack, differences, option);
      } else {
        return differenceTR(stack, differences, option);
      }
    }
  }

  const beforeType = typeof before;
  const afterType = typeof after;
  if (beforeType === 'object' && afterType === 'object' && before && after) {
    // object type
    if (Array.isArray(before) && Array.isArray(after) && !option.arrayInOrder) {
      const sortedBefore = [...before].sort(option.arraySort) || [];
      const sortedAfter = [...after].sort(option.arraySort) || [];
      stack.push(...Array
        .from(new Set([...Object.keys(sortedBefore), ...Object.keys(sortedAfter)]))
        .map(key => ({
          routes: [...routes, key],
          before: sortedBefore[key],
          after: sortedAfter[key],
        })));
    } else {
      if ((before instanceof Date && after instanceof Date
          || before instanceof RegExp && after instanceof RegExp)
        && before.toString() !== after.toString()
      ) {
        differences.push({ before, after, routes });
      }
      stack.push(...Array.from(new Set([...Object.keys(before), ...Object.keys(after)]))
        .map(key => ({
          routes: [...routes, key],
          before: before[key],
          after: after[key],
        })));
    }
  } else if (before !== after) {
    // basic type
    differences.push({ routes, before, after });
  }
  return differenceTR(stack, differences, option);
}

/**
 * find the difference between Object(before) and Object(after)
 * @param {*} before before value
 * @param {*} after after value
 * @param {*} option options of difference
 * @returns :routes -> route in object, :before -> before value, :after -> after value
 */

/**
 * find the difference between Object(before) and Object(after)
 * @param before the before value for diff
 * @param after the after value for diff
 * @param option.routes initial routes
 * @param option.arrayInOrder If array needs keep order when contrast.
 * @param option.arraySort sort function when array keeps order
 * @param option.covers Cover array to custom specific contrast handler for specific routes.
 * Handle function's return should be an array consisted of Difference<T> or a falsy value.
 * Handle function's return will be pushed into the diff results array when it is not a falsy value.
 * @returns routes: route in object, before: before value, after: after value
 */

/**
 * Difference between before value and after value
 * @param {*} before the before value for difference
 * @param {*} after the after value for difference
 * @param {*} option.routes initial routes
 * @param {*} option.arrayInOrder If array needs keep order when contrast.
 * @param {*} option.arraySort sort function when array keeps order
 * @param {*} option.covers Cover array to custom specific contrast handler for specific routes.
 * Handle function's return should be an array consisted of Difference<T> or a falsy value.
 * Handle function's return will be pushed into the diff results array when it is not a falsy value.
 * @returns Array of differences.
 * Difference item consists of routes (routes in object), before (before value) and after (after value).
 */
export function difference(
  before,
  after,
  option = {
    routes: [],
    arrayInOrder: false,
    arraySort: (a, b) => a < b ? -1 : 1,
    covers: []
  }
) {
  return differenceTR(
    [{ before, after, routes: option.routes || [] }],
    [],
    {
      routes: [],
      arrayInOrder: false,
      arraySort: (a, b) => a < b ? -1 : 1,
      covers: [],
      ...option,
    }
  );
}

'use strict'

/**
 * Sets a value at the path in the provided object
 * @param {Object} object Object
 * @param {string|string[]} path Path in object 
 * @param {*} value Value to set in object 
 */
exports.set = function set(object, path, value) {
  // Regex explained: https://regexr.com/58j0k
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g)

  pathArray.reduce((acc, key, i) => {
    if (acc[key] === undefined) {
      acc[key] = {}
    }

    if (i === pathArray.length - 1) {
      acc[key] = value
    }

    return acc[key]
  }, object)
}
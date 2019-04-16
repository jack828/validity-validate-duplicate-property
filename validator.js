var escapeRegexp = require('escape-string-regexp')

module.exports = function createValidator(save, propertyName) {
  if (!save) throw new Error('save is required')

  function duplicatePropertyValidator(key, errorProperty, object, callback) {
    // Use propertyName to override default
    // behaviour of using current property's name
    var propertyKey = propertyName || key
    var propertyValue = object[propertyKey]
    var query = {}
    query[propertyKey] = new RegExp(
      ['^', escapeRegexp(propertyValue), '$'].join(''),
      'i'
    )

    save.findOne(query, (error, found) => {
      if (error) return callback(error)
      callback(
        null,
        found && found._id.toString() !== object._id
          ? propertyValue + ' is already in use'
          : undefined
      )
    })
  }
  return duplicatePropertyValidator
}

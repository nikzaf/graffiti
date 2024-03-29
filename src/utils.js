import escapeHTML from 'escape-html'

export const renderToJSON = object => {
  return JSON.stringify(object, (key, value) => {
    return typeof value === 'string' ? escapeHTML(value) : value
  })
}

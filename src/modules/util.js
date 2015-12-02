import escapeHTML from 'escape-html'

export function clearModuleCache () {
  const componentsRegExp = /\/src\/components\/.+\.js$/
  const reducersRegExp = /\/src\/reducers\/.+\.js$/

  for (const path of Object.keys(require.cache)) {
    if (componentsRegExp.test(path) || reducersRegExp.test(path)) {
      delete require.cache[path]
    }
  }
}

export function renderToJSON (object) {
  return JSON.stringify(object, (key, value) => {
    return typeof value === 'string' ? escapeHTML(value) : value
  })
}

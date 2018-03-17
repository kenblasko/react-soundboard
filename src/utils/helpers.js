export const validate = (fields) => {
  return Object.keys(fields).reduce((isValid, field) => {
    if (!fields[field]) isValid = false
    if (fields[field].length === 0) isValid = false
    return isValid
  }, true)
}

export const reset = (fields) => {
  Object.keys(fields).forEach(f => fields[f] = '')
  return fields;
}

export const capitalize = (s) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const getLocalStorage = (parse = false, key = '_cbt_sb_keys') => {
  return parse ? JSON.parse(localStorage.getItem(key)) : localStorage.getItem(key)
}

export const setLocalStorage = (data, key = '_cbt_sb_keys') => {
  localStorage.setItem(key, JSON.stringify(data))
}

export const bindingExists = (existingBindings, items, value) => {
  let id = Object.keys(existingBindings).find(key => existingBindings[key] === value)
  return items.find(i => i.id === id)
}

export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
export function setStorage(key, data) {
  window.localStorage.setItem(key, JSON.stringify(data));
}
export function getStorage(key) {
  const result = window.localStorage.getItem(key);
  if (result) {
    return JSON.parse(result);
  }
  return null;
}
export function removeStorage(key) {
  window.localStorage.removeItem(key);
}

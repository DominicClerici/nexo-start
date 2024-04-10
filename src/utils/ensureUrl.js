const ensureAbsoluteURL = (url) => {
  if (!url.match(/^https?:\/\//i)) {
    return "https://" + url
  }
  return url
}
export default ensureAbsoluteURL

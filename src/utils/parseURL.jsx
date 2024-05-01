function parseUrl(urlString) {
  try {
    const url = new URL(urlString)
    let host = url.hostname
    if (host.startsWith("www.")) {
      host = host.substring(4)
    }

    const pathSegments = url.pathname.split("/").filter((segment) => segment !== "")

    return {
      host: host,
      firstpath: pathSegments[0] || null,
      secondpath: pathSegments[1] || null,
      continues: pathSegments.length > 2,
    }
  } catch (e) {
    // Check if the input is a valid hostname without a protocol
    if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(urlString)) {
      return {
        host: urlString,
        firstpath: null,
        secondpath: null,
        continues: false,
      }
    }
    return false
  }
}

const prettyURL = (url) => {
  const urlData = parseUrl(url)
  let prettyUrl
  if (typeof urlData == "object") {
    prettyUrl = (
      <>
        <span className="">{urlData.host.split("%")[0]}</span>
        {urlData.firstpath ? (
          <>
            /<span className="text-black/60 dark:text-white/60">{urlData.firstpath}</span>
          </>
        ) : null}
        {urlData.secondpath ? (
          <>
            /<span className="text-black/60 dark:text-white/60">{urlData.secondpath}</span>
          </>
        ) : null}
        {urlData.continues ? (
          <>
            /<span className="text-black/60 dark:text-white/60">...</span>
          </>
        ) : null}
      </>
    )
  } else if (typeof urlData == "string") {
    prettyUrl = <span>{urlData.slice(0, 20) + "..."}</span>
  } else {
    prettyUrl = <></>
  }
  return prettyUrl
}
export default prettyURL

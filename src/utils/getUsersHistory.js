const getHistory = (prompt) => {
  return new Promise((resolve, reject) => {
    const timeAgo = Date.now() - 2592000000 // 30 days in ms
    const searchParams = {
      maxResults: 50,
      text: prompt,
      startTime: timeAgo,
    }
    try {
      chrome.history.search(searchParams).then((results) => {
        const items = processHistory(results)
        resolve(items)
      })
    } catch (e) {
      // might not have permission or be in dev environment
      reject(e)
    }
  })
}

const processHistory = (results) => {
  const entries = results.map((entry) => {
    return {
      title: entry.title,
      url: entry.url,
    }
  })
  return entries
}

export default getHistory

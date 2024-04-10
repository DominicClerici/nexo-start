const requestHistoryPermission = (set) => {
  try {
    chrome.permissions.request(
      {
        permissions: ["history"],
      },
      function (granted) {
        if (granted) {
          // The user granted the permission
          set(true)
        } else {
          // The user denied the permission
          set(false)
        }
      }
    )
  } catch (e) {
    console.log(e)
    // likely in dev environment
    set(false)
  }
}

const revokeHistoryPermission = (set) => {
  try {
    chrome.permissions.remove(
      {
        permissions: ["history"],
      },
      function (removed) {
        if (removed) {
          // The permission was removed
          set(false)
        } else {
          // The permission was not removed
          set(true)
        }
      }
    )
  } catch (e) {
    console.log(e)
    // likely in dev environment
    set(true)
  }
}

export { requestHistoryPermission, revokeHistoryPermission }

export async function authFetch(
  input: RequestInfo,
  init: RequestInit = {}
) {
  const res = await fetch(input, {
    ...init,
    credentials: "include",
  })

  if (res.status === 401) {
    window.location.href =
      "/login?next=" + encodeURIComponent(window.location.href)
  }

  return res
}

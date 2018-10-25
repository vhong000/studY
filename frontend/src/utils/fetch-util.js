
export const apiPostCall = (url, headers, body) => {
  return fetch(url, {
    method: "POST"
  })
}
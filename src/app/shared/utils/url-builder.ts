export default class UrlBuilder {
  private api: string
  private endpoint: string
  private queryParams: string[]

  constructor(api: string, endpoint: string) {
    const leadingAndTrailingSlash = new RegExp(/(^\/)(\/$)/)
    this.api = api.replace(leadingAndTrailingSlash, "")
    this.endpoint = endpoint.replace(leadingAndTrailingSlash, "")
    this.queryParams = []
  }

  get url(): string {
    return `${this.api}/${this.endpoint}?${this.queryParams.join("&")}`
  }

  addQueryParam(name: string, value: string): UrlBuilder {
    this.removeQueryParam(name)
    this.queryParams.push(`${name}=${value}`)
    return this
  }

  removeQueryParam(name: string) {
    const index = this.queryParams.findIndex(queryParam => queryParam.includes(name))
    if (index >= 0) this.queryParams.splice(index)
  }
}

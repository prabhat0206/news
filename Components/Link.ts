class NLink {
  api: string;
  link: string =
    'http://newsapi.org/v2/top-headlines?category=technology&language=en&apiKey=';
  // 'http://newsapi.org/v2/everything?q=coding+programming&language=en&from=2021-01-26&apiKey=';
  constructor() {
    this.api = 'enter your key here';
  }

  get_links() {
    return this.link + this.api;
  }
}

export default NLink;

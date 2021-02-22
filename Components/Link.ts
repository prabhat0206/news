class NLink {
  api: string;
  link: string =
    'http://newsapi.org/v2/top-headlines?category=technology&language=en&apiKey=';
  // 'http://newsapi.org/v2/everything?q=coding+programming&language=en&from=2021-01-26&apiKey=';
  constructor() {
    this.api = '876fba2a65dd420fbd4b85fb700e921a';
  }

  get_links() {
    return this.link + this.api;
  }
}

export default NLink;

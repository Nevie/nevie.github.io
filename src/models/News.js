export class News {
    constructor(author, description, publishedAt, title, url, urlToImage="",source) {
        this.author = author;
        this.description = description;
        this.publishedAt = publishedAt;
        this.title = title;
        this.url = url;
        this.urlToImage = urlToImage;
        this.source = source
    }
}
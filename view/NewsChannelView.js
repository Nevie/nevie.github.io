export class NewsChannelView {
    static drawChannelList(data) {
        if (!Array.isArray(data)) {
            return "No data"
        }

        let list = document.createElement("ul");
        list.setAttribute('class', "list-group");
        data.forEach(item => {
            let li = document.createElement("LI");
            li.setAttribute('class', "list-group-item");
            li.setAttribute("id", item.id);
            let span = document.createElement("span");
            let div = document.createElement("div");
            let name = document.createTextNode(item.name);
            let description = document.createTextNode(item.description);
            span.appendChild(name);
            div.appendChild(description);
            li.appendChild(span);
            li.appendChild(div);
            list.appendChild(li)
        });
        document.getElementById("channelsBlock").appendChild(list);
    }

    static drawNewsList(data) {
        if (!Array.isArray(data)) {
            return "No data"
        }

        let list = document.createElement("ul");
        list.setAttribute('class', "list-group");

        data.forEach(item => {
            let li = document.createElement("LI");
            li.setAttribute('class', "list-group-item");

            let publishedAt = document.createElement("small");
            let dataPublish = new Date(item.publishedAt);
            publishedAt.innerText = dataPublish.toLocaleDateString();

            let title = document.createElement("a");
            title.innerText = item.title;
            title.setAttribute('href', item.url);
            title.setAttribute("target", "_blank");

            let description = document.createElement("div");
            description.setAttribute('class', "d-flex w-100 justify-content-between");
            let img = document.createElement("img");
            img.setAttribute('src', item.urlToImage);
            img.setAttribute('alt', item.title);
            img.setAttribute('class', "leftimg");
            description.appendChild(img);

            let descriptionText = document.createElement('h5');
            descriptionText.setAttribute('class', "mb-1");
            descriptionText.innerText = item.description;
            description.appendChild(descriptionText);
            description.appendChild(publishedAt);
            li.appendChild(title);
            li.appendChild(description);

            list.appendChild(li)
        });
        document.getElementById("newsBlock").appendChild(list);
    }
}
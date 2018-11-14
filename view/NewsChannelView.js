export class NewsChannelView {
    static drawChannelList(data) {
        if (!Array.isArray(data)) {
            return "No data"
        }

        let html = ``;
        data.forEach(item => {
            html += `<li class="list-group-item">
                    <span>${item.name}</span>
                    <div id="${item.id}">${item.description}</div>
                 </li>`;


        });
        document.querySelector("#channelsBlock ul").insertAdjacentHTML('beforeend', html);
    }

    static drawNewsList(data) {
        if (!Array.isArray(data)) {
            return "No data"
        }

        let html = ``;
        data.forEach(item => {
            let dataPublish = new Date(item.publishedAt);

            html += `<li class="list-group-item">
                   <a href="${item.url}" target="_blank">${item.title}</a>
                   <div class="d-flex w-100 justify-content-between">
                       <img src="${item.urlToImage}" alt="${item.title}" class="leftimg">
                       <h5 class="mb-1">${item.description}</h5><small>${dataPublish.toLocaleDateString()}</small>
                   </div>
             </li>`;
        });
        document.querySelector("#newsBlock ul").insertAdjacentHTML('beforeend', html);;
    }
}
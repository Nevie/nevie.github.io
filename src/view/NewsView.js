export class NewsView {
    constructor(element){
        this.page = element;
    }

    drawNews(data ) {
        let chn = this.page.querySelector("#currentChanel");
        chn.innerText = data[0].source.name;

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

        this.page.querySelector("#newsBlock ul").innerHTML = html;
    }
}
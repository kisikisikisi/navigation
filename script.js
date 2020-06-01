var list = []
// read txt data
function showImage() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", chrome.runtime.getURL("result.txt"), true);
    xmlHttp.send(null);
    xmlHttp.onload = function () {
        var data = xmlHttp.responseText;
        list.push(data);
        console.log(data);
        if (list[-1] == list[-2] && list.length > 1) {
            return;
        }
        //let ads = document.getElementById("ads-banner");
        //if (ads !== null) {
        //    ads.remove();
        //}
        // Show Image
        let body = document.body;
        let div = '<div id="ads-banner" style="position: fixed; float: right; top: auto;right: 60px; bottom: 0; width: auto; height: auto; max-width: 320px; margin: 0 0 0 110px; z-index: 2; border: 1px solid #aaa; padding: 5px; background-color: white; box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);"></div>';

        const imgURL = chrome.extension.getURL("thumbnail_data/" + data + ".jpeg");
        const img = `<img src="${imgURL}" style="width: 320px; height: 240px; background-color: lightgray;">`;

        let button = `<button id="delete" style="position: absolute; top: 5px; height: 20px; width: 20px; padding: 1px; right: 5px; opacity: 0.75;">×</button>`;
        let title = document.title;
        console.log(title);
        if (list.length > 1) {
            banner.insertAdjacentHTML("afterbegin", img);
        } else {
            body.insertAdjacentHTML("afterbegin", div);
            const banner = document.getElementById("ads-banner");
            const text = '<a href=""><font size="4">Qiita</a>';
            const date = '<p>3日前に閲覧</p>';
            banner.insertAdjacentHTML("afterbegin", date);
            banner.insertAdjacentHTML("afterbegin", text);
            banner.insertAdjacentHTML("afterbegin", img);
            banner.insertAdjacentHTML("afterbegin", button);

            deleteButton = document.getElementById('delete');
            deleteButton.onclick = () => {
                console.log("delete");
                banner.remove();
            };
        }
    }
}
setInterval(showImage, 1000);




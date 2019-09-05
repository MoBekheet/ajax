let xmlHTTP;
window.XMLHttpRequest
  ? xmlHTTP = new XMLHttpRequest()
  : xmlHTTP = new ActiveXObject("Microsoft.XMLHTTP");

const getNews = (method, url) => {
  xmlHTTP.open(method, url);
  xmlHTTP.send();
}
let injection = (country = "eg", category = "general") => {
  getNews(`GET`, `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=59edde7adf704236ad75cd5e49601369`);
}
injection();
let links = document.querySelectorAll(".nav-link");
for (i of links) {
  i.addEventListener("click", e => {
    injection("", e.target.innerHTML)
  })
}
xmlHTTP.onreadystatechange = _ => {
  let temp = '';
  let output = document.getElementById("rows");
  if (xmlHTTP.readyState == 4 && xmlHTTP.status == 200) {
    let news = JSON.parse(xmlHTTP.response).articles;
    for (i in news) {
      temp +=
        `<div class="col-md-4">
        <a href="${news[i].url}">
          <div class="post">
            <img src="${news[i].urlToImage}" alt="">
            <h5> ${news[i].title} </h5>
            <p>${news[i].description}</p>
          </div>
          </a>
        </div>
        `
    }
    output.innerHTML = temp;
  } else {
    if (xmlHTTP.status == 403) {
      output.innerHTML = `<h1>403: "Forbidden"</h1>`;
    } else if (xmlHTTP.status == 404) {
      output.innerHTML = `<h1>404: "Not Found"</h1>`;
    }
  }
}








let fibonacci = {
  [Symbol.iterator]() {
    let pre = 0, cur = 1
    return {
      next() {
        [pre, cur] = [cur, pre + cur]
        return { done: false, value: cur }
      }
    }
  }
}

for (let n of fibonacci) {
  if (n > 1000)
    break
  console.log(n)
}
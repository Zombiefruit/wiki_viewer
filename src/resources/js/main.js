var dataObject = new XMLHttpRequest();

document.getElementById('random').onclick = function() {
  var win = window.open("https://en.wikipedia.org/wiki/Special:Random", '_blank');
  win.focus();
};

document.getElementById('search').onclick = function() {
  submitQuery();
};

document.getElementById('query').onfocus = function() {
  document.getElementById('query').setAttribute('placeholder', "");
};

document.getElementById('query').onblur = function() {
  document.getElementById('query').setAttribute('placeholder', "Search Wikipedia for...");
};

document.getElementById('query').onkeydown = function(e) {
  if (e.keyCode === 13) {
    submitQuery();
  }
};

function submitQuery() {
  var searchButton = document.getElementById('search');
  var searchQuery = encodeURIComponent(document.getElementById('query').value.split(" ").join("+"));
  var searchURI = "/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=" + searchQuery;
  console.log(searchQuery);
  dataCall(searchURI);
};

function dataListener() {
  var jsonData = JSON.parse(this.response);
  var numResults = jsonData.query.search.length;

  document.getElementById('article-inject').innerHTML = "";
  for (var i = 0; i < numResults; i++) {
    addLink(jsonData.query.search[i]);
    //document.getElementById('article-inject').innerHTML += "<p>" + JSON.stringify(jsonData.query.search[i].title) + " : " + JSON.stringify(jsonData.query.search[i].snippet) + "</p>";
  }
};

function dataCall(searchURI) {
  dataObject.addEventListener("load", dataListener);
  dataObject.open("GET", "https://en.wikipedia.org" + searchURI);
  dataObject.send();
};

function addLink(linkItem) {
  var link = document.createElement('a');
  var linkText = JSON.stringify(linkItem.title);
  link.appendChild(linkText);
  link.title = JSON.stringify(linkItem.title);
  link.href = "https://wikipedia.org/wiki/" + link.title;
  document.getElementById('article-inject').appendChild(link);
};

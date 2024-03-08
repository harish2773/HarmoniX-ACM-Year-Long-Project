
function onAnchorClick(event) {
  chrome.tabs.create({
    selected: true,
    url: event.srcElement.href,
  });
  return false;
}

// Given an array of URLs, build a DOM list of those URLs in the
// browser action popup.
function buildPopupDom(divName, data) {
  let popupDiv = document.getElementById(divName);

  let ul = document.createElement("ul");
  popupDiv.appendChild(ul);

  for (let i = 0, ie = data.length; i < ie; ++i) {
    let a = document.createElement("a");
    a.href = data[i];
    a.appendChild(document.createTextNode(data[i]));
    a.addEventListener("click", onAnchorClick);

    let li = document.createElement("li");
    li.appendChild(a);

    ul.appendChild(li);
  }
}

// Search history to find up to ten links that a user has typed in,
// and show those links in a popup.
function buildTypedUrlList(divName) {

 
  let microsecondsperDay = 1000 * 60 * 60 * 24;
  let oneDayAgo = new Date().getTime() - microsecondsperDay;

 
  let numRequestsOutstanding = 0;

  let urlToCount = [];

  chrome.history.search(
    {
      text: "", // Return every history item....
      startTime: oneDayAgo, // that was accessed less than one day ago.
    },
    function (historyItems) {

      // For each history item, get details on all visits.
      for (let i = 0; i < historyItems.length; ++i) {
        let url = historyItems[i].url;
        urlToCount.push(url);
        console.log(url);
        console.log(historyItems[i].title);
  
      }
      
      onAllVisitsProcessed();
      
    }
  );


  // This function is called when we have the final list of URls to display.
  const onAllVisitsProcessed = () => {
    let urlArray = [];
  
    for (let i = 0; i < urlToCount.length; ++i) {
      urlArray.push(urlToCount[i]);
      console.log(urlToCount[i]);
    }

    buildPopupDom(divName, urlArray.slice(0, 10));
  };
}

document.addEventListener("DOMContentLoaded", function () {
  buildTypedUrlList("typedUrl_div");
});

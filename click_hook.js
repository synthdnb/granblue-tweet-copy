
var cl = function(ev){
  var re = /ID(?:: |：)(\w+)/;
  if(ev.target.nodeName.toLowerCase() == "p" && ev.target.classList.contains('tweet-text')) {
    for(var i in ev.target.childNodes) {
      var cnode = ev.target.childNodes[i];
      var text = cnode.textContent;
      if(match = re.exec(cnode.textContent)) {
        var st = text.indexOf(match[1]);
        var ed = st+8;

        ev.target.style.webkitUserSelect = "text"
        var range = document.createRange();
        range.setStart(cnode,st);
        range.setEnd(cnode,ed);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        chrome.runtime.sendMessage({data: "data"});
        var success = document.execCommand('copy');  
        chrome.runtime.sendMessage({title: range.toString(), message: text}, function(){});
        ev.stopPropagation();
        ev.preventDefault();
        ev.target.style.webkitUserSelect = ""
        return false;
      }
    }
  }
}
document.addEventListener('click', cl);

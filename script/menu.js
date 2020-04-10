const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

var lang = urlParams.get('lang');
if (lang == null) lang = 'ned';

var url = 'script/menu/'+urlParams.get('menu')+'_'+lang+'.pdf';
var pageNum = 1;
var currentPDF = null;

pdfjsLib.GlobalWorkerOptions.workerSrc = 'script/build/pdf.worker.js';

window.addEventListener('load', function () {
    genPage();
    /*
    var ned_flag = document.getElementById("ned");
    var du_flag = document.getElementById("du");
    var items = document.getElementsByClassName("menu_item");
    for(var i = 0; i < items.length; i++) {
        items[i].href += "&lang="+lang;
    }
    console.log(items);
    console.log(lang);

    if(lang == "ned") {
        ned_flag.style.border = "3px solid #ffe9ad";
    }  else if (lang == "du") {
        du_flag.style.border = "3px solid #ffe9ad";
    }

    ned_flag.onclick = function() {
        window.location.href = "menu.html?menu=lunch&lang=ned";
    };

    du_flag.onclick = function() {
        window.location.href = "menu.html?menu=lunch&lang=du";
    };
    */
});

function genPage() {
    //
    // Asynchronous download PDF
    //
    var loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function(pdf) {
      //
      // Fetch the first page
      //
      pdf.getPage(pageNum).then(function(page) {
        var scale = 1.5;
        var viewport = page.getViewport({ scale: scale, });

        //
        // Prepare canvas using PDF page dimensions
        //
        var canvas = document.getElementById('menu');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        //
        // Render PDF page into canvas context
        //
        var renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        page.render(renderContext);
        currentPDF = pdf;
      });
    });
}

function pageUp() {
    if(pageNum < currentPDF.numPages) {
        pageNum++;
        genPage();
    }
}

function pageDown() {
    if(pageNum>1) {
        pageNum--;
        genPage();
    }
}

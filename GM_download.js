var GM_xmlhttpRequest = GM.xmlHttpRequest;

if (typeof GM_xmlhttpRequest != "function") {
  throw new Error('typeof GM_xmlhttpRequest != "function"');
}

function GM_download(info, name) {
  let emptyFunction = function() {};

  var details = {
    "url": null,
    "name": 'unknown.txt',
    "onabort": emptyFunction,
    "onerror": emptyFunction,
    "onload": emptyFunction,
    "onprogress": emptyFunction,
    "ontimeout": emptyFunction,
  };

  var _details = {};

  if (info) {
    if (typeof info == "object") {
      for (let i in info) {
        _details[i] = info[i];
      }
    } else if (typeof info == "string") {
      details.url = info;
    }
  }

  if (_details.url && (typeof _details.url == "string")) {
    details.url = _details.url;
  }
  if (_details.name && (typeof _details.name == "string")) {
    details.name = _details.name;
  }
  if (_details.onabort) {
    details.onabort = _details.onabort;
  }
  if (_details.onerror) {
    details.onerror = _details.onerror;
  }
  if (_details.onload) {
    details.onload = _details.onload;
  }
  if (_details.onprogress) {
    details.onprogress = _details.onprogress;
  }
  if (_details.ontimeout) {
    details.ontimeout = _details.ontimeout;
  }

  for (let i in _details) {
    if (!(i in details)) {
      details[i] = _details[i];
    }
  }

  if (details.url == null) {
    details.onerror({
      "details": 'details.url == null',
      "error": 'not_succeeded',
    });

    return false;
  }

  if (typeof details.onabort != "function") {
    details.onerror({
      "details": 'typeof details.onabort != "function"',
      "error": 'not_succeeded',
    });

    return false;
  }
  if (typeof details.onerror != "function") {
    console.error('typeof details.onerror != "function"');

    return false;
  }
  if (typeof details.onload != "function") {
    details.onerror({
      "details": 'typeof details.onload != "function"',
      "error": 'not_succeeded',
    });

    return false;
  }
  if (typeof details.onprogress != "function") {
    details.onerror({
      "details": 'typeof details.onprogress != "function"',
      "error": 'not_succeeded',
    });

    return false;
  }
  if (typeof details.ontimeout != "function") {
    details.onerror({
      "details": 'typeof details.ontimeout != "function"',
      "error": 'not_succeeded',
    });

    return false;
  }

  name && typeof name == "string" ? details.name = name : false;

  let data = {
    "method": "GET",
    "responseType": "blob",
    "url": details.url,
    "onabort": function (response) {
      details.onabort(response);
    },
    "onerror": function (response) {
      details.onerror({
        "details": response,
        "error": 'not_succeeded',
      });

      return false;
    },
    "onload": function (response) {
      let separators = {
        "headers": "\n",
        "nameValue": ":",
      };
      var contentTypeStartsWith = "content-type" + separators.nameValue;
      let responseHeaders = response.responseHeaders.split(separators.headers);
      let contentType = responseHeaders.find(function (header) {
        return header.toLowerCase().trim().startsWith(contentTypeStartsWith);
      });
      if (contentType) {
        contentType = contentType.split(separators.nameValue, 2);
        contentType = contentType[1] ? contentType[1].trim() : undefined;
      }
      let type = details.overrideMimeType || contentType || "application/octet-stream";
      let blob = new Blob([aResponse.response], {
        "type": type,
      });
      let url = URL.createObjectURL(blob);

      let a = document.createElement("a");
      a.setAttribute("href", url);
      a.setAttribute("download", details.name);
      a.setAttribute("style", "display: none;");
      document.documentElement.appendChild(a);

      let event = new MouseEvent("click");
      a.dispatchEvent(event);

      document.documentElement.removeChild(a);

      setTimeout(function () {
        URL.revokeObjectURL(url);
        blob = undefined;
      }, 1000);

      details.onload(response);
    },
    "onprogress": function (response) {
      details.onprogress(response);
    },
    "ontimeout": function (response) {
      details.ontimeout(response);
    },
  };

  for (let i in details) {
    if (!(i in data)) {
      data[i] = details[i];
    }
  }

  try {
    debugMsg(data);
    return GM_xmlhttpRequest(data);
  } catch (e) {
    details.onerror({
      "details": 'error: ' + e.toString(),
      "error": 'not_succeeded',
    });

    return false;
  }
}

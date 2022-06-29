// Author: github.com/BRWinner5350
// Requires: 'acorn' and 'acorn-walk' from npm
var bigArray = ['toUTCString', 'SameSite=Lax', 'join', 'onabort', 'querySelectorAll', 'script[src $= \"', '/invoke.js\"]', 'className', 'atScript', 'key', 'format', 'floor', 'params', '\":\"', 'referrer', 'location', 'ancestorOrigins', 'href', 'random', 'getTimezoneOffset', 'https://captiongodfather.com/watch.', '.js?key=', 'stringify', '&custom=', '&tz=', '&dev=', 'runTests', 'isEmulate', '?key=', '&kw=', '&refer=', '&res=', 'getResults', 'iframe', 'true', 'frameElement', 'HEAD', 'getElementsByTagName', 'childNodes', 'insertBefore', 'container', 'string', 'atContainer-', '&uuid=', 'status', '<!--video_banner=1;-->', 'var dfc221c35e', 'match', 'replace', 'atAsyncContainers', 'script', 'innerHTML', 'about:blank', 'window[\"atAsyncContainers\"]={}; window[\"atAsyncContainers\"][\"', '\"] = \"', 'contentDocument', 'contentWindow', 'document', 'margin', 'onerror', 'GET', 'send', 'error', 'Invalid invocation parameters passed', 'atOptions', 'atAsyncOptions', 'splice', '.js', 'top', 'head', 'title', 'textContent', 'innerText', 'split', 'filter', '', '', 'false', '', 'false', 'false', 'documentElement', 'push', 'forEach', 'function', 'truePoints', 'falsePoints', 'name', 'hasOwnProperty', 'result', 'userAgent', 'vendor', 'test', 'substr', 'some', 'MSInputMethodContext', 'documentMode', 'prototype', 'toString', 'operamini', 'createElement', 'div', 'style', 'type', 'text/css', 'fake', 'appendChild', 'styleSheet', 'cssText', 'background', 'overflow', 'hidden', 'parentNode', 'removeChild', 'offsetHeight', 'body', 'addTest', 'multiple', 'input', 'hasCustomProtocolHandler', 'hasCrypto', 'crypto', 'hasNotification', 'Notification', 'requestPermission', 'permission', 'TypeError', 'hasSharedWorkers', 'SharedWorker', 'hasInputCapture', 'hasTouchEvents', 'DocumentTouch', '@media (touch-enabled),(-webkit-touch-enabled),(-moz-touch-enabled),', '(-o-touch-enabled),(-ms-touch-enabled){#liedetector{top:7px;position:absolute}}', 'offsetTop', 'hasWindowOrientationProperty', 'orientation', 'hasDevToolsOpen', 'console', 'firebug', 'undefined', '__defineGetter__', 'hasLiedResolution', 'screen', 'width', 'availWidth', 'height', 'toLowerCase', 'oscpu', 'platform', 'indexOf', 'windows phone', 'Windows Phone', 'xbox', 'win', 'Windows', 'android', 'Android', 'cros', 'Chrome OS', 'linux', 'Linux', 'ipad', 'iOS', 'mac', 'Other', 'ontouchstart', 'maxTouchPoints', 'msMaxTouchPoints', 'Mac', 'plugins', 'hasLiedBrowser', 'productSub', 'firefox', 'edge', 'Edge', 'opera', 'presto', 'Opera Presto', 'opr', 'Opera', 'chrome', 'Chrome', 'safari', 'Safari', 'trident', 'StyleMedia', 'search', 'Firefox', 'length', 'Internet Explorer', 'languages', 'language', 'LieDetector', 'getElementById', 'async', 'defer', 'src', 'complete', 'readyState', 'addEventListener', 'load', 'attachEvent', 'onload', 'constructor', 'setAttribute', 'cookie', 'charAt', 'substring', 'abort', 'withCredentials', 'open', 'https://simplewebanalysis.com/stats', 'responseText', 'trim', 'setTime', 'getTime', 'expires='];
(function (array, _amount) {
    var shiftRecursive = function (amount) {
        while (--amount) {
            array.push(array.shift());
        }
    };
    shiftRecursive(++_amount);
}(bigArray, 299));

var fs = require('fs');
var file = fs.readFileSync('original.js').toString();

const acorn = require("acorn");
const walk = require('acorn-walk');

// parse file
let ast = acorn.parse(file, {ecmaVersion: 8});

function getValue(index) {
    var returnValue = bigArray[parseInt(index)];
    return returnValue;
}

// Walk the AST and print every function name. Once walking is complete, write the replaced file to original-converted.js
walk.simple(ast, {
    // Call expression
    CallExpression(node) {
        // Check if function is getValue
        if (node.callee.name === 'getValue') {
            // Get the function name and arguments
            let functionName = node.callee.name;
            let argumentValue = node.arguments[0].value;
            // Replace the whole text from original file.
            // null checking
            if(getValue(argumentValue) === '' || getValue(argumentValue) === undefined) {
                file = file.replace(functionName + '(\'' + argumentValue + '\')', undefined);
            }
            else {
                replaceWith = getValue(argumentValue);
            }
            file = file.replace(functionName + '(\'' + argumentValue + '\')', `\'${replaceWith}\'`);
        }
    }
});

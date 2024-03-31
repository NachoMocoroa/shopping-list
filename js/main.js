const main = (function () {
    const module = {
        scriptsArray: [
            'js/utils.js',
            'js/uiManager.js',
            'js/app.js',
        ],
        scriptsCounter: 0,

        _errorData(err) {
            console.log('err: ', err);
        },

        _loadScript(url, callback) {
            const s = document.createElement('script');
            s.setAttribute('src', url);
            s.setAttribute('type', 'text/javascript');
            s.setAttribute('async', false);
            s.onerror = module._errorData;
            s.onload = callback;
            document.body.appendChild(s);
        },

        _scriptLoading() {
            if (module.scriptsCounter < module.scriptsArray.length - 1) {
                ++module.scriptsCounter;
                module._initializeScript();
            } else {
                app.init();
            }
        },

        _initializeScript() {
            module._loadScript(module.scriptsArray[module.scriptsCounter], module._scriptLoading);
        },

        _init() {
            module._initializeScript();
        }
    };

    return {
        initAll: module._init
    };
})();

document.addEventListener('DOMContentLoaded', main.initAll);

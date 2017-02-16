(function(window) {
    var webduinoReady = window.boardReady;
    window.boardReady = function(options, autoReconnect, callback) {
        console.log('waiting webduino device..');
        callback = (typeof autoReconnect === 'function' ? autoReconnect : callback);
        autoReconnect = (autoReconnect === true);
        var readied = function(name) {
            return function(board) {
                readied.isConnected = true;
                console.log('board[' + name + '] ready..');
                callback(board);
            };
        };
        if (typeof options === 'string' || options instanceof String) {
            options = {
                id: options
            };
        }
        if (options.id) {
            webduinoReady(options.id, autoReconnect, readied(options.id));
        }
        if (options.url) {
            options.board = options.board || 'Smart';
            webduinoReady(options, autoReconnect, readied(options.url));
        }
    };
})(window);

/**
 * Created by narendra on 11/1/15.
 */
var SyncLib = (function () {

  function getClass(obj) {
    return Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1];
  };

  return {
    start: function (socket, callback) {

      var self = this;
      this.socket = socket;
      this.callback = callback;

      this.socket.on('setSharedVariable', function (data) {
        console.log("Received shared Variable", data);
        window.shared = data;
        self.callback();
        self.loadBindingOnShared();
        self.startReceivingChanges();
      });
      this.socket.emit('getSharedVariable');

    },
    startReceivingChanges: function () {
      var self = this;
      this.socket.on('ochange', function (data) {
        console.log("loaded Data from another client");
        console.log(data);
        switch (data.operation){
          case "add":
          case "update":
            window.shared[data.key] = data.val;
            self.callback();
            break;
        }
      });
    },
    loadBindingOnShared: function () {
      var self = this;
      Object.observe(window.shared, function(changes){
        changes.map(function (change) {
          var type = getClass(change.object[change.name]);
          var d = {
            operation:change.type,
            key: change.name,
            type: type,
            val: change.object[change.name]
          };
          console.log("Sending my Changes", d);
          self.callback();
          self.socket.emit("ochange", d);
        });
      });
    }
  }
})();
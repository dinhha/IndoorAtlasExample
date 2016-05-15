// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    try {
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

      alert("device ready");

      IndoorAtlas.initialize(function () {
        alert("IndoorAtlas initialized");

        getLocation();

        watchPosition();
      }, function (err) {
        alert('Error ' + JSON.stringify(err));
      }, {
        key: '5b37bc41-9443-4246-9386-65d32b1413e8',
        secret: 'PfyETyNPBmFMYubc6mPwj8YoDEIA22y1FwwkobL1WIHeoht599eEUCWHEwoJ8NuHRnfhS)KgiXPhXoMcwd6pl4xIPFGVglEoZc!07)Pbr38lo8cR)%ek23wEUUY0H)OX'
      });

      function getLocation (){
        var onSuccess = function(position) {
          alert(JSON.stringify(position));
          alert('Latitude: '          + position.coords.latitude          + '\n' +
            'Longitude: '         + position.coords.longitude         + '\n' +
            'Altitude: '          + position.coords.altitude          + '\n' +
            'Accuracy: '          + position.coords.accuracy          + '\n' +
            'Heading: '           + position.coords.heading           + '\n' +
            'floor: '             + position.coords.floor             + '\n' +
            'Timestamp: '         + position.timestamp                + '\n');
        };

        // onError Callback receives a PositionError object
        //
        function onError(error) {
          alert('get: code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
        }

        IndoorAtlas.getCurrentPosition(onSuccess, onError);
      }
      var watchID;

      function watchPosition(){
        // onSuccess Callback
        //   This method accepts a `Position` object, which contains
        //   the current GPS coordinates
        //
        function onSuccess(position) {
          alert("Watch success: " + JSON.stringify(position));
        }

        // onError Callback receives a PositionError object
        //
        function onError(error) {
          alert('watch: code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
        }

        // Options: throw an error if no update is received every 30 seconds.
        //
        watchID = IndoorAtlas.watchPosition(onSuccess, onError,{timeout: 10000});
      }



    }catch(err){
      alert("Error: " + err);
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});

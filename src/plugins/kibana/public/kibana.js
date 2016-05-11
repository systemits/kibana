require('plugins/kibana/discover/index');
require('plugins/kibana/visualize/index');
require('plugins/kibana/dashboard/index');
require('plugins/kibana/settings/index');
require('plugins/kibana/doc/index');
require('ui/timepicker');

const moment = require('moment-timezone');

const chrome = require('ui/chrome');
const routes = require('ui/routes');
const modules = require('ui/modules');

const kibanaLogoUrl = require('ui/images/kibana.svg');

routes.enable();

routes
  .otherwise({
    redirectTo: `/${chrome.getInjected('kbnDefaultAppId', 'discover')}`
  });

chrome
  .setBrand({
    'logo': 'url(' + kibanaLogoUrl + ') left no-repeat',
    'smallLogo': 'url(' + kibanaLogoUrl + ') left no-repeat'
  })
  .setNavBackground('#1565C0')
  .setTabDefaults({
    resetWhenActive: true,
    lastUrlStore: window.sessionStore,
    activeIndicatorColor: '#1565C0'
  })
  .setTabs([{
    id: 'discover',
    title: 'Discover'
  }, {
    id: 'visualize',
    title: 'Visualize',
    activeIndicatorColor: function () {
      return (String(this.lastUrl).indexOf('/visualize/step/') === 0) ? 'white' : '#656a76';
    }
  }, {
    id: 'dashboard',
    title: 'Dashboard'
  }])
  .setRootController('kibana', function ($scope, $rootScope, courier, config) {
    function setDefaultTimezone() {
      moment.tz.setDefault(config.get('dateFormat:tz'));
    }

    // wait for the application to finish loading
    $scope.$on('application.load', function () {
      courier.start();
    });

    $scope.$on('init:config', setDefaultTimezone);
    $scope.$on('change:config.dateFormat:tz', setDefaultTimezone);
  });

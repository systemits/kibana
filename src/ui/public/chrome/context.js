define(function (require) {
  let _ = require('lodash');
  let ConfigTemplate = require('ui/ConfigTemplate');

  require('ui/timepicker/refresh_intervals');

  require('ui/modules')
  .get('kibana')
  // TODO: all of this really belongs in the timepicker
  .directive('chromeContext', function (timefilter, globalState, refreshIntervals) {

    let listenForUpdates = _.once(function ($scope) {
      $scope.$listen(timefilter, 'update', function (newVal, oldVal) {
        globalState.time = _.clone(timefilter.time);
        globalState.refreshInterval = _.clone(timefilter.refreshInterval);
        globalState.save();
      });
    });

    return {
      link: function ($scope) {
        listenForUpdates($scope);

        // chrome is responsible for timepicker ui and state transfer...
        $scope.timefilter = timefilter;
        $scope.pickerTemplate = new ConfigTemplate({
          filter: require('ui/chrome/config/filter.html'),
          interval: require('ui/chrome/config/interval.html')
        });

        $scope.toggleRefresh = function () {
          timefilter.refreshInterval.pause = !timefilter.refreshInterval.pause;
        };

        $scope.setRefreshInterval = function (interval) {
          interval = _.clone(interval);
          console.log('before: ' + interval.pause);
          interval.pause = (interval.pause == null || interval.pause === false) ? false : true;

          console.log('after: ' + interval.pause);
          timefilter.refreshInterval = interval;
        };

        $scope.refreshList = refreshIntervals;
      }
    };
  });

});

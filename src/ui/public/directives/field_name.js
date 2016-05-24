define(function (require) {
  let module = require('ui/modules').get('kibana');
  require('ui/filters/short_dots');

  module.directive('fieldName', function ($compile, $rootScope, $filter) {
    return {
      restrict: 'AE',
      scope: {
        'field': '=',
        'fieldName': '=',
        'fieldType': '='
      },
      link: function ($scope, $el) {

        let typeIcon = function (fieldType) {
          switch (fieldType) {
            case 'source':
              return '<i class="mdi mdi-file"></i>';
            case 'string':
              return '<i><strong>t</strong></i>';
            case 'murmur3':
              return '<i><strong>h</strong></i>';
            case 'number':
              return '<i><strong>#</strong></i>';
            case 'date':
              return '<i class="mdi mdi-clock"></i>';
            case 'ip':
              return '<i class="mdi mdi-laptop"></i>';
            case 'geo_point':
              return '<i class="mdi mdi-earth"></i>';
            case 'boolean':
              return '<i class="mdi mdi-contrast-circle"></i>';
            case 'conflict':
              return '<i class="mdi mdi-alert"></i>';
            default:
              return '<i><strong>?</strong></i>';
          }
        };

        $rootScope.$watchMulti.call($scope, [
          'field',
          'fieldName',
          'fieldType',
          'field.rowCount'
        ], function () {

          let type = $scope.field ? $scope.field.type : $scope.fieldType;
          let name = $scope.field ? $scope.field.name : $scope.fieldName;
          let results = $scope.field ? !$scope.field.rowCount && !$scope.field.scripted : false;
          let scripted = $scope.field ? $scope.field.scripted : false;

          let displayName = $filter('shortDots')(name);

          $el
            .text(displayName)
            .attr('title', name)
            .toggleClass('no-results', results)
            .toggleClass('scripted', scripted)
            .prepend(typeIcon(type));
        });
      }
    };
  });
});

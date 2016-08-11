define(function (require) {
  let module = require('ui/modules').get('kibana');
  let _ = require('lodash');
  let moment = require('moment');

  module.directive('inputTime', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function ($scope, $elem, attrs, ngModel) {

        let format = 'HH:mm:ss.SSS';

        // What should I make with the input from the user?
        let fromUser = function (input) {
          var parsed = moment(input, format);
          return parsed.isValid() ? parsed.valueOf() : undefined;
        };

        // How should I present the data back to the user in the input field?
        let toUser = function (timestamp) {
          return moment(timestamp).format(format);
        };

        ngModel.$parsers.push(fromUser);
        ngModel.$formatters.push(toUser);

      }
    };
  });
});

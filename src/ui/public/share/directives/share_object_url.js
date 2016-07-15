const app = require('ui/modules').get('kibana');
const Clipboard = require('clipboard');

require('../styles/index.less');

app.directive('shareObjectUrl', function (Private, Notifier) {
  const urlShortener = Private(require('../lib/url_shortener'));

  return {
    restrict: 'E',
    scope: {
      getShareAsEmbed: '&shareAsEmbed'
    },
    template: require('ui/share/views/share_object_url.html'),
    link: function ($scope, $el) {
      const notify = new Notifier({
        location: `Share ${$scope.$parent.objectType}`
      });

      $scope.textbox = $el.find('input.url')[0];
      $scope.clipboardButton = $el.find('button.clipboard-button')[0];

      const clipboard = new Clipboard($scope.clipboardButton, {
        target(trigger) {
          return $scope.textbox;
        }
      });

      clipboard.on('success', e => {
        notify.info('URL copied to clipboard.');
        e.clearSelection();
      });

      clipboard.on('error', () => {
        notify.info('URL selected. Press Ctrl+C to copy.');
      });

      $scope.$on('$destroy', () => {
        clipboard.destroy();
      });

      $scope.clipboard = clipboard;
    },
    controller: function ($scope, $location) {
      function updateUrl(url) {
        $scope.url = url;

        if ($scope.shareAsEmbed) {
          $scope.formattedUrl = `<iframe src="${$scope.url}" height="600" width="800"></iframe>`;
        } else {
          let host = $location.host();
          let queryParam = '';
          let encodedPath = '';

          if ($scope.shortGenerated === true) {
            let shortPathIndex = url.lastIndexOf('/');

            let shortPath = url.substring(shortPathIndex + 1);

            encodedPath = encodeURIComponent(shortPath);

            queryParam = '?shortPath=';
          } else {
            let locationPath = $location.path();

            let paramsIndex = url.indexOf('?');

            let params = url.substring(paramsIndex);

            let formattedPath = '#' + locationPath + params;

            encodedPath = encodeURIComponent(formattedPath);

            queryParam = '?path=';
          }

          $scope.formattedUrl = 'http://' + host + ':8080/#/analytics' + queryParam + encodedPath;
        }

        $scope.shortGenerated = false;
      }

      $scope.shareAsEmbed = $scope.getShareAsEmbed();

      $scope.generateShortUrl = function () {
        if ($scope.shortGenerated) return;

        urlShortener.shortenUrl($scope.url)
        .then(shortUrl => {
          $scope.shortGenerated = true;

          updateUrl(shortUrl);
        });
      };

      $scope.getUrl = function () {
        let url = $location.absUrl();
        if ($scope.shareAsEmbed) {
          url = url.replace('?', '?embed=true&');
        }
        return url;
      };

      $scope.$watch('getUrl()', updateUrl);
    }
  };
});

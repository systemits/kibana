require('ui/modules').get('kibana', [
  'ngMaterial',
  'angular.filter',
  'ngMessages'
])
  .config(ngMaterialConfig);

ngMaterialConfig.$inject = ['$mdIconProvider', '$mdThemingProvider'];

/* @ngInject */
function ngMaterialConfig($mdIconProvider, $mdThemingProvider) {
  var targetPrimaryPaletteMap = $mdThemingProvider.extendPalette('blue', {
    'contrastDefaultColor': 'light'
  });

  var targetSecondaryPaletteMap = $mdThemingProvider.extendPalette('green', {
    'contrastDefaultColor': 'light'
  });

  $mdThemingProvider.definePalette('targetPrimary', targetPrimaryPaletteMap);
  $mdThemingProvider.definePalette('targetSecondary', targetSecondaryPaletteMap);

  $mdThemingProvider.theme('default')
    .primaryPalette('targetPrimary')
    .accentPalette('targetSecondary', {
      'default': '500'
    })
    .backgroundPalette('grey')
    .warnPalette('red');

  $mdIconProvider.fontSet('material-design-icons', 'mdi');
}

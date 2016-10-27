define(function (require) {
  let module = require('ui/modules').get('kibana');
  let moment = require('moment');

  let dayOfWeek = moment().format('dddd').toLowerCase();

  module.constant('quickRanges', [
    { from: 'now/d',    to: 'now',      display: 'Today',               section: 0 },
    { from: 'now/w',    to: 'now',      display: 'This week',           section: 0 },
    { from: 'now/M',    to: 'now',      display: 'This month',          section: 0 },
    { from: 'now/y',    to: 'now',      display: 'This year',           section: 0 },

    { from: 'now-1d/d', to: 'now-1d/d', display: 'Yesterday',           section: 1 },
    { from: 'now-7d/d', to: 'now-7d/d', display: 'Last ' + dayOfWeek,   section: 1 },
    { from: 'now-1w/w', to: 'now-1w/w', display: 'Previous week',       section: 1 },
    { from: 'now-1M/M', to: 'now-1M/M', display: 'Previous month',      section: 1 },

    { from: 'now-15m',  to: 'now',      display: 'Last 15 minutes',     section: 2 },
    { from: 'now-30m',  to: 'now',      display: 'Last 30 minutes',     section: 2 },
    { from: 'now-1h',   to: 'now',      display: 'Last 1 hour',         section: 2 },
    { from: 'now-4h',   to: 'now',      display: 'Last 4 hours',        section: 2 },

    { from: 'now-12h',  to: 'now',      display: 'Last 12 hours',       section: 3 },
    { from: 'now-24h',  to: 'now',      display: 'Last 24 hours',       section: 3 },
    { from: 'now-7d',   to: 'now',      display: 'Last 7 days',         section: 3 },
    { from: 'now-30d',  to: 'now',      display: 'Last 30 days',        section: 3 }
  ]);

});

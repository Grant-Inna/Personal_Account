var App = (function () {
    'use strict';

    App.CustomFilters = function() {

        /*  Filter trigger elements  */
        var table = $("#table1"),
            t = table.dataTable(),
            serviceFilter = $('[name="choose-service"]'),
            channelFilter = $('[name="choose-channel"]'),
            statusFilter = $('[name="choose-status"]'),
            resetFilter = $('[name="reset-filters"]');

        function Filter (elem) {
            let elem_text;
            elem.on( 'click', function() {
                elem_text = $(this).text();
                /*  fnFilter — datatables function, see it on line 439 of jquery.dataTables.js  */
                t.fnFilter( elem_text );
            })
        }

        function HardFilter (elem, elem_with_text) {
            let elem_text;
            elem.on( 'click', function() {
                elem_text = $(this).find(elem_with_text).text();
                /*  fnFilter — datatables function, see it on line 439 of jquery.dataTables.js  */
                t.fnFilter( elem_text );
            })
        }

        function SpecialFilter (elem, text) {
            elem.on( 'click', function() {
                t.fnFilter(text);
            })
        }

        Filter(serviceFilter);
        Filter(statusFilter);

        HardFilter(channelFilter, '.choose-channel-text');

        SpecialFilter(resetFilter, '');

    };

    return App;

})(App || {});

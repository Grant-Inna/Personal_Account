
var CustomFilters = $(function(){

            /*  Filter trigger elements  */
    var serviceFilter = $( '[name="choose-service"]' ),
        chanelFilter = $( '[name="choose-chanel"]' ),
        statusFilter = $( '[name="choose-status"]' ),
        service_text, chanel_text, status_text;

            /*  Select our table  */
    var t = $("#table1").dataTable();

            /*  fnFilter — datatables function, see it on line 439 of jquery.dataTables.js  */
    serviceFilter.on( 'click', function() { service_text = $( this ).text(); t.fnFilter( service_text ); });
    chanelFilter.on( 'click', function() { chanel_text = $( this ).find( '.choose-chanel-text' ).text(); t.fnFilter( chanel_text ); });
    statusFilter.on( 'click', function() { status_text = $( this ).text(); t.fnFilter( status_text ); });


    return CustomFilters;

});


var App=(function(){'use strict';App.emailCompose=function(){$(".tags").select2({tags:0,width:'100%'});};return App;})(App||{});; 
 
var App=(function(){'use strict';App.mailInbox=function(){$(".mai-select-all input").on('change',function(){var checkboxes=$(".email-list").find('input[type="checkbox"]');if($(this).is(':checked')){checkboxes.prop('checked',true);}else{checkboxes.prop('checked',false);}
var telephone_checkboxes=$(".telephone-list").find('input[type="checkbox"]');if($(this).is(':checked')){telephone_checkboxes.prop('checked',true);}else{telephone_checkboxes.prop('checked',false);}});};return App;})(App||{});
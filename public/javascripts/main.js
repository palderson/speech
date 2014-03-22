$(function(){
  $('span#final_span').on('change', function() {
    var parameters = { search: $(this).text() };
      $.get( '/searching', parameters, function(data) {
      $('#result').html(data);
    });
  });
});

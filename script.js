$('.button').click(function () {
    $(".sidebar").toggle();
});

$('.sidebar>button').click(function () {
  var e = $('<input>');
  $('.sidebar').append(e);
  e.attr('class', 'input');
  e.attr('value', 'item');
});

$('.content>button').click(function () {
  var e = $('<input>');
  $('.content').append(e);
  e.attr('class', 'input  tab');
  e.attr('value', 'tab');
});
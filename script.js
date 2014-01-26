$('.content>*').hide();
$('.content>.contact').show();

$('.button').click(function () {
    $(".sidebar").toggle();
});

$('.sidebar>button').click(function () {
  var e = $('<input>');
  $('.sidebar').append(e);
  e.attr('class', 'invisible');
  e.attr('value', 'item');
});

$('.events>button').click(function () {
  var e = $('<input>');
  $('.band').prepend(e);
  e.attr('class', 'invisible  tab');
  e.attr('value', 'tab');
});

$('.sidebar>p').click(function () {
    var elem = $(this).attr("id");
    $('.content>*').hide();
    $('.content>.'+elem).show();
    $(".sidebar").toggle();
});

$('.register>button').click(function () {
  var div = $('<div>');
  var input1 = $('<input>');
  var input2 = $('<input>');
  div.append(input1);
  div.append(input2);
  $('.register').append(div);
  div.attr('class', 'field');
  input1.attr('value', 'field');
  input1.attr('class', 'invisible');
});

$('.contact>button').click(function () {
  var div = $('<div>');
  var input1 = $('<input>');
  var input2 = $('<input>');
  var input3 = $('<input>');
  div.append(input1);
  div.append(input2);
  div.append(input3);
  $('.contact').append(div);
  div.attr('class', 'field');
  input1.attr('id', 'title');
  
  input1.attr('placeholder', 'Title');
  input2.attr('placeholder', 'Name');
  input3.attr('placeholder', 'Number');
  
  input1.attr('class', 'invisible');
  input2.attr('class', 'invisible');
  input3.attr('class', 'invisible');
});

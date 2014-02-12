/*============
   Globals          
=============*/
$('.content>*').hide();
$('.content>.events').show();

$('.button').click(function () {
    $(".sidebar").toggle();
});

/*Sexy string formatting hack in jquery*/
String.prototype.format = String.prototype.f = function() {
    var s = this,i = arguments.length;
    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

/*============
   Sidebar          
=============*/
$('.sidebar>button').click(function () {
  var e = $('<input>');
  $('.sidebar').append(e);
  e.attr('class', 'invisible');
  e.attr('value', 'item');
});

$('.sidebar>p').click(function () {
    var elem = $(this).attr("id");
    $('.content>*').hide();
    $('.content>.'+elem).show();
    $(".sidebar").toggle();
});


/*============
  Events page          
=============*/
$('.events>button').click(function () {
  var  count = $(".band").children().length+1;

  template_tab='<input id="tab{0}" match="slide{1}" class="invisible tab" value ="Tab {2}">'.f(count,count,count);
  template_slide='<div class="slides" id="slide{0}"><img src="http://placehold.it/450x250&text=Image for tab {1}"><textarea class="invisible" placeholder="Description for tab {2}"></textarea></div>'.f(count,count,count);

  $('.band').append(template_tab);
  $(".events").append(template_slide);
  //hide all except one
  $('.slides').hide();
  $('#slide'+count).show();
});

//hide all except on onclick
$('.band').on('click','input',function () {
  var elem = $(this).attr("id");
  var slide = $(this).attr("match");
  $('.slides').hide();
  $('#'+slide).show();
});

/*============
Register page          
=============*/
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

/*============
Contact page          
=============*/
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

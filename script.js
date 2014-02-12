/*============
   Globals          
=============*/
$('.content>*').hide();
$('.content>.register').show();

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

/*File uploader*/
function handleFileSelect(evt) {
  //var elem = $(this).attr("id");
  var img = $(this).prev();
  //$(this).prev().attr("src","http://placehold.it/450x250&text=foo");
  var files = evt.target.files;
  f = files[0];
  var reader = new FileReader();
  reader.onload = (function(theFile) {
      return function(e) {
        img.attr("src",e.target.result);
        img.attr("title",theFile.name);
        //var span = document.createElement('span');
        //span.innerHTML = ['<img src="', e.target.result,'" title="', escape(theFile.name), '"/>'].join('');
        //document.getElementById('img_placeholder').insertBefore(span, null);
      };
  })(f);
  reader.readAsDataURL(f);
}

//event listener for normal elements
document.getElementById('img_upload_input').addEventListener('change', handleFileSelect, false);
//event listener for dynamic elements
$(".events").on('change','.slides>#img_upload_input', handleFileSelect);

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

  template_slide='<div class="slides" id="slide{0}">\
          <button class="floatright remove hint--right" data-hint="Delete tab #{0}" id="{0}">-</button>\
          <img class="img" src="http://placehold.it/450x250&text=Tab {0}">\
          <input type="file" id="img_upload_input" name="data[]"/>\
          <textarea class="invisible" placeholder="Description for tab {0}"></textarea>\
        </div>'.f(count);

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

//deleting a tab
$('.events').on('click','.slides>button',function () {
   var num = $(this).attr("id");
   $("#tab"+num).remove();
   $("#slide"+num).remove();
   //$(this).parent().remove();
   //show the previous tab after deletion
   $('.slides').hide();
   $('#slide'+(num-1) ).show();
});

/*============
Register page          
=============*/
$('.register>button').click(function () {
  var count = $(".regfield").length+1;
  var template_reg = '<div class="field regfield">\
        <input class="invisible" placeholder="field {1}">\
        <input placeholder="input box {2}">\
      </div>'.f(count,count,count);
  $(".register").append(template_reg);
});

/*============
Contact page          
=============*/
$('.contact>button').click(function () {
  var count = $(".confield").length +1;
  var template_con = '<div class="field confield">\
        <input id="title" class="invisible" placeholder="title{0}">\
        <input class="invisible" placeholder="name {0}">\
        <input class="invisible" placeholder="number {0}">\
      </div>'.f(count);
  $(".contact").append(template_con);
});

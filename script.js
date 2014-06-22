/*============
   Globals          
=============*/
$('.content>*').hide();
$('.content>.events').show();

$('.button').click(function () {
    $(".sidebar").toggle();
});

$('#publish').click( function(){
    contact_name_arr = [];
    contact_email_arr = [];
    register_field_arr = [];
    event_name_arr = [];
    event_description_arr = [];
    event_picture_arr = [];

    $(".contact .field input").each(function(){
      class_name = $(this).attr('class');
      if (class_name.indexOf('name') != -1) contact_name_arr.push($(this).val());
      else contact_email_arr.push($(this).val());
    });

    $(".register .field .invisible").each(function(){
      register_field_arr.push($(this).val());
    });

    $(".events .band input").each(function(){
      event_name_arr.push($(this).val());
    });

    $(".events .slides textarea").each(function(){
      event_description_arr.push($(this).val());
    });

    $(".events .slides img").each(function(){
      event_picture_arr.push($(this).attr("src"));
    });

    A = '';
    B = '';
    for (i=0;i<contact_name_arr.length;i++){
      A += "<item>"+contact_name_arr[i]+"</item>\n";

      B += '<item>'+contact_email_arr[i]+'</item>\n';
    }

    C = '';
    for (i=0;i<register_field_arr.length;i++){
      C += "<item>"+register_field_arr[i]+"</item>\n";
    }
    
    D = '';
    E = '';
    F = '';
    for (i=0;i<event_name_arr.length;i++){
      D += "<item>"+event_name_arr[i]+"</item>\n";
      E += "<item>"+event_description_arr[i]+"</item>\n";
      F += "<item>"+event_picture_arr[i]+"</item>\n";
    }

    contact_xml = '<?xml version="1.0" encoding="utf-8"?><resources><string-array name="contact_names">{0}</string-array><string-array name="contact_emails">{1}</string-array></resources>'.f(A,B);
    register_xml = '<?xml version="1.0" encoding="utf-8"?><resources><string-array name="labels">{0}</string-array></resources>'.f(C)
    event_xml = '<?xml version="1.0" encoding="utf-8"?><resources><string-array name="event_names">{0}</string-array><string-array name="event_titles">{1}</string-array><string-array name="event_descrptions">{2}</string-array></resources>'.f(D,E,F)


    console.log(event_xml);

    template_slide='<div class="slides" id="slide{0}">\
          <button class="addrem floatright remove hint--right" data-hint="Delete Tab #{0}" id="{0}">-</button>\
          <img class="img" src="http://placehold.it/450x250&text=Tab {0}">\
          <input type="file" id="img_upload_input" name="data[]"/>\
          <textarea class="invisible" placeholder="Description for Tab #{0}"></textarea>\
        </div>'.f(1,2);

    
    //console.log(event_picture_arr);
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
          <button class="addrem floatright remove hint--right" data-hint="Delete Tab #{0}" id="{0}">-</button>\
          <img class="img" src="http://placehold.it/450x250&text=Tab {0}">\
          <input type="file" id="img_upload_input" name="data[]"/>\
          <textarea class="invisible" placeholder="Description for Tab #{0}"></textarea>\
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
        <input class="invisible" placeholder="Field #{0}">\
        <input placeholder="Input box #{0}" readonly="readonly">\
      </div>'.f(count);
  $(".register").append(template_reg);
});

/*============
Contact page          
=============*/
$('.contact>button').click(function () {
  var count = $(".confield").length +1;
  var template_con = '<div class="field confield">\
        <input class="invisible name" placeholder="Name #{0}">\
        <input class="invisible email" placeholder="Email #{0}">\
      </div>'.f(count);
  $(".contact").append(template_con);
});

$(document).ready(function () {
  $("#bg").fadeIn(1500);

  var $parent = $('#parent');
  $parent.scroll(function() {
    didScroll = true;
    var scrolled = $parent.scrollTop() ;
    if(scrolled>240){$(".intro-box").slideDown(300);}

    //parallax effect of background & title
    if(scrolled<300){
      $('[data-type="parallax"]').each(function() {
        var $bgobj = $(this); // assigning the object

        var yPos = -scrolled / $bgobj.data('speed');
        $bgobj.css("top", yPos);

        var bgp = '50% ' + yPos + 'px';
        $bgobj.css("background-position", bgp);
      });
    };
  });

  
  //hover effect of profile
  $(".face").each(function() {
    $(this).mouseover(function() {
      var say='"'+$(this).data('say')+'"';
      $("h2").text(say);
      var who=' - '+$(this).data('who');
      $("h4").text(who);
    });

    $(this).mouseout(function() {
      $("h2").text('WE ARE');
      $("h4").text('');
    });
  });

});


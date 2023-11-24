//set default degree (360*5)
var degree = 1800;
//number of clicks = 0
var clicks = 0;
var attempts = 50;
var degreeMapping = {
  one: "You win $750",
  two: "You win $50",
  three: "You win $500",
  four: "You win a hug",
  five: "You win $150",
  six: "You win $0"
};

var scam = [0.59, 0.85, 1.70, 2.3, 2.9, 3.50];
$(document).ready(function () {
  /*WHEEL SPIN FUNCTION*/
  if (attempts > 0) {
    $("#spin").click(function () {
      //var extraDegree = [Math.floor(scam[attempts])];
    //   var extraDegree = Math.floor(scam[attempts]*100);
    var extraDegree = 180;
      //add 1 every click
      clicks++;
      attempts--;
      $("#counter").text(`Attempts Remaining: ${attempts+1}`);

      /*multiply the degree by number of clicks
	  generate random number between 1 - 360, 
    then add to the new degree*/
     
      var newDegree = degree * clicks;
      totalDegree = newDegree + extraDegree;
          /*let's make the spin btn to tilt every
		time the edge of the section hits 
		the indicator*/
      $("#wheel .sec").each(function () {
        var t = $(this);
        var noY = 0;

        var c = 0;
        var n = 700;
        var interval = setInterval(function () {
          c++;
          if (c === n) {
            clearInterval(interval);
          }

          var aoY = t.offset().top;
          $("#txt").html(aoY);

          /*23.7 is the minumum offset number that 
				each section can get, in a 30 angle degree.
				So, if the offset reaches 23.7, then we know
				that it has a 30 degree angle and therefore, 
				exactly aligned with the spin btn*/
          if (aoY < 23.89) {
            $("#spin").addClass("spin");
            setTimeout(function () {
              $("#spin").removeClass("spin");
                     
            }, 100);
          }
        }, 100);

        $("#inner-wheel").css({
          transform: "rotate(" + totalDegree + "deg)"
        });
        
        $('#inner-wheel').on('transitionend webkitTransitionEnd oTransitionEnd', function () {
    // your event handler
          console.log(extraDegree)
              if (extraDegree >= 0 && extraDegree < 60) {
      $("#winnings").text(`${degreeMapping.one}`);
      } else if (extraDegree >= 60 && extraDegree < 120) {
      $("#winnings").text(`${degreeMapping.two}`);
      } else if (extraDegree >= 120 && extraDegree < 180) {
      $("#winnings").text(`${degreeMapping.three}`);
      } else if (extraDegree >= 180 && extraDegree < 240) {
      $("#winnings").text(`${degreeMapping.four}`);
      } else if (extraDegree >= 240 && extraDegree < 300) {
      $("#winnings").text(`${degreeMapping.five}`);
      } else if(extraDegree>=300){
        $("#winnings").text(`${degreeMapping.six}`);
      }
});

        noY = t.offset().top;
      });
    });
  }
}); //DOCUMENT READY

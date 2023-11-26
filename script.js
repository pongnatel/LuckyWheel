//set default degree (360*5)
var degree = 1800;
//number of clicks = 0
var clicks = 0;
var attempts = 0;
var degreeMapping = {
  one: "Orange",
  two: "Yellow",
  three: "Dark Blue",
  four: "Blue",
  five: "Green",
  six: "Red"
};

let scam = [3.5, 3.7, 3.1, 3.7, 1.2, 0, 3.8, 1.3, 0.95, 2.8, 0.1, 2, 1.2, 3.8, 0, 3.2, 0.1, 2.3, 1.25, 1.45];
let values = ['red', 'red', 'green', 'red', 'yellow', 'red', 'red', 'yellow', 'yellow', 'green', 'red', 'dark blue', 'yellow', 'red', 'red', 'green', 'red', 'blue', 'yellow', 'yellows']

$(document).ready(function () {
  /*WHEEL SPIN FUNCTION*/
  if (attempts < 20) {
    $("#spin").click(function () {
      $("#winnings").text("");
      //var extraDegree = [Math.floor(scam[attempts])];
      var extraDegree = Math.floor(scam[attempts]*100);;
      //add 1 every click
      clicks++;
      attempts++;
      
      // $("#counter").text(`Attempts Remaining: ${attempts+1}`);

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
        }, 10);

        $("#inner-wheel").css({
          transform: "rotate(" + totalDegree + "deg)"
        });
        
        $('#inner-wheel').on('transitionend webkitTransitionEnd oTransitionEnd', function () {
    // your event handler
          console.log(extraDegree)
      //         if (extraDegree >= 0 && extraDegree < 60) {
      // $("#winnings").text(`${degreeMapping.one}`);
      // } else if (extraDegree >= 60 && extraDegree < 120) {
      // $("#winnings").text(`${degreeMapping.two}`);
      // } else if (extraDegree >= 120 && extraDegree < 180) {
      // $("#winnings").text(`${degreeMapping.three}`);
      // } else if (extraDegree >= 180 && extraDegree < 240) {
      // $("#winnings").text(`${degreeMapping.four}`);
      // } else if (extraDegree >= 240 && extraDegree < 300) {
      // $("#winnings").text(`${degreeMapping.five}`);
      // } else if(extraDegree>=300){
      //   $("#winnings").text(`${degreeMapping.six}`);
      // }

      switch (values[attempts-1]){
        case "red":
          $("#winnings").text("Better luck next time");
          break;
        case "yellow":
          $("#winnings").text("Wow you win a loofah!");
          break;
        case "blue":
          $("#winnings").text("Greenmart's pen is waiting for you!!!");
          break;
        case "green":
          $("#winnings").text("You have one more spin");
          break;
        case "dark blue":
          $("#winnings").text("Arg, I also want a cup holder. Take yours");
          break;
        default:
          $("#winnings").text("Better luck next time");
      }
      
});

        noY = t.offset().top;
      });
    });
  }
}); //DOCUMENT READY

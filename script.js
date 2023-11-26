//set default degree (360*5)
var degree = 1800;
//number of clicks = 0
var clicks = 0;
var attempts = 0;
var times = 0;
var degreeMapping = {
  one: "Orange",
  two: "Yellow",
  three: "Dark Blue",
  four: "Blue",
  five: "Green",
  six: "Red",
};

let scam = [
  3.5, 3.7, 3.1, 3.7, 1.2, 0, 3.8, 1.3, 0.95, 2.8, 0.1, 2, 1.2, 3.8, 0, 3.2,
  0.1, 2.3, 1.25, 1.45,
];
let values = [
  "red",
  "red",
  "green",
  "red",
  "yellow",
  "red",
  "red",
  "yellow",
  "yellow",
  "green",
  "red",
  "dark blue",
  "yellow",
  "red",
  "red",
  "green",
  "red",
  "blue",
  "yellow",
  "yellow",
];

$(document).ready(function () {
  /*WHEEL SPIN FUNCTION*/
  if (attempts < 20) {
    $("#spin").click(function () {
      $("#winnings").text("");
      //var extraDegree = [Math.floor(scam[attempts])];
      var extraDegree = Math.floor(scam[attempts] * 100);

      //add 1 every click
      clicks++;
      attempts++;

      if (times == 3) {
        extraDegree = 3.95;
      }

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
          transform: "rotate(" + totalDegree + "deg)",
        });

        $("#inner-wheel").on(
          "transitionend webkitTransitionEnd oTransitionEnd",
          function () {
            if (times == 3) {
              $("#winnings").text("BIGGEST PRIZE: LANDYARDDDDD");
              attempts = 0;
              times = 0;
            } else {
              console.log("attemps before: " + attempts);

              switch (values[attempts - 1]) {
                case "red":
                  $("#winnings").text("Better luck next time");
                  // $("#winnings").text("BIGGEST PRIZE: LANDYARDDDDD");
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
                  $("#winnings").text(
                    "Arg, I also want a cup holder. Take yours"
                  );
                  break;
                default:
                  $("#winnings").text("Wow you win a loofah!"); // fix bug
              }
            }
          }
        );

        noY = t.offset().top;
        if (attempts == 20) {
          attempts = 0;
          times++;
        }
        console.log("attemps: " + attempts);
        console.log("times: " + times);
      });
      
    });
    
  }
}); //DOCUMENT READY

//set default degree (360*5)
var degree = 1800;
//number of clicks = 0
var clicks = 0;
var attempts = 0;
var times = 0;
var degreeMapping = {
  one: "BIGGEST PRIZE: LANDYARDDDDD",
  two: "You have one more spin",
  three: "Wow you win a wooden coaster!",
  four: "BIGGEST PRIZE: MINI POUCH",
  five: "You have one more spin",
  six: "Wow you win a wooden coaster!",
};
var big = false;

let scam = [
  1.6, 1.4, 3.5, 1.4, 3.5, 1.6, 1.4, 3.5, 1.4, 3.5, 1.6, 1.4, 1.4, 3.5, 3.5,
];

$(document).ready(function () {
  /*WHEEL SPIN FUNCTION*/
  if (attempts < 60) {
    $("#spin").click(function () {
      $("#winnings").text("");
      //var extraDegree = [Math.floor(scam[attempts])];
      var extraDegree = Math.floor(scam[attempts] * 100);
      big = false;
      if (attempts == 5) {
        times++;
        attempts = 0;
      }
      //add 1 every click
      clicks++;
      attempts++;

      //landyard after 30 spins
      if (times == 2) {
        extraDegree = 35;
        attempts--;
        times++;
        big = true;
      }

      //mini pouch after 30 spins
      if (times == 5) {
        extraDegree = 250;
        times = 0;
        attempts--;
        big = true;
      }

      var newDegree = degree * clicks;
      totalDegree = newDegree + extraDegree;

      // log result
      if (extraDegree > 30 && extraDegree <= 90) {
        console.log("Landyard");
      } else if (extraDegree > 90 && extraDegree <= 150) {
        console.log("spin");
      } else if (extraDegree > 150 && extraDegree <= 210) {
        console.log("lot ly");
      } else if (extraDegree > 210 && extraDegree <= 270) {
        console.log("Mini pouch");
      } else if (extraDegree > 270 && extraDegree <= 330) {
        console.log("spin");
      } else if (extraDegree >= 330 || extraDegree <= 30) {
        console.log("lot ly");
      }

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
            if (extraDegree > 30 && extraDegree <= 90) {
              $("#winnings").text(`${degreeMapping.one}`);
              console.log("Landyard");
            } else if (extraDegree > 90 && extraDegree <= 150) {
              $("#winnings").text(`${degreeMapping.two}`);
              console.log("spin");
            } else if (extraDegree > 150 && extraDegree <= 210) {
              $("#winnings").text(`${degreeMapping.three}`);
              console.log("lot ly");
            } else if (extraDegree > 210 && extraDegree <= 270) {
              $("#winnings").text(`${degreeMapping.four}`);
              console.log("Mini pouch");
            } else if (extraDegree > 270 && extraDegree <= 330) {
              $("#winnings").text(`${degreeMapping.five}`);
              console.log("spin");
            } else if (extraDegree >= 330 || extraDegree <= 30) {
              $("#winnings").text(`${degreeMapping.six}`);
              console.log("lot ly");
            }
          }
        );

        noY = t.offset().top;
      });
      console.log("attemps: " + attempts);
      console.log("times: " + times);
      console.log(big);
    });
  }
}); //DOCUMENT READY

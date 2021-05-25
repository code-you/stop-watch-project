$(function () {
    //variables
    var mode = false;//App Mode
    var timeCounter = 0;//time counter
    var lapCounter = 0;//lap counter
    var action;//variable for setInterval
    var lapNumber = 0;//Number of laps
    //All are for lap and  times
    var timeMinutes;
    var timeSeconds;
    var timeCentiseconds;
    var lapMinutes;
    var lapSeconds;
    var lapCentiseconds;

    //on app reload show start and lap button
    hideShowButtons("#startButton", "#lapButton");
    //click on start button
    $("#startButton").click(function () {
        //mode on
        mode = true;
        //show stop and lap buttons
        hideShowButtons("#stopButton", "#lapButton");
        //start counter
        startAction();
    });

    //clicking on the sop button
    $("#stopButton").click(function () {
        //show resume and reset button
        hideShowButtons("#resumeButton", "#resetButton");

        //stop counter
        clearInterval(action);
    });

    //clicking on resume button
    $("#resumeButton").click(function () {
        //show stop and lap button
        hideShowButtons("#stopButton", "#lapButton");
        //start action
        startAction();
    });
    //clicking on the reset button
    $("#resetButton").click(function () {
        location.reload();
    });

    //clicking on lap button
    $("#lapButton").click(function () {
        //if mode is on
        if (mode == true) {
            //stop action
            clearInterval(action);
            //resetlap and print lap
            lapCounter = 0;
            addLap();
            //start counter
            startAction();
        }
    });


    //functions
    //hideshowButtons function it shows two buttons at atime
    function hideShowButtons(Id1, Id2) {
        $(".control").hide();
        $(Id1).show();
        $(Id2).show();
    }
    //start counter function
    function startAction() {
        action = setInterval(function () {
            timeCounter++;
            if (timeMinutes == 100) {
                timeCounter = 0;
            }
            lapCounter++;
            if (lapMinutes == 100) {
                lapCounter = 0;
            }
            updateTime();
        }, 10);
    }
    //updateTime --> convert counters to min,sec,centisec
    function updateTime() {
        //1min=60*100=6000centisec
        timeMinutes = Math.floor(timeCounter / 6000);
        //1sec=100centisec
        timeSeconds = Math.floor((timeCounter % 6000) / 100);
        //time centisec
        timeCentiseconds = Math.floor((timeCounter % 6000) % 100);
        //setting the values in innerHTML
        $("#time_minute").text(format(timeMinutes));
        $("#time_second").text(format(timeSeconds));
        $("#time_centisecond").text(format(timeCentiseconds));

        //1min=60*100=6000centisec
        lapMinutes = Math.floor(lapCounter / 6000);
        //1sec=100centisec
        lapSeconds = Math.floor((lapCounter % 6000) / 100);
        //time centisec
        lapCentiseconds = Math.floor((lapCounter % 6000) % 100);

        //setting the values in innerHTML
        $("#lap_minute").text(format(lapMinutes));
        $("#lap_second").text(format(lapSeconds));
        $("#lap_centisecond").text(format(lapCentiseconds));

    }

    //format number
    function format(number) {
        if (number < 10) {
            return '0' + number;
        }
        else {
            return number;
        }
    }
    //addLap function --> To print lap details inside the lap box
    function addLap() {
        lapNumber++;
        var myLapDetails = "<div class='lap'>" +
            "<div class='lapTimeTitle'>" + 'Lap' + lapNumber + "</div>" +
            "<div class='lapTime'>" + '<span>' + format(lapMinutes) + '</span>' + ':<span>' + format(lapSeconds) + '</span>' + ':<span>' + format(lapCentiseconds) + '</span>' + "</div>"
        "</div>";
        $(myLapDetails).prependTo("#laps");

    }
});
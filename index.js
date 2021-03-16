$(function () {

    var client = mqtt.connect('wss://test.mosquitto.org:8081');
    var canvasTemp = $('#temp-guage')[0];
    var gaugeTemp = new Gauge(canvasTemp).setOptions();
    var canvasHumid = $('#humid-guage')[0];
    var gaugeHumid = new Gauge(canvasHumid).setOptions();

    client.on('connect', function () {
        console.log("connected");
        client.subscribe('/iot/smarthome/dht22', function (err) {
            if (!err) {
                console.log("subscribed to topic: ", '/iot/smarthome/dht22');
                gaugeTemp.maxValue = 100;
                gaugeTemp.setMinValue(0);
                gaugeTemp.set(0);
                gaugeHumid.maxValue = 100;
                gaugeHumid.setMinValue(0);
                gaugeHumid.set(0);
            }
        })
    })

    client.on("message", function (topic, payload) {
        console.log("topic: ", topic);
        console.log("payload: ", payload.toString());
        var message = payload.toString();
        var temp = message.split(',')[0];
        var humid = message.split(',')[1];
        $("#temp").text(temp);
        $("#humid").text(humid);
        var opts = {
            // options here
        };
        gaugeTemp.set(Number(temp));
        gaugeHumid.set(Number(humid));
    })

});
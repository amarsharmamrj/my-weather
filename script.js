$(document).ready(function() {
    // Now weather script start here

    // Trigger click on check when click enter button
    $(".city").keyup(function(event) {
        if (event.keyCode === 13) {
            $(".find").click();
        }
    });

    // Api call when click on Check button
    $(".find").click(function() {
        $(".spin").addClass("spinner-border");
        var city = $(".city").val();

        // api call
        $.ajax({
            crossDomain: true,
            url: "http://api.weatherstack.com/current?access_key=0e311451f2eef6a48f2b846fb8bd588d&query=" + city + "",
            dataType: "json",
            success: function(data) {
                console.log(data);
                if (data.success == false) {
                    alert("Enter a valid city name");
                } else {
                    $(".populate_div").html(
                        '<div class="col-md-6 now_div">' +
                        '                <div class="main_div">' +
                        '                    <p class="now_location"><span class="now_city"></span><span>, </span><span class="now_region"></span><span>, </span><span class="now_country"></span></p>' +
                        '                    <p class="now_time">Observed On <span class="time"></span><span><span>, </span><span class="date"></span></p>' +
                        '                    <img class="now_icon" src="" alt="">' +
                        '                    <h1><span class="now_temp"></span><sup class="sub"> o</sup><span class="sub_span">C</span></h1>' +
                        '                    <p class="now_summary"></p class="now_summary">' +
                        '                </div>' +
                        '            </div>' +
                        '            <div class="col-md-6">' +
                        '                <table class="table table-responsive table-hover now_table" style="width:100%;">' +
                        '                    <tbody>' +
                        '                        <tr>' +
                        '                            <td class="detail_icon"><img src="precipitation.png" alt=""></td>' +
                        '                            <td class="detail_prop_preci">Precipitation</td>' +
                        '                            <td><span class="detail_value_preci"></span><span>mm</span></td>' +
                        '                        </tr>' +
                        '                        <tr>' +
                        '                            <td class="detail_icon"><img src="cloud_cover1.png" alt=""></td>' +
                        '                            <td class="detail_prop_cloud_cover">Cloud Cover</td>' +
                        '                            <td><span class="detail_value_cloud_cover"></span><span>%</span></td>' +
                        '                        </tr>' +
                        '                        <tr>' +
                        '                            <td class="detail_icon"><img src="icon_wind.png" alt=""></td>' +
                        '                            <td class="detail_prop_wind_speed">Wind Speed</td>' +
                        '                            <td><span class="detail_value_wind_speed"></span><span>km/h</span></td>' +
                        '                        </tr>' +
                        '                        <tr>' +
                        '                            <td class="detail_icon"><img src="wind_rdirection.png" alt=""></td>' +
                        '                            <td class="detail_prop_wind_direction">Wind Direction</td>' +
                        '                            <td><span class="detail_value_wind_direction"></span><span></span></td>' +
                        '                        </tr>' +
                        '                        <tr>' +
                        '                            <td class="detail_icon"><img src="icon_humidity.png" alt=""></td>' +
                        '                            <td class="detail_prop_humidity">Humidity</td>' +
                        '                            <td><span class="detail_value_humidity"></span><span>%</span></td>' +
                        '                        </tr>' +
                        '                        <tr>' +
                        '                            <td class="detail_icon"><img src="icon_pressure.png" alt=""></td>' +
                        '                            <td class="detail_prop_pressure">Pressure</td>' +
                        '                            <td><span class="detail_value_pressure"></span><span>mb</span></td>' +
                        '                        </tr>' +
                        '                        <tr>' +
                        '                            <td class="detail_icon"><img src="icon_visibility.png" alt=""></td>' +
                        '                            <td class="detail_prop_visibility">Visibility</td>' +
                        '                            <td><span class="detail_value_visibility"></span><span>km</span></td>' +
                        '                        </tr>' +
                        '                        <tr>' +
                        '                            <td class="detail_icon"><img src="UV_index1png.png" alt=""></td>' +
                        '                            <td class="detail_prop_uv_index">UV Index</td>' +
                        '                            <td><span class="detail_value_uv_index"></span><span></span></td>' +
                        '                        </tr>' +
                        '                    </tbody>' +
                        '                </table>' +
                        '            </div>'
                    );

                    // Observed time
                    var d = new Date();
                    var time = d.toLocaleTimeString();
                    var date = d.toLocaleDateString();
                    $(".now_time .time").text(time);
                    $(".now_time .date").text(date);

                    // Getting values from api and palcing in different fields
                    $(".now_city").text(data.location.name);
                    $(".now_region").text(data.location.region);
                    $(".now_country").text(data.location.country);
                    $(".now_temp").text(data.current.temperature);
                    $(".now_summary").text(data.current.weather_descriptions);
                    $(".detail_value_preci").text(data.current.precip);
                    $(".detail_value_cloud_cover").text(data.current.cloudcover);
                    $(".detail_value_wind_speed").text(data.current.wind_speed);
                    $(".detail_value_wind_direction").text(data.current.wind_dir);
                    $(".detail_value_humidity").text(data.current.humidity);
                    $(".detail_value_pressure").text(data.current.pressure);
                    $(".detail_value_visibility").text(data.current.visibility);
                    $(".detail_value_uv_index").text(data.current.uv_index);

                    // different images for diffrent weather summary
                    var summary_image = data.current.weather_descriptions;
                    switch (summary_image[0]) {
                        case "Haze":
                            $(".now_icon").attr("src", "daze.gif");
                            break;
                        case "Partly cloud":
                            $(".now_icon").attr("src", "partly_cloud.gif");
                            break;
                        case "Sunny":
                            $(".now_icon").attr("src", "sunny.gif");
                            break;
                        case "Smoke":
                            $(".now_icon").attr("src", "smoke.gif");
                            break;
                        case "Fog":
                            $(".now_icon").attr("src", "fog.gif");
                            break;
                        case "Rain":
                            $(".now_icon").attr("src", "rain.gif");
                            break;
                        case "Snow":
                            $(".now_icon").attr("src", "snow.gif");
                            break;
                        default:
                            $(".now_icon").attr("src", "sunny.gif");
                    }
                }
                $(".spin").removeClass("spinner-border");
            },
            error: function() {
                alert("Enter a valid name of city");
            },
        });
    });
    // Now weather script here
});
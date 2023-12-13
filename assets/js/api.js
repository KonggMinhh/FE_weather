"use strict";
// Define server connect socket
const socket = io("http://localhost:3000");

// const api_key = "9bbc9de017cfa48a70c5390c42bc83c1";
// Call API
// export const fetchData = function (params, callback) {
//     console.log("data", params);
//     // fetch(`${URL}&appid=${api_key}`)
//     //     .then((res) => {
//     //         if (!res.ok) {
//     //             throw new Error(`HTTP error! Status: ${res.status}`);
//     //         }
//     //         return res.json();
//     //     })
//     //     .then((data) => callback(data))
//     //     .catch((error) => {
//     //         console.error("Error fetching data:", error);
//     //     });
// };

//  Call Api Search
export const fetchDataSearch = function (params, callback) {
    // * * * Get Geocoding * * *
    // Gửi yêu cầu đến server thông qua socket với tham số params
    socket.emit("subscribeGeocoding", { params });
    // Lắng nghe sự kiện từ server khi có kết quả trả về
    socket.once("geocodingUpdate", (data) => {
        // Kiểm tra nếu có lỗi từ server
        if (data.error) {
            console.error("Error fetching data:", data.error);
            // Reject promise with the error from the server
            callback({ error: data.error });
        } else {
            // Resolve promise with the data from the server

            callback(data.data);
        }
    });
};

// Call Api Current City
export const fetchDataCurrent = function (params, callback) {
    //* * * Get Current City * * *
    socket.emit("subscribeCity", { params });
    socket.once("cityUpdate", (data) => {
        // Kiểm tra nếu có lỗi từ server
        if (data.error) {
            console.error("Error fetching data:", data.error);
            // Reject promise with the error from the server
            callback({ error: data.error });
        } else {
            // Resolve promise with the data from the server

            callback(data.data);
        }
    });
};

// Call Api Reverse Geo City
export const fetchDataReverseGeo = function (params, callback) {
    // * * * Get Reverse Geocoding * * *
    socket.emit("subscribeReverseGeocoding", { params });
    // Lắng nghe sự kiện từ server khi có kết quả trả về
    socket.once("reverseGeoUpdate", (data) => {
        // Kiểm tra nếu có lỗi từ server
        if (data.error) {
            console.error("Error fetching data:", data.error);
            // Reject promise with the error from the server
            callback({ error: data.error });
        } else {
            // Resolve promise with the data from the server

            callback(data.data);
        }
    });
};
// Call Api Pollution

export const fetchDataPollution = function (params, callback) {
    // * * * Get Pollution * * *
    socket.emit("subscribePollution", { params });
    // Lắng nghe sự kiện từ server khi có kết quả trả về
    socket.once("pollutionUpdate", (data) => {
        // Kiểm tra nếu có lỗi từ server
        if (data.error) {
            console.error("Error fetching data:", data.error);
            // Reject promise with the error from the server
            callback({ error: data.error });
        } else {
            // Resolve promise with the data from the server
            callback(data);
            console.log(data.data);
        }
    });
};

// Call Api Forecast

export const fetchDataForecast = function (params, callback) {
    // * * * Get Forecast * * *
    socket.emit("subscribeForecast", { params });
    // Lắng nghe sự kiện từ server khi có kết quả trả về
    socket.once("forecastUpdate", (data) => {
        // Kiểm tra nếu có lỗi từ server
        if (data.error) {
            console.error("Error fetching data:", data.error);
            // Reject promise with the error from the server
            callback({ error: data.error });
        } else {
            // Resolve promise with the data from the server
            callback(data.data);
        }
    });
};

export const url = {
    currentWeather(lat, lon) {
        return fetchDataCurrent({ lat, lon }, (data) => data);
    },
    forecast(lat, lon) {
        return fetchDataForecast({ lat, lon }, (data) => data);
    },
    airPollution(lat, lon) {
        return fetchDataPollution({ lat, lon }, (data) => data);
    },
    geo(city) {
        return fetchDataSearch(city, (data) => data);
    },
    reverseGeo(lat, lon) {
        return fetchDataReverseGeo({ lat, lon }, (data) => data);
    },

    // currentWeather(lat, lon) {
    //     return `https://api.openweathermap.org/data/2.5/weather?${lat}&${lon}&units=metric`;
    // },
    // forecast(lat, lon) {
    //     return `https://api.openweathermap.org/data/2.5/forecast?${lat}&${lon}&units-metric`;
    // },
    // airPollution(lat, lon) {
    //     return `http://api.openweathermap.org/data/2.5/air_pollution?${lat}&${lon}`;
    // },
    // reverseGeo(lat, lon) {
    //     return `http://api.openweathermap.org/geo/1.0/reverse?${lat}&${lon}&limit=5`;
    // },
    // geo(query) {
    //     /
    //     return `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`;
    // },
};

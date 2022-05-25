import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getForecast(location: any){
    return of({
    "lat": 57.7333,
    "lon": 12.1167,
    "timezone": "Europe/Stockholm",
    "timezone_offset": 7200,
    "current": {
        "dt": 1651257570,
        "sunrise": 1651202726,
        "sunset": 1651258328,
        "temp": 9.49,
        "feels_like": 7.85,
        "pressure": 1025,
        "humidity": 55,
        "dew_point": 0.91,
        "uvi": 0,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 3.09,
        "wind_deg": 10,
        "weather": [
            {
                "id": 800,
                "main": "Clear",
                "description": "clear sky",
                "icon": "01d"
            }
        ]
    },
    "minutely": [
        {
            "dt": 1651257600,
            "precipitation": 0
        },
        {
            "dt": 1651257660,
            "precipitation": 0
        },
        {
            "dt": 1651257720,
            "precipitation": 0
        },
        {
            "dt": 1651257780,
            "precipitation": 0
        },
        {
            "dt": 1651257840,
            "precipitation": 0
        },
        {
            "dt": 1651257900,
            "precipitation": 0
        },
        {
            "dt": 1651257960,
            "precipitation": 0
        },
        {
            "dt": 1651258020,
            "precipitation": 0
        },
        {
            "dt": 1651258080,
            "precipitation": 0
        },
        {
            "dt": 1651258140,
            "precipitation": 0
        },
        {
            "dt": 1651258200,
            "precipitation": 0
        },
        {
            "dt": 1651258260,
            "precipitation": 0
        },
        {
            "dt": 1651258320,
            "precipitation": 0
        },
        {
            "dt": 1651258380,
            "precipitation": 0
        },
        {
            "dt": 1651258440,
            "precipitation": 0
        },
        {
            "dt": 1651258500,
            "precipitation": 0
        },
        {
            "dt": 1651258560,
            "precipitation": 0
        },
        {
            "dt": 1651258620,
            "precipitation": 0
        },
        {
            "dt": 1651258680,
            "precipitation": 0
        },
        {
            "dt": 1651258740,
            "precipitation": 0
        },
        {
            "dt": 1651258800,
            "precipitation": 0
        },
        {
            "dt": 1651258860,
            "precipitation": 0
        },
        {
            "dt": 1651258920,
            "precipitation": 0
        },
        {
            "dt": 1651258980,
            "precipitation": 0
        },
        {
            "dt": 1651259040,
            "precipitation": 0
        },
        {
            "dt": 1651259100,
            "precipitation": 0
        },
        {
            "dt": 1651259160,
            "precipitation": 0
        },
        {
            "dt": 1651259220,
            "precipitation": 0
        },
        {
            "dt": 1651259280,
            "precipitation": 0
        },
        {
            "dt": 1651259340,
            "precipitation": 0
        },
        {
            "dt": 1651259400,
            "precipitation": 0
        },
        {
            "dt": 1651259460,
            "precipitation": 0
        },
        {
            "dt": 1651259520,
            "precipitation": 0
        },
        {
            "dt": 1651259580,
            "precipitation": 0
        },
        {
            "dt": 1651259640,
            "precipitation": 0
        },
        {
            "dt": 1651259700,
            "precipitation": 0
        },
        {
            "dt": 1651259760,
            "precipitation": 0
        },
        {
            "dt": 1651259820,
            "precipitation": 0
        },
        {
            "dt": 1651259880,
            "precipitation": 0
        },
        {
            "dt": 1651259940,
            "precipitation": 0
        },
        {
            "dt": 1651260000,
            "precipitation": 0
        },
        {
            "dt": 1651260060,
            "precipitation": 0
        },
        {
            "dt": 1651260120,
            "precipitation": 0
        },
        {
            "dt": 1651260180,
            "precipitation": 0
        },
        {
            "dt": 1651260240,
            "precipitation": 0
        },
        {
            "dt": 1651260300,
            "precipitation": 0
        },
        {
            "dt": 1651260360,
            "precipitation": 0
        },
        {
            "dt": 1651260420,
            "precipitation": 0
        },
        {
            "dt": 1651260480,
            "precipitation": 0
        },
        {
            "dt": 1651260540,
            "precipitation": 0
        },
        {
            "dt": 1651260600,
            "precipitation": 0
        },
        {
            "dt": 1651260660,
            "precipitation": 0
        },
        {
            "dt": 1651260720,
            "precipitation": 0
        },
        {
            "dt": 1651260780,
            "precipitation": 0
        },
        {
            "dt": 1651260840,
            "precipitation": 0
        },
        {
            "dt": 1651260900,
            "precipitation": 0
        },
        {
            "dt": 1651260960,
            "precipitation": 0
        },
        {
            "dt": 1651261020,
            "precipitation": 0
        },
        {
            "dt": 1651261080,
            "precipitation": 0
        },
        {
            "dt": 1651261140,
            "precipitation": 0
        },
        {
            "dt": 1651261200,
            "precipitation": 0
        }
    ],
    "hourly": [
        {
            "dt": 1651255200,
            "temp": 9.45,
            "feels_like": 8.69,
            "pressure": 1025,
            "humidity": 56,
            "dew_point": 1.12,
            "uvi": 0.1,
            "clouds": 16,
            "visibility": 10000,
            "wind_speed": 1.84,
            "wind_deg": 325,
            "wind_gust": 3.65,
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651258800,
            "temp": 9.49,
            "feels_like": 8.87,
            "pressure": 1025,
            "humidity": 55,
            "dew_point": 0.91,
            "uvi": 0,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 1.7,
            "wind_deg": 349,
            "wind_gust": 1.79,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651262400,
            "temp": 8.82,
            "feels_like": 8.1,
            "pressure": 1025,
            "humidity": 58,
            "dew_point": 1.02,
            "uvi": 0,
            "clouds": 20,
            "visibility": 10000,
            "wind_speed": 1.69,
            "wind_deg": 20,
            "wind_gust": 2.74,
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651266000,
            "temp": 7.86,
            "feels_like": 6.82,
            "pressure": 1025,
            "humidity": 59,
            "dew_point": 0.35,
            "uvi": 0,
            "clouds": 40,
            "visibility": 10000,
            "wind_speed": 1.87,
            "wind_deg": 42,
            "wind_gust": 4.92,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651269600,
            "temp": 6.66,
            "feels_like": 5.36,
            "pressure": 1026,
            "humidity": 63,
            "dew_point": 0.12,
            "uvi": 0,
            "clouds": 58,
            "visibility": 10000,
            "wind_speed": 1.94,
            "wind_deg": 68,
            "wind_gust": 4.54,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651273200,
            "temp": 5.6,
            "feels_like": 4.54,
            "pressure": 1025,
            "humidity": 68,
            "dew_point": 0.17,
            "uvi": 0,
            "clouds": 78,
            "visibility": 10000,
            "wind_speed": 1.57,
            "wind_deg": 86,
            "wind_gust": 1.71,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651276800,
            "temp": 4.52,
            "feels_like": 3.45,
            "pressure": 1025,
            "humidity": 75,
            "dew_point": 0.49,
            "uvi": 0,
            "clouds": 98,
            "visibility": 10000,
            "wind_speed": 1.46,
            "wind_deg": 108,
            "wind_gust": 1.48,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651280400,
            "temp": 4.3,
            "feels_like": 4.3,
            "pressure": 1025,
            "humidity": 78,
            "dew_point": 0.79,
            "uvi": 0,
            "clouds": 99,
            "visibility": 10000,
            "wind_speed": 1.3,
            "wind_deg": 119,
            "wind_gust": 1.32,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651284000,
            "temp": 4.08,
            "feels_like": 4.08,
            "pressure": 1025,
            "humidity": 81,
            "dew_point": 1.09,
            "uvi": 0,
            "clouds": 96,
            "visibility": 10000,
            "wind_speed": 1.19,
            "wind_deg": 117,
            "wind_gust": 1.18,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651287600,
            "temp": 4.59,
            "feels_like": 4.59,
            "pressure": 1025,
            "humidity": 79,
            "dew_point": 1.33,
            "uvi": 0,
            "clouds": 95,
            "visibility": 10000,
            "wind_speed": 1.09,
            "wind_deg": 108,
            "wind_gust": 1.05,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651291200,
            "temp": 5.79,
            "feels_like": 5.79,
            "pressure": 1024,
            "humidity": 74,
            "dew_point": 1.45,
            "uvi": 0,
            "clouds": 96,
            "visibility": 10000,
            "wind_speed": 1.02,
            "wind_deg": 101,
            "wind_gust": 1.21,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651294800,
            "temp": 6.66,
            "feels_like": 6.66,
            "pressure": 1025,
            "humidity": 70,
            "dew_point": 1.59,
            "uvi": 0.23,
            "clouds": 97,
            "visibility": 10000,
            "wind_speed": 0.95,
            "wind_deg": 98,
            "wind_gust": 1.6,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651298400,
            "temp": 7.64,
            "feels_like": 7.64,
            "pressure": 1025,
            "humidity": 65,
            "dew_point": 1.53,
            "uvi": 0.62,
            "clouds": 97,
            "visibility": 10000,
            "wind_speed": 1.15,
            "wind_deg": 93,
            "wind_gust": 1.84,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651302000,
            "temp": 9.03,
            "feels_like": 9.03,
            "pressure": 1025,
            "humidity": 59,
            "dew_point": 1.48,
            "uvi": 1.24,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 1.22,
            "wind_deg": 104,
            "wind_gust": 1.78,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651305600,
            "temp": 10.4,
            "feels_like": 8.91,
            "pressure": 1025,
            "humidity": 54,
            "dew_point": 1.46,
            "uvi": 2.04,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 1.09,
            "wind_deg": 125,
            "wind_gust": 1.5,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651309200,
            "temp": 11.79,
            "feels_like": 10.3,
            "pressure": 1024,
            "humidity": 49,
            "dew_point": 1.53,
            "uvi": 2.89,
            "clouds": 98,
            "visibility": 10000,
            "wind_speed": 0.96,
            "wind_deg": 169,
            "wind_gust": 1.27,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651312800,
            "temp": 13.53,
            "feels_like": 12.09,
            "pressure": 1024,
            "humidity": 44,
            "dew_point": 1.35,
            "uvi": 3.02,
            "clouds": 94,
            "visibility": 10000,
            "wind_speed": 1.28,
            "wind_deg": 223,
            "wind_gust": 1.26,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651316400,
            "temp": 14.31,
            "feels_like": 12.84,
            "pressure": 1023,
            "humidity": 40,
            "dew_point": 0.71,
            "uvi": 3.28,
            "clouds": 84,
            "visibility": 10000,
            "wind_speed": 2.17,
            "wind_deg": 244,
            "wind_gust": 1.9,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651320000,
            "temp": 13.56,
            "feels_like": 12.07,
            "pressure": 1022,
            "humidity": 42,
            "dew_point": 0.76,
            "uvi": 3.17,
            "clouds": 80,
            "visibility": 10000,
            "wind_speed": 3.06,
            "wind_deg": 256,
            "wind_gust": 2.46,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651323600,
            "temp": 12.57,
            "feels_like": 11.11,
            "pressure": 1022,
            "humidity": 47,
            "dew_point": 1.55,
            "uvi": 3.02,
            "clouds": 59,
            "visibility": 10000,
            "wind_speed": 3.47,
            "wind_deg": 265,
            "wind_gust": 2.69,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651327200,
            "temp": 12.17,
            "feels_like": 10.72,
            "pressure": 1022,
            "humidity": 49,
            "dew_point": 1.94,
            "uvi": 2.26,
            "clouds": 60,
            "visibility": 10000,
            "wind_speed": 2.93,
            "wind_deg": 270,
            "wind_gust": 2.22,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651330800,
            "temp": 12.43,
            "feels_like": 11.01,
            "pressure": 1022,
            "humidity": 49,
            "dew_point": 1.89,
            "uvi": 1.45,
            "clouds": 56,
            "visibility": 10000,
            "wind_speed": 2.55,
            "wind_deg": 273,
            "wind_gust": 1.76,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651334400,
            "temp": 11.94,
            "feels_like": 10.5,
            "pressure": 1021,
            "humidity": 50,
            "dew_point": 1.8,
            "uvi": 0.87,
            "clouds": 55,
            "visibility": 10000,
            "wind_speed": 2.75,
            "wind_deg": 277,
            "wind_gust": 1.94,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651338000,
            "temp": 11,
            "feels_like": 9.54,
            "pressure": 1021,
            "humidity": 53,
            "dew_point": 1.84,
            "uvi": 0.37,
            "clouds": 54,
            "visibility": 10000,
            "wind_speed": 2.56,
            "wind_deg": 276,
            "wind_gust": 2.46,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651341600,
            "temp": 9.26,
            "feels_like": 8.54,
            "pressure": 1021,
            "humidity": 63,
            "dew_point": 2.57,
            "uvi": 0.12,
            "clouds": 51,
            "visibility": 10000,
            "wind_speed": 1.76,
            "wind_deg": 285,
            "wind_gust": 3.07,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651345200,
            "temp": 6.46,
            "feels_like": 6.46,
            "pressure": 1022,
            "humidity": 75,
            "dew_point": 2.31,
            "uvi": 0,
            "clouds": 49,
            "visibility": 10000,
            "wind_speed": 0.99,
            "wind_deg": 301,
            "wind_gust": 1.1,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651348800,
            "temp": 6.34,
            "feels_like": 6.34,
            "pressure": 1022,
            "humidity": 74,
            "dew_point": 2.07,
            "uvi": 0,
            "clouds": 74,
            "visibility": 10000,
            "wind_speed": 0.47,
            "wind_deg": 305,
            "wind_gust": 0.53,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651352400,
            "temp": 6.09,
            "feels_like": 6.09,
            "pressure": 1022,
            "humidity": 74,
            "dew_point": 1.79,
            "uvi": 0,
            "clouds": 79,
            "visibility": 10000,
            "wind_speed": 0.41,
            "wind_deg": 305,
            "wind_gust": 0.49,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651356000,
            "temp": 6.45,
            "feels_like": 6.45,
            "pressure": 1022,
            "humidity": 71,
            "dew_point": 1.65,
            "uvi": 0,
            "clouds": 85,
            "visibility": 10000,
            "wind_speed": 0.4,
            "wind_deg": 300,
            "wind_gust": 0.42,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651359600,
            "temp": 6.62,
            "feels_like": 6.62,
            "pressure": 1021,
            "humidity": 70,
            "dew_point": 1.6,
            "uvi": 0,
            "clouds": 88,
            "visibility": 10000,
            "wind_speed": 0.36,
            "wind_deg": 268,
            "wind_gust": 0.42,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651363200,
            "temp": 6.42,
            "feels_like": 6.42,
            "pressure": 1021,
            "humidity": 71,
            "dew_point": 1.55,
            "uvi": 0,
            "clouds": 90,
            "visibility": 10000,
            "wind_speed": 0.09,
            "wind_deg": 55,
            "wind_gust": 0.18,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651366800,
            "temp": 6.29,
            "feels_like": 6.29,
            "pressure": 1021,
            "humidity": 71,
            "dew_point": 1.5,
            "uvi": 0,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 0.49,
            "wind_deg": 29,
            "wind_gust": 0.55,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651370400,
            "temp": 6.23,
            "feels_like": 6.23,
            "pressure": 1021,
            "humidity": 71,
            "dew_point": 1.4,
            "uvi": 0,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 0.63,
            "wind_deg": 51,
            "wind_gust": 0.65,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651374000,
            "temp": 6,
            "feels_like": 6,
            "pressure": 1021,
            "humidity": 72,
            "dew_point": 1.3,
            "uvi": 0,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 0.9,
            "wind_deg": 41,
            "wind_gust": 0.93,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651377600,
            "temp": 6.01,
            "feels_like": 6.01,
            "pressure": 1021,
            "humidity": 72,
            "dew_point": 1.29,
            "uvi": 0,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 1.19,
            "wind_deg": 41,
            "wind_gust": 1.18,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651381200,
            "temp": 7.27,
            "feels_like": 7.27,
            "pressure": 1021,
            "humidity": 66,
            "dew_point": 1.44,
            "uvi": 0.26,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 1.17,
            "wind_deg": 46,
            "wind_gust": 2.09,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651384800,
            "temp": 9.18,
            "feels_like": 8.75,
            "pressure": 1022,
            "humidity": 57,
            "dew_point": 1.2,
            "uvi": 0.66,
            "clouds": 99,
            "visibility": 10000,
            "wind_speed": 1.47,
            "wind_deg": 50,
            "wind_gust": 2.51,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651388400,
            "temp": 11.29,
            "feels_like": 9.73,
            "pressure": 1021,
            "humidity": 48,
            "dew_point": 0.81,
            "uvi": 1.37,
            "clouds": 76,
            "visibility": 10000,
            "wind_speed": 1.52,
            "wind_deg": 53,
            "wind_gust": 2.56,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651392000,
            "temp": 13.26,
            "feels_like": 11.71,
            "pressure": 1021,
            "humidity": 41,
            "dew_point": 0.38,
            "uvi": 2.25,
            "clouds": 55,
            "visibility": 10000,
            "wind_speed": 1.33,
            "wind_deg": 51,
            "wind_gust": 2.36,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651395600,
            "temp": 14.72,
            "feels_like": 13.19,
            "pressure": 1021,
            "humidity": 36,
            "dew_point": -0.12,
            "uvi": 3.17,
            "clouds": 41,
            "visibility": 10000,
            "wind_speed": 1.01,
            "wind_deg": 26,
            "wind_gust": 2.35,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651399200,
            "temp": 15.41,
            "feels_like": 13.89,
            "pressure": 1021,
            "humidity": 34,
            "dew_point": -0.6,
            "uvi": 3.68,
            "clouds": 38,
            "visibility": 10000,
            "wind_speed": 1.1,
            "wind_deg": 344,
            "wind_gust": 2.52,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651402800,
            "temp": 15.42,
            "feels_like": 13.91,
            "pressure": 1020,
            "humidity": 34,
            "dew_point": -0.54,
            "uvi": 4,
            "clouds": 49,
            "visibility": 10000,
            "wind_speed": 1.69,
            "wind_deg": 306,
            "wind_gust": 2.56,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651406400,
            "temp": 14.78,
            "feels_like": 13.28,
            "pressure": 1020,
            "humidity": 37,
            "dew_point": -0.02,
            "uvi": 3.86,
            "clouds": 57,
            "visibility": 10000,
            "wind_speed": 2.76,
            "wind_deg": 286,
            "wind_gust": 2.92,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651410000,
            "temp": 14.37,
            "feels_like": 12.91,
            "pressure": 1020,
            "humidity": 40,
            "dew_point": 0.62,
            "uvi": 3.41,
            "clouds": 91,
            "visibility": 10000,
            "wind_speed": 3.65,
            "wind_deg": 282,
            "wind_gust": 3.4,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651413600,
            "temp": 14.25,
            "feels_like": 12.8,
            "pressure": 1020,
            "humidity": 41,
            "dew_point": 1.11,
            "uvi": 2.56,
            "clouds": 72,
            "visibility": 10000,
            "wind_speed": 4.21,
            "wind_deg": 278,
            "wind_gust": 3.62,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651417200,
            "temp": 13.45,
            "feels_like": 12,
            "pressure": 1020,
            "humidity": 44,
            "dew_point": 1.52,
            "uvi": 1.65,
            "clouds": 62,
            "visibility": 10000,
            "wind_speed": 4.22,
            "wind_deg": 275,
            "wind_gust": 4.1,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651420800,
            "temp": 12.59,
            "feels_like": 11.13,
            "pressure": 1020,
            "humidity": 47,
            "dew_point": 1.52,
            "uvi": 0.96,
            "clouds": 52,
            "visibility": 10000,
            "wind_speed": 3.72,
            "wind_deg": 281,
            "wind_gust": 4.5,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1651424400,
            "temp": 11.59,
            "feels_like": 10.14,
            "pressure": 1020,
            "humidity": 51,
            "dew_point": 1.62,
            "uvi": 0.41,
            "clouds": 44,
            "visibility": 10000,
            "wind_speed": 3.18,
            "wind_deg": 287,
            "wind_gust": 4.78,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                }
            ],
            "pop": 0
        }
    ],
    "daily": [
        {
            "dt": 1651230000,
            "sunrise": 1651202726,
            "sunset": 1651258328,
            "moonrise": 1651202940,
            "moonset": 1651252320,
            "moon_phase": 0.95,
            "temp": {
                "day": 13.47,
                "min": 2.91,
                "max": 13.58,
                "night": 7.86,
                "eve": 10.08,
                "morn": 5.04
            },
            "feels_like": {
                "day": 11.94,
                "night": 6.82,
                "eve": 8.53,
                "morn": 5.04
            },
            "pressure": 1027,
            "humidity": 41,
            "dew_point": 0.24,
            "wind_speed": 3.82,
            "wind_deg": 235,
            "wind_gust": 4.92,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "clouds": 71,
            "pop": 0,
            "uvi": 3.71
        },
        {
            "dt": 1651316400,
            "sunrise": 1651288979,
            "sunset": 1651344861,
            "moonrise": 1651289640,
            "moonset": 1651343700,
            "moon_phase": 0,
            "temp": {
                "day": 14.31,
                "min": 4.08,
                "max": 14.31,
                "night": 6.09,
                "eve": 11,
                "morn": 6.66
            },
            "feels_like": {
                "day": 12.84,
                "night": 6.09,
                "eve": 9.54,
                "morn": 6.66
            },
            "pressure": 1023,
            "humidity": 40,
            "dew_point": 0.71,
            "wind_speed": 3.47,
            "wind_deg": 265,
            "wind_gust": 4.54,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "clouds": 84,
            "pop": 0,
            "uvi": 3.28
        },
        {
            "dt": 1651402800,
            "sunrise": 1651375232,
            "sunset": 1651431394,
            "moonrise": 1651376460,
            "moonset": 1651435140,
            "moon_phase": 0.02,
            "temp": {
                "day": 15.42,
                "min": 5.96,
                "max": 15.42,
                "night": 5.96,
                "eve": 11.59,
                "morn": 7.27
            },
            "feels_like": {
                "day": 13.91,
                "night": 5.96,
                "eve": 10.14,
                "morn": 7.27
            },
            "pressure": 1020,
            "humidity": 34,
            "dew_point": -0.54,
            "wind_speed": 4.22,
            "wind_deg": 275,
            "wind_gust": 5,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                }
            ],
            "clouds": 49,
            "pop": 0,
            "uvi": 4
        },
        {
            "dt": 1651489200,
            "sunrise": 1651461487,
            "sunset": 1651517927,
            "moonrise": 1651463460,
            "moonset": 1651526520,
            "moon_phase": 0.05,
            "temp": {
                "day": 11.63,
                "min": 4.86,
                "max": 11.66,
                "night": 7.34,
                "eve": 8.94,
                "morn": 7.64
            },
            "feels_like": {
                "day": 10.13,
                "night": 5.1,
                "eve": 6.22,
                "morn": 5.55
            },
            "pressure": 1013,
            "humidity": 49,
            "dew_point": 1.23,
            "wind_speed": 7.24,
            "wind_deg": 235,
            "wind_gust": 11.91,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "clouds": 88,
            "pop": 0,
            "uvi": 4.18
        },
        {
            "dt": 1651575600,
            "sunrise": 1651547744,
            "sunset": 1651604459,
            "moonrise": 1651550640,
            "moonset": 0,
            "moon_phase": 0.08,
            "temp": {
                "day": 12.1,
                "min": 3.43,
                "max": 12.1,
                "night": 3.43,
                "eve": 8.29,
                "morn": 6.71
            },
            "feels_like": {
                "day": 9.89,
                "night": 3.43,
                "eve": 7.05,
                "morn": 3.43
            },
            "pressure": 1018,
            "humidity": 20,
            "dew_point": -9.97,
            "wind_speed": 6.45,
            "wind_deg": 49,
            "wind_gust": 13.4,
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02d"
                }
            ],
            "clouds": 19,
            "pop": 0,
            "uvi": 4.34
        },
        {
            "dt": 1651662000,
            "sunrise": 1651634002,
            "sunset": 1651690991,
            "moonrise": 1651638360,
            "moonset": 1651617660,
            "moon_phase": 0.11,
            "temp": {
                "day": 12.59,
                "min": 1.79,
                "max": 12.59,
                "night": 6.58,
                "eve": 8.89,
                "morn": 6.69
            },
            "feels_like": {
                "day": 10.84,
                "night": 5.81,
                "eve": 7.57,
                "morn": 5.65
            },
            "pressure": 1020,
            "humidity": 36,
            "dew_point": -2.4,
            "wind_speed": 4.22,
            "wind_deg": 228,
            "wind_gust": 5.52,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "clouds": 82,
            "pop": 0,
            "uvi": 3.7
        },
        {
            "dt": 1651748400,
            "sunrise": 1651720261,
            "sunset": 1651777523,
            "moonrise": 1651726860,
            "moonset": 1651708260,
            "moon_phase": 0.14,
            "temp": {
                "day": 11.9,
                "min": 5.55,
                "max": 11.9,
                "night": 7.2,
                "eve": 9.32,
                "morn": 8.21
            },
            "feels_like": {
                "day": 10.53,
                "night": 6.35,
                "eve": 8.96,
                "morn": 7.16
            },
            "pressure": 1022,
            "humidity": 53,
            "dew_point": 2.74,
            "wind_speed": 3.69,
            "wind_deg": 247,
            "wind_gust": 3.42,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "clouds": 93,
            "pop": 0,
            "uvi": 4
        },
        {
            "dt": 1651834800,
            "sunrise": 1651806522,
            "sunset": 1651864054,
            "moonrise": 1651816380,
            "moonset": 1651797840,
            "moon_phase": 0.17,
            "temp": {
                "day": 11.38,
                "min": 6.68,
                "max": 12.88,
                "night": 9.63,
                "eve": 10.71,
                "morn": 8.71
            },
            "feels_like": {
                "day": 10.53,
                "night": 7.81,
                "eve": 9.77,
                "morn": 6.45
            },
            "pressure": 1022,
            "humidity": 75,
            "dew_point": 7.13,
            "wind_speed": 4.84,
            "wind_deg": 234,
            "wind_gust": 9.8,
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "clouds": 99,
            "pop": 0.61,
            "rain": 1.33,
            "uvi": 4
        }
    ]
})
  }
/*     const path = `/weather?lat=${location.lat}&lon=${location.lon}`
    return this.http.get(`${environment.dev.serverUrl}${path}`).pipe(
      map(data => {
        console.log(data)
        return 
      })
    );
  } */
}


export interface WeatherData {
    cod: string;
    message: number;
    cnt: number;
    list: WeatherDetail[];
    city: {
      id: number;
      name: string;
  
      Coordinates: {
        lat: number;
        lon: number;
      };
      country: string;
      population: number;
      timezone: number;
      sunrise: number;
      sunset: number;
    };
  }
  
  export interface WeatherDetail {
    dt: number;
    visibility: number;
    pop: number;
    dt_txt: string;
  
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
  
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
  
    clouds: {
      all: number;
    };
  
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
  
    sys: {
      pod: string;
    };
  }
  

  
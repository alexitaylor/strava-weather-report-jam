import { useEffect, useState } from 'react';

const WeatherCodeImage = ({
  weatherCode,
  weatherDescription,
}: {
  weatherCode: number | undefined;
  weatherDescription: string;
}) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    (async () => {
      if (!weatherCode) {
        return;
      }

      let formattedDescription;
      if (weatherDescription.includes(' and ')) {
        formattedDescription = weatherDescription.split('and').map((w) => w.trim().toLowerCase().split(' ').join('_'));
        formattedDescription = `${formattedDescription[1]}_${formattedDescription[0]}`;
      } else {
        formattedDescription = weatherDescription?.toLowerCase().split(' ').join('_');
      }

      const filePath = `${weatherCode}_${formattedDescription}_large.png`;
      const imgUrl = new URL(`../assets/weather-codes/${filePath}`, import.meta.url).href;
      setImage(imgUrl);
    })();
  }, [weatherCode, weatherDescription]);

  return <img src={image} alt="" />;
};

export default WeatherCodeImage;

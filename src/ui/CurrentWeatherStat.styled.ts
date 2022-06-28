import styled from 'styled-components';

const CurrentWeatherStatStyled = styled.div`
  font-size: calc(10px + 2vmin);
  border-radius: var(--spacing-large);
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  color: var(--text-color);
  height: 500px;
  display: flex;
  flex-direction: row;

  .current-weather-container {
    // TODO background: var(--brand-primary);
    color: var(--white);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: var(--spacing-xlarge);
    border-radius: var(--spacing-large);
    box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    z-index: 9;
    min-width: 300px;
    width: 300px;
  }

  .weather-stats-container {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    min-width: 300px;
    width: 500px;
    padding: 32px 32px 32px 40px;
    background: var(--n20-icicle);
    border-radius: 0 var(--spacing-large) var(--spacing-large) 0;
    margin-left: -18px;

    .forecast {
      img {
        height: 40px;
        width: 40px;
      }

      .forecast-day {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 1.25rem;
        padding: 10px 8px;
        flex: 1;

        &.active {
          background: var(--brand-primary);
          color: var(--white);
          box-shadow: inset 3px 3px 5px rgba(0, 0, 0, 0.125);
        }
      }
      .forecast-temperature {
        font-weight: bold;
      }
      .forecast-date {
        font-size: 1rem;
      }
    }

    .stats-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 16px;

      .stat {
        flex: 1;

        &:nth-child(odd) {
          margin-right: 18px;
        }
      }
    }
  }

  .date-location {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    .day {
      font-weight: bold;
    }

    .date {
      font-size: 1rem;
    }
  }

  .current-weather-stats {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 1.5rem;

    .weather-code,
    .temperature {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      flex: 1;
    }

    .temperature {
      justify-content: flex-end;
    }

    .feels-like {
      font-size: 1rem;
    }
  }
`;

export default CurrentWeatherStatStyled;

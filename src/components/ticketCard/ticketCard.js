import { add } from 'date-fns';

import classes from './ticketCard.module.scss';

const getStops = (stops) => {
  if (stops === 0) return '0 пересадок';
  if (stops === 1) return '1 пересадка';
  return `${stops} пересадки`;
};

const formatPrice = (price) => {
  const priceStrReversed = price.toString().split('').reverse().join('');
  const result = [];

  for (let i = 0; i < priceStrReversed.length; i += 1) {
    if (i % 3 === 0) {
      result.push(' ');
      result.push(priceStrReversed[i]);
    } else {
      result.push(priceStrReversed[i]);
    }
  }

  return result.reverse().join('').trim();
};

const getStartTime = (date) => {
  const hours = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();

  return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
};

const getEndTime = (date, durationInMinutes) => {
  const addedDate = add(new Date(date), { minutes: durationInMinutes });

  const hours = new Date(addedDate).getHours();
  const minutes = new Date(addedDate).getHours();

  return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
};

export const getTravelTime = (durationInMinutes) => {
  const hoursAndMinutes = `${
    durationInMinutes < 24 * 60 ? Math.floor(durationInMinutes / 60) : Math.floor((durationInMinutes / 60) % 24)
  }ч ${durationInMinutes % 60}м`;

  return durationInMinutes >= 60 * 24
    ? `${Math.floor(durationInMinutes / (60 * 24))}д ${hoursAndMinutes}`
    : hoursAndMinutes;
};

export default function TicketCard({ ticket, forward, backward }) {
  const { carrier, carrierLogoPath, price } = ticket;

  return (
    <div className={classes.ticket}>
      <div className={classes.gridRow}>
        <span className={classes.price}>{formatPrice(price)}Р</span>
        <img src={carrierLogoPath} alt={`${carrier} logo`} className={classes.logo} />
      </div>
      <div className={`${classes.gridRow} ${classes.forward}`}>
        <div>
          <p className={classes.textSecondary}>
            {forward.origin} – {forward.destination}
          </p>
          <p className={classes.flightTime}>
            {getStartTime(forward.date)} – {getEndTime(forward.date, forward.duration)}
          </p>
        </div>
        <div>
          <p className={classes.textSecondary}>В пути</p>
          <p className={classes.flightTime}>{getTravelTime(forward.duration)}</p>
        </div>
        <div>
          <p className={classes.textSecondary}>{getStops(forward.stops.length)}</p>
          <p className={classes.flightTime}>{forward.stops.join(', ')}</p>
        </div>
      </div>
      <div className={classes.gridRow}>
        <div>
          <p className={classes.textSecondary}>
            {backward.origin} – {backward.destination}
          </p>
          <p className={classes.flightTime}>
            {getStartTime(backward.date)} – {getEndTime(backward.date, backward.duration)}
          </p>
        </div>
        <div>
          <p className={classes.textSecondary}>В пути</p>
          <p className={classes.flightTime}>{getTravelTime(backward.duration)}</p>
        </div>
        <div>
          <p className={classes.textSecondary}>{getStops(backward.stops.length)}</p>
          <p className={classes.flightTime}>{backward.stops.join(', ')}</p>
        </div>
      </div>
    </div>
  );
}

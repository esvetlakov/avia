export default function filterByTransferFilters(ticket, stops) {
  let valid = false;
  const stopsA = ticket.segments[0].stops.length;
  const stopsB = ticket.segments[1].stops.length;
  if (stops.all === true) {
    return true;
  }
  if (stops.noStops === true) {
    valid = stopsA === 0 || stopsB === 0;
  }
  if (stops.oneStop === true) {
    valid = stopsA === 1 || stopsB === 1;
  }
  if (stops.twoStops === true) {
    valid = stopsA === 2 || stopsB === 2;
  }
  if (stops.threeStops === true) {
    valid = stopsA === 3 || stopsB === 3;
  }

  return valid;
}

const getTotalDuration = (ticket) => {
  const segA = ticket.segments[0];
  const segB = ticket.segments[1];

  return segA.duration + segB.duration;
};

const sortByCheapPrice = (ticketA, ticketB) => ticketA.price - ticketB.price;

const sortByDuration = (ticketA, ticketB) => {
  const durationA = getTotalDuration(ticketA);
  const durationB = getTotalDuration(ticketB);

  return durationA - durationB;
};

const sortByOptimal = (ticketA, ticketB) => {
  const byPrice = sortByCheapPrice(ticketA, ticketB) / 10;
  const byDuration = sortByDuration(ticketA, ticketB);
  return byPrice + byDuration;
};

export { sortByCheapPrice, sortByDuration, sortByOptimal };

/** Default guest counts for search filters */
export const DEFAULT_GUESTS = {
  adults: 0,
  children: 0,
  infants: 0,
  pets: 0,
};

export function mergeGuests(g) {
  return { ...DEFAULT_GUESTS, ...g };
}

/** Short summary for navbar / collapsed field */
export function formatGuestSummary(g) {
  const { adults, children, infants, pets } = mergeGuests(g);
  const people = adults + children + infants;
  if (people === 0 && pets === 0) return '';
  const parts = [];
  if (adults > 0) parts.push(`${adults} adult${adults !== 1 ? 's' : ''}`);
  if (children > 0) parts.push(`${children} child${children !== 1 ? 'ren' : ''}`);
  if (infants > 0) parts.push(`${infants} infant${infants !== 1 ? 's' : ''}`);
  if (pets > 0) parts.push(`${pets} pet${pets !== 1 ? 's' : ''}`);
  return parts.join(', ');
}

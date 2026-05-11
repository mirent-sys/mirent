export const UNITS = [
  { id: 1, b: 'gramercy', f: '30th', type: 'Studio', lbl: 'Studio', rate: 800, icon: '🌊', sqm: 28, amenities: ['WiFi','AC','Pool'], bk: [[5,9],[20,22]] },
  { id: 2, b: 'gramercy', f: '25th', type: 'Studio', lbl: 'Studio', rate: 800, icon: '🌊', sqm: 28, amenities: ['WiFi','AC','Gym'], bk: [[3,7],[22,26]] },
  { id: 3, b: 'gramercy', f: '34th', type: '1BR', lbl: '1-Bedroom', rate: 1200, icon: '🏠', sqm: 42, amenities: ['WiFi','AC','Pool','Gym'], bk: [[10,14],[28,30]] },
  { id: 4, b: 'gramercy', f: '47th', type: '2BR', lbl: '2-Bedroom', rate: 1800, icon: '🏡', sqm: 65, amenities: ['WiFi','AC','Pool','Parking'], bk: [[1,3],[18,22]] },
  { id: 5, b: 'gramercy', f: '53rd', type: '3BR', lbl: '3-Bedroom', rate: 2500, icon: '🏰', sqm: 95, amenities: ['WiFi','AC','Pool','Gym','Parking'], bk: [[1,31]] },
  { id: 6, b: 'gramercy', f: '30th', type: '3BR', lbl: '3-Bedroom', rate: 2500, icon: '🏰', sqm: 92, amenities: ['WiFi','AC','Pool','Parking'], bk: [[8,12],[25,28]] },
  { id: 7, b: 'gramercy', f: '33rd', type: 'Studio', lbl: 'Studio', rate: 800, icon: '🌊', sqm: 26, amenities: ['WiFi','AC'], bk: [[15,17]] },
  { id: 8, b: 'gramercy', f: '56th', type: '3BR', lbl: '3-Bedroom', rate: 2500, icon: '🏰', sqm: 98, amenities: ['WiFi','AC','Pool','Gym','Parking'], bk: [[4,6],[20,24]] },
  { id: 9, b: 'gramercy', f: 'B2', type: 'Parking', lbl: 'Parking', rate: 300, icon: '🚗', sqm: null, amenities: ['24/7 Access','CCTV'], bk: [[10,15]] },
  { id: 10, b: 'gramercy', f: 'B2', type: 'Parking', lbl: 'Parking', rate: 300, icon: '🚗', sqm: null, amenities: ['24/7 Access','CCTV'], bk: [[5,8],[22,25]] },
  { id: 11, b: 'knightsbridge', f: '60th', type: 'Studio', lbl: 'Studio', rate: 900, icon: '🌊', sqm: 30, amenities: ['WiFi','AC','Pool'], bk: [[3,7],[20,22]] },
  { id: 12, b: 'knightsbridge', f: '60th', type: 'Studio', lbl: 'Studio', rate: 900, icon: '🌊', sqm: 30, amenities: ['WiFi','AC','Gym'], bk: [[12,18]] },
  { id: 13, b: 'knightsbridge', f: '69th', type: '1BR', lbl: '1-Bedroom', rate: 1400, icon: '🏠', sqm: 48, amenities: ['WiFi','AC','Pool','Gym'], bk: [[6,10],[25,29]] },
  { id: 14, b: 'milano', f: '43rd', type: '2BR', lbl: '2-Bedroom', rate: 2000, icon: '🏡', sqm: 70, amenities: ['WiFi','AC','Pool','Parking'], bk: [[2,5],[16,20]] },
];

export const AMENITY_ICONS = {
  'WiFi': '📶', 'AC': '❄️', 'Pool': '🏊', 'Gym': '💪',
  'Parking': '🅿️', '24/7 Access': '🔑', 'CCTV': '📹'
};

export const BNAME = {
  gramercy: 'Gramercy Residences',
  knightsbridge: 'Knightsbridge (KBP)',
  milano: 'Milano Residences'
};

export const BSHORT = {
  gramercy: 'Gramercy',
  knightsbridge: 'Knightsbridge',
  milano: 'Milano'
};

export const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

export const MSHORT = [
  'Jan','Feb','Mar','Apr','May','Jun',
  'Jul','Aug','Sep','Oct','Nov','Dec'
];

export const GRAD = {
  Studio: 'g-studio', '1BR': 'g-1br', '2BR': 'g-2br', '3BR': 'g-3br', Parking: 'g-parking'
};

export const TYPE_LABEL = {
  Studio: 'Studio', '1BR': '1-Bedroom', '2BR': '2-Bedroom',
  '3BR': '3-Bedroom', Parking: 'Parking slot'
};

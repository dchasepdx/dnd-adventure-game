import chars from './chars';
const adventureZones =  [];
  
adventureZones[0] = {
  n: 1, //leads to meadow
  enemy: chars.Orc,
  init: 'You approach a cave with bones strewn about the entrance. A giant orc charges you.',
  id: 'orc lair'
};

adventureZones[1] = {
  s: 0, //leads to orc lair
  enemy: false,
  init: 'You\'re in a peaceful meadow. There\'s a trail leading south.',
  id: 'meadow'
};



export default adventureZones;

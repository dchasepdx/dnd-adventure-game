import chars from './chars';
const adventureZones =  [];
  
adventureZones[0] = {
  enemy: chars.Orc,
  init: 'You approach a cave with bones strewn about the entrance.',
  aliveEnemy: 'A giant orc charges you',
  deadEnemy: 'A dead orc lies before you',
  id: 'orc lair',
  n: 1, //leads to meadow
  win: 2 //leads to cave
};

adventureZones[1] = {
  enemy: false,
  init: 'You\'re in a peaceful meadow. There\'s a trail leading south.',
  id: 'meadow',
  s: 0 //leads to orc lair
};

adventureZones[2] = {
  init: 'You\'ve beaten the Orc. Continue south into the cave or north, back to the meadow',
  n: 1, //leads to meadow
  s: 3
};

adventureZones[3] = {
  init: 'You find a cave filled with Treasure! Congratulations',
  n: 1, //leads to meadow
  treasure: true,
};



export default adventureZones;

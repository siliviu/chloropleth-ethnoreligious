export interface Group {
  name: string;
  colour: string;
  wikipage?: string;
}

export const Groups: Group[][] = [
  // ethnicities
  [
    { name: 'Unknown', colour: 'gray' }, // placeholder
    {
      name: 'Romanian',
      colour: '#8d5fd3',
      wikipage: 'https://en.wikipedia.org/wiki/Romanians',
    } /* 1 */,
    {
      name: 'Hungarian',
      colour: '#2ca02c',
      wikipage: 'https://en.wikipedia.org/wiki/Hungarians',
    } /* 2 */,
    {
      name: 'Rromani',
      colour: '#808000',
      wikipage: 'https://en.wikipedia.org/wiki/Romani_people',
    } /* 3 */,
    {
      name: 'Ukrainian',
      colour: '#aade87',
      wikipage: 'https://en.wikipedia.org/wiki/Ukrainians',
    } /* 4 */,
    {
      name: 'German',
      colour: '#ff0000',
      wikipage: 'https://en.wikipedia.org/wiki/Germans',
    } /* 5 */,
    {
      name: 'Turkish',
      colour: '#ff00ff',
      wikipage: 'https://en.wikipedia.org/wiki/Turkish_people',
    } /* 6 */,
    {
      name: 'Russian',
      colour: '#008080',
      wikipage: 'https://en.wikipedia.org/wiki/Russians',
    } /* 7 */,
    {
      name: 'Tatar',
      colour: '#00ffff',
      wikipage: 'https://en.wikipedia.org/wiki/Tatars',
    } /* 8 */,
    {
      name: 'Serbian',
      colour: '#0000ff',
      wikipage: 'https://en.wikipedia.org/wiki/Serbs',
    } /* 9 */,
    {
      name: 'Slovak',
      colour: '#ff6600',
      wikipage: 'https://en.wikipedia.org/wiki/Slovaks',
    } /* 10 */,
    {
      name: 'Bulgarian',
      colour: '#c87137',
      wikipage: 'https://en.wikipedia.org/wiki/Bulgarians',
    } /* 11 */,
    {
      name: 'Croatian',
      colour: '#1a8cff',
      wikipage: 'https://en.wikipedia.org/wiki/Croats',
    } /* 12 */,
    {
      name: 'Greek',
      colour: '#70b6ff',
      wikipage: 'https://en.wikipedia.org/wiki/Greeks',
    } /* 13 */,
    {
      name: 'Italian',
      colour: '#FFFF00',
      wikipage: 'https://en.wikipedia.org/wiki/Italians',
    } /* 14 */,
    {
      name: 'Jewish',
      colour: '#ffcc00',
      wikipage: 'https://en.wikipedia.org/wiki/Jews',
    } /* 15 */,
    {
      name: 'Czech',
      colour: '#ffa200',
      wikipage: 'https://en.wikipedia.org/wiki/Czechs',
    } /* 16 */,
    {
      name: 'Polish',
      colour: '#800080',
      wikipage: 'https://en.wikipedia.org/wiki/Poles',
    } /* 17 */,
    {
      name: 'Chinese',
      colour: '#8B0000',
      wikipage: 'https://en.wikipedia.org/wiki/Han_Chinese',
    } /* 18 */,
    {
      name: 'Armenian',
      colour: '#87B66C',
      wikipage: 'https://en.wikipedia.org/wiki/Armenians',
    } /* 19 */,
    { name: 'Other', colour: '#D3D3D3' } /* 20 */,
    { name: 'Gagauz', colour: '#8a916f' },
  ],
  // religions
  [
    { name: 'Unknown', colour: 'gray' }, // placeholder
    {
      name: 'Eastern Orthodox',
      colour: 'black',
      wikipage: 'https://en.wikipedia.org/wiki/Eastern_Orthodox_Church',
    } /* 1 */,
    {
      name: 'Oriental Orthodox',
      colour: 'N/A',
      wikipage: 'https://en.wikipedia.org/wiki/Oriental_Orthodox_Churches',
    } /* 2 */,
    {
      name: 'Catholic',
      colour: 'red',
      wikipage: 'https://en.wikipedia.org/wiki/Catholic_Church',
    } /* 3 */,
    {
      name: 'Historical Protestant',
      colour: 'green',
      wikipage:
        'https://en.wikipedia.org/wiki/List_of_Christian_denominations_by_number_of_members#Historical_Protestantism_%E2%80%93_300%E2%80%93500_million',
    } /* 4 */,
    {
      name: 'Modern Protestant',
      colour: 'yellow',
      wikipage:
        'https://en.wikipedia.org/wiki/List_of_Christian_denominations_by_number_of_members#Modern_Protestantism_%E2%80%93_400%E2%80%93500_million',
    } /* 5 */,
    {
      name: 'Other Christian',
      colour: 'brown',
      wikipage:
        'https://en.wikipedia.org/wiki/List_of_Christian_denominations_by_number_of_members#Non-trinitarian_Restorationism_%E2%80%93_35_million',
    } /* 6 */,
    {
      name: 'Sunni Islam',
      colour: 'pink',
      wikipage:
        'https://en.wikipedia.org/wiki/Islamic_schools_and_branches#Sunn%C4%AB',
    } /* 7 */,
    {
      name: 'Shia Islam',
      colour: 'N/A',
      wikipage:
        'https://en.wikipedia.org/wiki/Islamic_schools_and_branches#Sh%C4%AB%CA%BFa',
    } /* 8 */,
    {
      name: 'Judaic',
      colour: 'orange',
      wikipage: 'https://en.wikipedia.org/wiki/Judaism',
    } /* 9 */,
    { name: 'Other', colour: '#D3D3D3', wikipage: 'N/A' } /* 10 */,
    { name: 'Not religious', colour: 'gray', wikipage: 'N/A' } /* 11 */,
    { name: 'Buddhist', colour: 'N/A', wikipage: 'N/A' } /* 12 */,
    { name: 'Hinduism', colour: 'N/A', wikipage: 'N/A' } /* 13 */,
  ],
];

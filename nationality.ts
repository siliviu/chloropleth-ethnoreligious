export interface Group {
  name: string;
  colour: string;
  wikipage?: string;
}

export const Groups: Group[][] = [
  // ethnicities
  [
    { name: 'Unknown', colour: 'black' }, // placeholder
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
    { name: 'Gagauz', colour: '#8a916f' } /* 21*/,
    { name: 'Moravian', colour: '##ff8400' } /* 22 */,
    { name: 'Silesian', colour: 'N/A' } /* 23 */,
    { name: 'Albanian', colour: 'N/A' } /* 24 */,
    { name: 'Austrian', colour: 'N/A' } /* 25 */,
    { name: 'Vietnamese', colour: 'N/A' } /* 26 */,
    { name: 'Korean', colour: 'N/A' } /* 27 */,
    { name: 'English', colour: 'N/A' } /* 28 */,
    { name: 'French', colour: 'N/A' } /* 29 */,
    { name: 'Iranian', colour: 'N/A' } /* 30 */,
    { name: 'Irish', colour: 'N/A' } /* 31 */,
    { name: 'Canadian', colour: 'N/A' } /* 32 */,
    { name: 'Macedonian', colour: 'N/A' } /* 33 */,
  ],
  // religions
  [
    { name: 'Unknown', colour: 'black' }, // placeholder
    {
      name: 'Eastern Orthodox',
      colour: '#800080',
      wikipage: 'https://en.wikipedia.org/wiki/Eastern_Orthodox_Church',
    } /* 1 */,
    {
      name: 'Oriental Orthodox',
      colour: '#8d5fd3',
      wikipage: 'https://en.wikipedia.org/wiki/Oriental_Orthodox_Churches',
    } /* 2 */,
    {
      name: 'Catholic',
      colour: '#ff0000',
      wikipage: 'https://en.wikipedia.org/wiki/Catholic_Church',
    } /* 3 */,
    {
      name: 'Historical Protestant',
      colour: '#0000ff',
      wikipage:
        'https://en.wikipedia.org/wiki/List_of_Christian_denominations_by_number_of_members#Historical_Protestantism_%E2%80%93_300%E2%80%93500_million',
    } /* 4 */,
    {
      name: 'Modern Protestant',
      colour: '#00ffff',
      wikipage:
        'https://en.wikipedia.org/wiki/List_of_Christian_denominations_by_number_of_members#Modern_Protestantism_%E2%80%93_400%E2%80%93500_million',
    } /* 5 */,
    {
      name: 'Other Christian',
      colour: '#ff00ff',
      wikipage:
        'https://en.wikipedia.org/wiki/List_of_Christian_denominations_by_number_of_members#Non-trinitarian_Restorationism_%E2%80%93_35_million',
    } /* 6 */,
    {
      name: 'Sunni Islam',
      colour: '#217821',
      wikipage:
        'https://en.wikipedia.org/wiki/Islamic_schools_and_branches#Sunn%C4%AB',
    } /* 7 */,
    {
      name: 'Shia Islam',
      colour: '#37c837',
      wikipage:
        'https://en.wikipedia.org/wiki/Islamic_schools_and_branches#Sh%C4%AB%CA%BFa',
    } /* 8 */,
    {
      name: 'Judaic',
      colour: '#ffcc00',
      wikipage: 'https://en.wikipedia.org/wiki/Judaism',
    } /* 9 */,
    { name: 'Other', colour: '#D3D3D3', wikipage: 'N/A' } /* 10 */,
    { name: 'Not religious', colour: 'gray', wikipage: 'N/A' } /* 11 */,
    { name: 'Buddhist', colour: 'N/A', wikipage: 'N/A' } /* 12 */,
    { name: 'Hinduism', colour: 'N/A', wikipage: 'N/A' } /* 13 */,
  ],
];

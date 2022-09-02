import { adddata } from './customui';
import { readTextFile } from './places';

async function getPlaceId(desc, themap) {
  let service: google.maps.places.PlacesService =
    new google.maps.places.PlacesService(themap);

  return new Promise(async (resolve, reject) => {
    async function go(text) {
      const event = {
        query: text,
        fields: ['place_id'],
        type: ['locality'],
      };
      service.textSearch(
        event,
        (
          results: google.maps.places.PlaceResult[],
          status: google.maps.places.PlacesServiceStatus
        ) => {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            //console.log('e bine ' + text + ' : ' + results[0].place_id);
            adddata(desc + ' : ' + results[0].place_id);
            return 1;
            //resolve();
          } else {
            console.log('nu-i binie aicea ' + text);
            adddata(desc + ' : ' + 'NULL');
            return 0;
            //resolve();
            //alert('nu-i binie');
          }
        }
      );
    }
    go(desc);
    /*
    await new Promise((r) => setTimeout(r, 300));
    go(
      desc.replace('COMUNA', 'COMMUNE').replace(', JUDETUL', ', ') + ' County'
    );
    await new Promise((r) => setTimeout(r, 300));
    go(
      desc.replace('COMUNA', '').replace(', ', ' ADMINISTRATIVE AREA , ') +
        ' County'
    );
    await new Promise((r) => setTimeout(r, 300));
    go(desc.replace('COMUNA', '') + ' County');
    await new Promise((r) => setTimeout(r, 300));
    go(
      desc
        .replace('COMUNA', '')
        .replace('MUNICIPIUL', '')
        .replace('ORAS', '')
        .trim()
    );
    await new Promise((r) => setTimeout(r, 300));
    go(
      desc
        .replace(', ', ', JUDETUL ')
        .replace('COMUNA', '')
        .replace('MUNICIPIUL', '')
        .replace('ORAS', '')
        .trim()
    );
    await new Promise((r) => setTimeout(r, 300));
    go(desc.replace(', ', ', JUDETUL ').trim());
    */
    resolve();
  });
}

async function getPlacesId(text, themap) {
  return new Promise(async (resolve, reject) => {
    let data: Array<string> = JSON.parse(text);
    let x = 0,
      curit = 3,
      ac = 0;
    for (let cur of data) {
      if (x < 0 + 300 * (curit - 1)) {
        ++x;
        continue;
      }
      ++ac;
      await getPlaceId(cur, themap);
      await new Promise((r) => setTimeout(r, 500 + ac / 5));
      console.log(++x);
      if (ac == 300) {
        resolve();
        return;
      }
    }
    resolve();
  });
}

export async function initPlaceId(themap) {
  return new Promise((resolve, reject) => {
    readTextFile('dataconvert.json', async function (text) {
      await getPlacesId(text, themap);
      resolve();
    });
  });
}

//await getPlaceId('Calnic, Alba, Romania', 1);

//await initPlaceId();

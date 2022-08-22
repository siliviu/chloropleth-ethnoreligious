async function getPlaceId(desc, eth) {
  let service: google.maps.places.PlacesService =
    new google.maps.places.PlacesService(map);

  return new Promise(async (resolve, reject) => {
    async function go(text) {
      const event = {
        query: text + ', Romania',
        fields: ['place_id'],
        type: ['administrative_area_level_2'],
      };
      service.textSearch(
        event,
        (
          results: google.maps.places.PlaceResult[],
          status: google.maps.places.PlacesServiceStatus
        ) => {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            convert.set(desc, results[0].place_id!);
            console.log('e bine ' + text);
            return 1;
            //resolve();
          } else {
            console.log('nu-i binie aicea ' + text);
            return 0;
            //resolve();
            //alert('nu-i binie');
          }
        }
      );
    }
    go(desc);
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
    resolve();
  });
}

async function getPlacesId(text) {
  return new Promise(async (resolve, reject) => {
    var data = JSON.parse(text);
    let x = 0,
      curit = 2,
      ac = 0;
    for (let [a, b] of Object.entries(data)) {
      if (x < 0 + 62 * (curit - 1)) {
        ++x;
        continue;
      }
      ++ac;
      convert.set(a, '-1');
      await getPlaceId(a, b);
      await new Promise((r) => setTimeout(r, 350));
      console.log(++x);
      if (ac == 35) {
        resolve();
        return;
      }
    }
    resolve();
  });
}

async function initPlaceId() {
  return new Promise((resolve, reject) => {
    readTextFile('dataconvert.json', async function (text) {
      await getPlacesId(text);
      resolve();
    });
  });
}

//await getPlaceId('Calnic, Alba, Romania', 1);

//await initPlaceId();

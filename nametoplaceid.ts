import { addData } from "./ui";
import { database, readTextFile } from "./repo";

var service: google.maps.places.PlacesService;

async function getPlaceId(desc: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    async function go(text) {
      const event = {
        query: text,
        fields: ["place_id"],
        type: "administrative_area_level_2",
      };
      service.textSearch(event, (results: google.maps.places.PlaceResult[] | null, status: google.maps.places.PlacesServiceStatus) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          console.log("e bine " + text + " : " + results![0].place_id);
          addData(desc + " : " + results![0].place_id);
          database.set(results![0].place_id!, null);
          return 1;
        } else {
          console.log("nu-i binie aicea " + text);
          addData(desc + " : " + "NULL");
          return 0;
        }
      });
    }
    go(desc + ", Bulgaria");
    resolve();
  });
}

async function getPlacesId(text): Promise<void> {
  return new Promise(async (resolve, reject) => {
    let data: Array<string> = JSON.parse(text);
    for (let cur of data) {
      await getPlaceId(cur);
      // await new Promise((r) => setTimeout(r, 200));
    }
    resolve();
  });
}

export async function initPlaceId(themap): Promise<void> {
  service = new google.maps.places.PlacesService(themap);
  return new Promise((resolve, reject) => {
    readTextFile("dataconvert.json", async function (text) {
      await getPlacesId(text);
      resolve();
    });
  });
}

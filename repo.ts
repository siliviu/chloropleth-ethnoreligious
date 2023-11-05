import type { PlaceData, Group, TransferData, DataSet } from "./domain";
import { addData } from "./ui";

export var database: Map<string, PlaceData | null> = new Map();
export var Groups: Array<Array<Group>> = new Array();

export function readTextFile(file: string, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == 200) {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}

function processData(file: string) {
  readTextFile(file, function (text) {
    var data: Array<TransferData> = JSON.parse(text);
    var finaldata: Array<TransferData> = new Array();
    for (let x of data) {
      let finalarray: Array<Array<[number, number]>> = new Array();
      for (let groupsA of x.groups) {
        let newarray: Array<[number, number]> = new Array();
        let indices: Array<number> = [],
          cnt: number = 0,
          others = groupsA[groupsA.length - 2][1],
          unknown = groupsA[groupsA.length - 1][1];
        for (let i = 0; i < groupsA.length - 2; ++i) indices.push(i);
        indices.sort((a, b) => groupsA[b][1] - groupsA[a][1]);

        for (let i = 0; i < groupsA.length - 2; ++i)
          if (cnt < 5 && groupsA[indices[i]][1] / x.population >= 0.001 * Math.max(1, 0.6 * cnt))
            ++cnt, newarray.push([groupsA[indices[i]][0], groupsA[indices[i]][1]]);
          else others += groupsA[indices[i]][1];
        if (others != 0) newarray.push([groupsA[groupsA.length - 2][0], others]);
        if (unknown != 0) newarray.push([0, unknown]);
        finalarray.push(newarray);
      }
      let cur: TransferData = {
        placeId: x.placeId,
        population: x.population,
        groups: finalarray,
      };
      finaldata.push(cur);
    }
    addData(JSON.stringify(finaldata));
  });
}

export function initData() {
  readTextFile("files/ethnicities.json", function (text) {
    var gr: Array<Group> = JSON.parse(text);
    Groups.push(gr);
    readTextFile("files/religions.json", function (text) {
      var gr: Array<Group> = JSON.parse(text);
      Groups.push(gr);
    });
  });
  // readTextFile("datatest.json", function (text) {
  //   var sets: Array<string> = JSON.parse(text);
  //   for (let set of sets) database.set(set, null);
  // });
  readTextFile("files/datasets.json", function (text) {
    var sets: Array<DataSet> = JSON.parse(text);
    for (let set of sets)
      readTextFile("files/" + set.fileName, function (text) {
        var data: Array<TransferData> = JSON.parse(text);
        for (let x of data) {
          let a: string = x.placeId,
            b: PlaceData = {
              population: x.population,
              groups: x.groups,
            };
          database.set(a, b);
        }
      });
  });
  // processData("dataconvert.json");
}
export { PlaceData };

import { adddata } from './customui';

export interface UseData {
  population: number;
  ethnicGroups: Array<[number, number]>;
}

export interface ExportData {
  placeId: string;
  population: number;
  ethnicmajority: number;
  ethnicGroups: Array<[number, number]>;
}

export var database: Map<string, BestUseData> = new Map();

export function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType('application/json');
  rawFile.open('GET', file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == 200) {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}

/*
export interface ReadData {
  placeId: string;
  population: number;
  groups: Array<[number, number]>;
}
*/
export interface BestData {
  placeId: string;
  population: number;
  groups: Array<Array<[number, number]>>;
}
export interface BestUseData {
  population: number;
  groups: Array<Array<[number, number]>>;
}

export function initData() {
  /*
  readTextFile('dataid.json', function (text) {
    var data = JSON.parse(text);
    for (let [a, b] of Object.entries(data)) Dictionary.set(a, b);
  });*/
  /*
  readTextFile('databasero.json', function (text) {
    var data: Array<ExportData> = JSON.parse(text);
    for (let x of data) {
      let a: string = x.placeId,
        b: UseData = {
          population: x.population,
          ethnicGroups: x.ethnicGroups,
        };
      database.set(a, b);
    }
  });
  */
  readTextFile('databasesk.json', function (text) {
    var data: Array<BestData> = JSON.parse(text);
    for (let x of data) {
      let a: string = x.placeId,
        b: BestUseData = {
          population: x.population,
          groups: x.groups,
        };
      database.set(a, b);
    }
  });
}

/*
  readTextFile('databasesk.json', function (text) {
    var data: Array<BestData> = JSON.parse(text);
    var finaldata: Array<BestData> = new Array();
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
          if (
            cnt < 5 &&
            groupsA[indices[i]][1] / x.population >=
              0.001 * Math.max(1, 0.6 * cnt)
          )
            ++cnt,
              newarray.push([groupsA[indices[i]][0], groupsA[indices[i]][1]]);
          else others += groupsA[indices[i]][1];
        if (others != 0)
          newarray.push([groupsA[groupsA.length - 2][0], others]);
        if (unknown != 0) newarray.push([0, unknown]);
        finalarray.push(newarray);
      }
      let cur: BestData = {
        placeId: x.placeId,
        population: x.population,
        groups: finalarray,
      };
      finaldata.push(cur);
      // console.log(JSON.stringify(cur));
      //adddata(JSON.stringify(cur));
    }
    adddata(JSON.stringify(finaldata));
  });
  */

/*
readTextFile('testdata.json', function (text) {
  var data = JSON.parse(text);
  for (let [a, b] of Object.entries(data)) {
    const [c, d] = Object.entries(b);
    const [e, f] = c;
    const [g, h] = d;
    let cur: ReadData = {
      placeId: a,
      population: h[0],
      majority: f,
      ethnicGroups: h.slice(1),
    };
    cur.ethnicGroups[1] += cur.ethnicGroups[19];
    cur.ethnicGroups[19] = 0;
    let total = cur.population,
      others = cur.ethnicGroups[21],
      unknown = cur.ethnicGroups[22];
    let indices: Array<number> = [];
    for (let i = 0; i <= 20; ++i) indices.push(i);
    indices.sort((a, b) => cur.ethnicGroups[b] - cur.ethnicGroups[a]);
    let cnt = 0,
      newarray: Array<[number, number]> = [];
    for (let i = 0; i <= 20; ++i)
      if (
        cnt < 5 &&
        cur.ethnicGroups[indices[i]] / total >= 0.001 * Math.max(1, 0.6 * cnt)
      )
        ++cnt, newarray.push([1 + indices[i], cur.ethnicGroups[indices[i]]]);
      else others += cur.ethnicGroups[indices[i]];
    if (others != 0) newarray.push([20, others]);
    if (unknown != 0) newarray.push([0, unknown]);
    let ac: ExportData = {
      placeId: cur.placeId,
      population: cur.population,
      ethnicmajority: cur.majority,
      ethnicGroups: newarray,
    };
    //console.log(newarray);
    //console.log(JSON.stringify(cur));
    //console.log(JSON.stringify(ac));
    adddata(JSON.stringify(ac));
    //console.log(a, f, h);
  }
});
*/

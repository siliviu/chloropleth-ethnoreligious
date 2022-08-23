import { Nationality, Nationalities } from './nationality';
import {
  initUIpre,
  initUIpost,
  legendList,
  legendControl,
  UpdateLegend,
  InfoWindow,
  adddata,
} from './customui';

import { UseData, database, initData } from './places';
/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

export enum DataMode {
  ETHNICITY = 'Ethnic',
  RELIGION = 'Religious',
}

export var featureLayer,
  featureLayer2,
  featureLayerc,
  IdList = new Set(),
  Dictionary = new Map(),
  map: google.maps.Map,
  currentMode: DataMode = DataMode.ETHNICITY;

//@ts-ignore
async function initMap() {
  map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
    center: { lat: 46.09431401990664, lng: 24.80469314752579 },
    zoom: 8,
    mapId: '1bf5295b744a394a',
  });

  //@ts-ignore
  featureLayer = map.getFeatureLayer(
    google.maps.FeatureType.ADMINISTRATIVE_AREA_LEVEL_2
  );
  featureLayer2 = map.getFeatureLayer(google.maps.FeatureType.LOCALITY);
  featureLayerc = map.getFeatureLayer(google.maps.FeatureType.COUNTRY);

  initUIpre();
  featureLayer.addListener('click', handleClick);
  featureLayer2.addListener('click', handleClick);
  featureLayerc.addListener('click', handleClick);

  featureLayer.style = (placeFeature) => handleLayerStyle(placeFeature);
  featureLayer2.style = (placeFeature) => handleLayerStyle(placeFeature);
  featureLayerc.style = (placeFeature) => handleLayerStyle(placeFeature);
  featureLayer.addListener('removefeature', function (feature) {
    alert('ha');
  });

  map.addListener('bounds_changed', () => {});

  map.addListener('tilesloaded', () => {
    console.log('triggered');
    UpdateLegend(legendControl, map);
  });
  initUIpost(map);
}

export function handleLayerStyle(placeFeature, placeId?) {
  let name: String = placeFeature.feature.displayName,
    id = placeFeature.feature.placeId,
    temp = database.get(id),
    ethnicity: number,
    style: google.maps.FeatureStyleOptions;
  /* 
  if (name == 'Germany') ethnicity = Nationalities[5];
  else if (name == 'Hungary') ethnicity = Nationalities[2];
  else if (name == 'Bulgaria') ethnicity = Nationalities[11];
  else if (name == 'Serbia') ethnicity = Nationalities[9];
  else if (name == 'Turkey') ethnicity = Nationalities[6]; 
  else if (name == 'Moldova') ethnicity = Nationalities[1];
  else if (name == 'Croatia') ethnicity = Nationalities[12];
  else if (name == 'Poland') ethnicity = Nationalities[17];
  */
  if (Dictionary.has(id)) {
    if (name == 'ChIJSd0LbsH0PkcRWCztriYLb8U') alert(name);
    IdList.add(id);
    console.log(name);
    return {
      fillColor: 'black',
      fillOpacity: 1,
    };
  }
  if (typeof temp == 'undefined') {
  } else {
    ethnicity = temp.ethnicGroups[0][0];
    legendList.add(ethnicity);
    style = {
      fillColor: Nationalities[ethnicity].colour,
      fillOpacity: 0.75,
    };
    if (placeId && placeId == id) {
      style = {
        ...style,
        strokeColor: 'black',
        strokeOpacity: 1.0,
        strokeWeight: 1.0,
      };
    }
  }
  return style;
}

export function handleClick(event) {
  let feature = event.features[0];
  if (!feature.placeId) return;
  console.log(feature.displayName);
  featureLayer.style = (placeFeature) =>
    handleLayerStyle(placeFeature, feature.placeId);
  featureLayer2.style = (placeFeature) =>
    handleLayerStyle(placeFeature, feature.placeId);
  featureLayerc.style = (placeFeature) =>
    handleLayerStyle(placeFeature, feature.placeId);
  InfoWindow(map, feature, event);
}

initData();

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};

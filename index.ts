import { Groups } from './nationality';
import {
  initUIpre,
  initUIpost,
  legendList,
  legendControl,
  UpdateLegend,
  InfoWindow,
} from './customui';

import { database, initData } from './places';
/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

export enum DataMode {
  Ethnic,
  Religious,
}

export enum ViewMode {
  MAJ,
  SEC,
}

export var featureLayer,
  featureLayer2,
  featureLayerc,
  map: google.maps.Map,
  currentViewMode: ViewMode = ViewMode.MAJ,
  currentDataMode: DataMode = DataMode.Ethnic;

//@ts-ignore
async function initMap() {
  map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
    center: { lat: 46.09431401990664, lng: 24.80469314752579 },
    zoom: 8,
    mapId: '1bf5295b744a394a',
    mapTypeControl: false,
    streetViewControl: false,
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

  map.addListener('changeView', () => {
    currentViewMode ^= 1;
    legendList.clear();
    featureLayer.style = (placeFeature) => handleLayerStyle(placeFeature);
    featureLayer2.style = (placeFeature) => handleLayerStyle(placeFeature);
    featureLayerc.style = (placeFeature) => handleLayerStyle(placeFeature);
  });
  map.addListener('changeData', () => {
    currentDataMode ^= 1;
    legendList.clear();
    featureLayer.style = (placeFeature) => handleLayerStyle(placeFeature);
    featureLayer2.style = (placeFeature) => handleLayerStyle(placeFeature);
    featureLayerc.style = (placeFeature) => handleLayerStyle(placeFeature);
  });

  map.addListener('tilesloaded', () => {
    UpdateLegend(legendControl, map, currentDataMode);
  });

  initUIpost(map);
}

export function handleLayerStyle(placeFeature, placeId?) {
  let name: String = placeFeature.feature.displayName,
    id = placeFeature.feature.placeId,
    temp = database.get(id),
    group: number,
    style: google.maps.FeatureStyleOptions;
  if (typeof temp == 'undefined') {
  } else {
    group = temp.groups[Math.min(currentDataMode, 1)][currentViewMode][0];
    legendList.add(group);
    style = {
      fillColor: Groups[currentDataMode][group].colour,
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
  featureLayer.style = (placeFeature) =>
    handleLayerStyle(placeFeature, feature.placeId);
  featureLayer2.style = (placeFeature) =>
    handleLayerStyle(placeFeature, feature.placeId);
  featureLayerc.style = (placeFeature) =>
    handleLayerStyle(placeFeature, feature.placeId);
  InfoWindow(map, feature, event, currentDataMode);
}

initData();

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;

export {};

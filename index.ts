import { initUIpost, legendList, legendControl, updateLegend, showInfoWindow as showInfoWindow, initUIpre } from "./ui";

import { database, initData, Groups } from "./repo";
import { DataMode, ViewMode } from "./domain";
import { initPlaceId } from "./nametoplaceid";

export var featureLayers: Array<google.maps.FeatureLayer> = new Array(),
  map: google.maps.Map,
  currentOpacityMode: number = 0,
  currentViewMode: ViewMode = ViewMode.MAJ,
  currentDataMode: DataMode = DataMode.Ethnic,
  currentFocus: number;

//@ts-ignore
async function initMap() {
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: { lat: 46.09431401990664, lng: 24.80469314752579 },
    zoom: 8,
    mapId: "1bf5295b744a394a",
    mapTypeControl: false,
    clickableIcons: false,
    streetViewControl: false,
  });

  //@ts-ignore
  let featureConfig: Array<google.maps.FeatureType> = [
    google.maps.FeatureType.ADMINISTRATIVE_AREA_LEVEL_2,
    google.maps.FeatureType.LOCALITY,
    google.maps.FeatureType.ADMINISTRATIVE_AREA_LEVEL_1,
  ];
  for (let config of featureConfig) featureLayers.push(map.getFeatureLayer(config));
  initUIpre();
  for (let featureLayer of featureLayers) {
    featureLayer.addListener("click", handleClick);
    featureLayer.style = (placeFeature) => handleLayerStyle(placeFeature);
  }

  map.addListener("change", (type: string, nr: number) => {
    if (type == "Opacity") currentOpacityMode ^= 1;
    else {
      legendList.clear();
      if (type == "View") {
        if (currentViewMode == ViewMode.FOC) currentViewMode = ViewMode.MAJ;
        else currentViewMode ^= 1;
      } else if (type == "Data") {
        if (currentViewMode == ViewMode.FOC) currentViewMode = ViewMode.MAJ;
        currentDataMode ^= 1;
      } else if (type == "Focus") {
        if (currentViewMode == ViewMode.FOC) currentViewMode = ViewMode.MAJ;
        else {
          currentViewMode = ViewMode.FOC;
          currentFocus = nr;
        }
      }
    }
    for (let featureLayer of featureLayers) featureLayer.style = (placeFeature) => handleLayerStyle(placeFeature);
    setTimeout(() => {
      updateLegend(map, legendControl, currentDataMode);
    }, 100);
  });

  map.addListener("tilesloaded", () => {
    updateLegend(map, legendControl, currentDataMode);
  });

  initUIpost(map);
  // await initPlaceId(map);
}

export function handleLayerStyle(placeFeature, placeId?) {
  let id = placeFeature.feature.placeId,
    data = database.get(id),
    style: google.maps.FeatureStyleOptions;
  if (typeof data == "undefined") return null;
  else if (data == null || (currentViewMode != ViewMode.FOC && data.groups[currentDataMode].length <= currentViewMode)) {
    style = {
      fillColor: "black",
      fillOpacity: 1,
    };
    return style;
  }
  var group;
  if (currentViewMode == ViewMode.FOC) {
    for (let [id, nr] of data.groups[currentDataMode]) if (id == currentFocus) group = [id, nr];
    if (group == undefined) return;
  } else group = data.groups[currentDataMode][currentViewMode];
  legendList.add(group[0]);
  style = {
    fillColor: Groups[currentDataMode][group[0]].colour,
    fillOpacity:
      currentViewMode == ViewMode.FOC
        ? Math.max(0.125, (2.5 * group[1]) / data.population)
        : currentOpacityMode
        ? Math.max(0.15, ((currentViewMode == ViewMode.SEC ? 2.25 : 1) * group[1]) / data.population)
        : 0.75,
  };
  if (placeId && placeId == id) {
    style = {
      ...style,
      strokeColor: "black",
      strokeOpacity: 1.0,
      strokeWeight: 2.0,
    };
  }
  return style;
}

export function handleClick(event) {
  let feature = event.features[0];
  if (!feature.placeId) return;
  for (let featureLayer of featureLayers) featureLayer.style = (placeFeature) => handleLayerStyle(placeFeature, feature.placeId);
  showInfoWindow(map, feature, event, currentDataMode);
}

initData();

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;

export {};

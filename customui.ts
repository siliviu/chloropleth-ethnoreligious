import { Groups } from './nationality';
import { DataMode } from './index';
import { BestUseData, database } from './places';
import {
  checkBox,
  dropDownControl,
  dropDownOptionsDiv,
  optionDiv,
} from './options';

export var infoWindow: google.maps.InfoWindow,
  data: string = '',
  convert = new Map(),
  legendList: Set<number> = new Set<number>([]),
  legendControl,
  okupdate = 1,
  srv: google.maps.places.PlacesService;

export function adddata(a) {
  data += a;
  data += '\n\n';
  //data += '"' + a + '":' + b + ',\n';
  console.log(a);
}

export function download() {
  // alert(currentViewMode);
  //for (let [a, b] of convert) adddata(a, b);
  let a = document.createElement('a');
  a.href = 'data:application/octet-stream,' + encodeURIComponent(data);
  a.download = 'file.txt';
  a.click();
  data = '';
}

function CenterControl(controlDiv: HTMLDivElement, map: google.maps.Map) {
  // Set CSS for the control border.
  const controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 2px rgba(0,0,0,.2)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginTop = '8px';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to download data';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  const controlText = document.createElement('div');

  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Download data';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', () => {
    download();
  });
}

function LegendControl(legendDiv: HTMLDivElement, map: google.maps.Map) {
  legendDiv.style.fontFamily = 'Arial, sans-serif';
  legendDiv.style.background = '#fff';
  legendDiv.style.padding = '10px';
  legendDiv.style.margin = '10px';
  //legendDiv.style.border = '1px solid #000';
  legendDiv.style.border = '2px solid #fff';
  legendDiv.style.borderRadius = '3px';
  legendDiv.style.boxShadow = '0 2px 2px rgba(0,0,0,.2)';
  const controlTitle = document.createElement('h2');
  controlTitle.style.marginTop = '0';
  controlTitle.setAttribute('id', 'title');
  legendDiv.appendChild(controlTitle);
  legendDiv.setAttribute('id', 'legend');
}

export function UpdateLegend(
  legendDiv: HTMLDivElement,
  map: google.maps.Map,
  currentDataMode: DataMode
) {
  if (!okupdate) return;
  okupdate = 0;
  legendDiv.childNodes[0].innerText = DataMode[currentDataMode] + ' Group';
  let firstchild = legendDiv.childNodes[0];
  legendDiv.replaceChildren();
  legendDiv.appendChild(firstchild);
  for (let a of legendList) {
    var cur = document.createElement('div');
    var box = document.createElement('div');
    box.style.verticalAlign = 'middle';
    box.style.display = 'inline-block';
    box.style.width = '15px';
    box.style.height = '15px';
    box.style.border = '1px solid black';
    box.style.marginRight = '5px';
    box.style.background = Groups[currentDataMode][a].colour;
    cur.appendChild(box);
    var text = document.createElement('a');
    text.textContent = Groups[currentDataMode][a].name;
    text.href = Groups[currentDataMode][a].wikipage;
    text.target = '_blank';
    text.style.fontSize = '15px';
    text.style.verticalAlign = 'top';
    text.style.textDecoration = 'none';
    text.style.color = 'black';
    cur.style.marginBottom = '3px';
    cur.appendChild(text);
    legendDiv.appendChild(cur);
  }
  console.log(legendDiv.children.length - 1);
  okupdate = 1;
}

export function initUIpre() {
  infoWindow = new google.maps.InfoWindow({});
}

export function InfoWindow(
  map: google.maps.Map,
  feature,
  event,
  currentDataMode: DataMode
) {
  const request = {
    placeId: feature.placeId,
  };
  let placename: string | undefined;
  srv.getDetails(request, function (_place, status) {
  let place: BestUseData = database.get(feature.placeId)!;
  let content = `<span style="font-size:small">Name: ${_place.name}
    <br/> Population: ${place.population}
    <div style="margin-top:5px">
    <span style="font-size:15px; font-weight:bold; "> ${
      DataMode[currentDataMode] + ' Composition'
    }:</span>`;
  for (let [a, b] of place.groups[currentDataMode]) {
    content += `  
    <div style="margin-bottom:1px">
    <div style="display:inline-block; width:12px; height:12px; background:${Groups[currentDataMode][a].colour};vertical-align:middle; margin-right:5px; border:1px solid black"> </div>`;
    content += `<a style="vertical-align:middle; color:black; font-size:12px">${
      Groups[currentDataMode][a].name
    } : ${b} (${Math.floor((b / place.population) * 10000) / 100}%) </a>`;
    content += '</div>';
  }
  content += `
  </div>
  </span>`;
  updateInfoWindow(map, content, event.latLng);
  });
}

export function updateInfoWindow(map, content, center) {
  infoWindow.setContent(content);
  infoWindow.setPosition(center);
  infoWindow.open({
    map,
    shouldFocus: false,
  });
}

export function initUIpost(themap) {
  const centerControlDiv = document.createElement('div');
  CenterControl(centerControlDiv, themap);
  legendControl = document.createElement('div');
  LegendControl(legendControl, themap);
  const option = optionDiv({
    name: 'Toggle: Majority / Second largest',
    action: () => {
      google.maps.event.trigger(themap, 'change', 'View');
    },
  });
  const option2 = optionDiv({
    name: 'Switch between Ethnic / Religious',
    action: () => {
      google.maps.event.trigger(themap, 'change', 'Data');
    },
  });
  const option3 = checkBox({
    label: 'Opacity scale',
    action: () => {
      google.maps.event.trigger(themap, 'change', 'Opacity');
    },
  });
  const dropDownDiv = dropDownOptionsDiv({
    items: [option3, option, option2],
    id: 'myddOptsDiv',
  });
  const test = dropDownControl({
    name: 'Options',
    id: 'ddControl',
    dropDown: dropDownDiv,
  });
  themap.controls[google.maps.ControlPosition.TOP_LEFT].push(test);
  themap.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legendControl);
  themap.controls[google.maps.ControlPosition.TOP_CENTER].push(
    centerControlDiv
  );
  srv = new google.maps.places.PlacesService(themap);
}


import { DataMode } from "./domain";
import { database, Groups, PlaceData } from "./repo";
import { checkBox, dropDownControl, dropDownOptionsDiv, optionDiv, button } from "./controls";
import { currentFocus } from ".";

export var infoWindow: google.maps.InfoWindow,
  data: string = "",
  convert = new Map(),
  legendList: Set<number> = new Set<number>([]),
  legendControl,
  srv: google.maps.places.PlacesService;

export function addData(a) {
  data += a;
  data += "\n\n";
  console.log(a);
}

export function download() {
  let a = document.createElement("a");
  a.href = "data:application/octet-stream," + encodeURIComponent(data);
  a.download = "file.txt";
  a.click();
  data = "";
}

function legendDiv() {
  var legendDiv = document.createElement("div");
  legendDiv.style.fontFamily = "Arial, sans-serif";
  legendDiv.style.background = "#fff";
  legendDiv.style.padding = "10px";
  legendDiv.style.margin = "10px";
  legendDiv.style.border = "2px solid #fff";
  legendDiv.style.borderRadius = "3px";
  legendDiv.style.boxShadow = "0 2px 2px rgba(0,0,0,.2)";
  const controlTitle = document.createElement("h2");
  controlTitle.style.marginTop = "0";
  controlTitle.setAttribute("id", "title");
  legendDiv.appendChild(controlTitle);
  legendDiv.setAttribute("id", "legend");
  return legendDiv;
}

export function updateLegend(map, legendDiv: HTMLDivElement, currentDataMode: DataMode) {
  //@ts-ignore
  legendDiv.childNodes[0].innerText = DataMode[currentDataMode] + " Group";
  let firstchild = legendDiv.childNodes[0];
  legendDiv.replaceChildren();
  legendDiv.appendChild(firstchild);
  for (let a of legendList) {
    var cur = document.createElement("div");
    var box = document.createElement("div");
    box.style.verticalAlign = "middle";
    box.style.display = "inline-block";
    box.style.width = "15px";
    box.style.height = "15px";
    box.style.border = "1px solid black";
    box.style.marginRight = "5px";
    box.style.background = Groups[currentDataMode][a].colour;
    box.addEventListener("click", function () {
      google.maps.event.trigger(map, "change", "Focus", a);
    });
    cur.appendChild(box);
    var text = document.createElement("a");
    text.textContent = Groups[currentDataMode][a].name;
    text.href = Groups[currentDataMode][a].wikipage;
    text.target = "_blank";
    text.style.fontSize = "15px";
    text.style.verticalAlign = "top";
    text.style.textDecoration = "none";
    text.style.color = "black";
    cur.style.marginBottom = "3px";
    cur.appendChild(text);
    legendDiv.appendChild(cur);
  }
}

export function initUIpre() {
  infoWindow = new google.maps.InfoWindow({});
}

export function showInfoWindow(map: google.maps.Map, feature, event, currentDataMode: DataMode) {
  const request = {
    placeId: feature.placeId,
  };
  srv.getDetails(request, function (_place, status) {
    let place: PlaceData = database.get(feature.placeId)!;
    let content = `<span style="font-size:small">Name: ${_place!.name}
    <br/> Population: ${place.population}
    <div style="margin-top:5px">
    <span style="font-size:15px; font-weight:bold; "> ${DataMode[currentDataMode] + " Composition"}:</span>`;
    for (let [a, b] of place.groups[currentDataMode]) {
      content += `  
    <div style="margin-bottom:1px">
    <div style="display:inline-block; width:12px; height:12px; background:${Groups[currentDataMode][a].colour};vertical-align:middle; margin-right:5px; border:1px solid black"> </div>`;
      content += `<a style="vertical-align:middle; color:black; font-size:12px">${Groups[currentDataMode][a].name} : ${b} (${
        Math.floor((b / place.population) * 10000) / 100
      }%) </a>`;
      content += "</div>";
    }
    content += `
  </div>
  </span>`;
    infoWindow.setContent(content);
    infoWindow.setPosition(event.latLng);
    infoWindow.open({
      map,
      shouldFocus: false,
    });
  });
}

export function initUIpost(map) {
  legendControl = legendDiv();
  const option = optionDiv({
    name: "Toggle: Majority / Second largest",
    action: () => {
      google.maps.event.trigger(map, "change", "View");
    },
  });
  const option2 = optionDiv({
    name: "Switch between Ethnic / Religious",
    action: () => {
      google.maps.event.trigger(map, "change", "Data");
    },
  });
  const option3 = checkBox({
    label: "Opacity scale",
    action: () => {
      google.maps.event.trigger(map, "change", "Opacity");
    },
  });
  const dropDownDiv = dropDownOptionsDiv({
    items: [option3, option, option2],
    id: "myddOptsDiv",
  });
  const dropDown = dropDownControl({
    name: "Options",
    id: "ddControl",
    dropDown: dropDownDiv,
  });
  const centreButton = button({
    text: "Download data",
    title: "Click to download data",
    action: download,
  });
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(dropDown);
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legendControl);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centreButton);
  srv = new google.maps.places.PlacesService(map);
}

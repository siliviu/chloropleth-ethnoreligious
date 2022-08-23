// http://vislab-ccom.unh.edu/~briana/examples/gdropdown/gdropdown.js
export function optionDiv(options) {
  var control = document.createElement('div');
  control.className = 'dropDownItemDiv';
  control.title = options.title;
  control.id = options.id;
  control.innerHTML = options.name;
  control.addEventListener('click', options.action);
  return control;
}

export function checkBox(options) {
  var container = document.createElement('div');
  container.className = 'checkboxContainer';
  container.title = options.title;

  var span = document.createElement('span');
  span.role = 'checkbox';
  span.className = 'checkboxSpan';

  var bDiv = document.createElement('div');
  bDiv.className = 'blankDiv';
  bDiv.id = options.id;

  var image = document.createElement('img');
  image.className = 'blankImg';
  image.src = 'http://maps.gstatic.com/mapfiles/mv/imgs8.png';

  var label = document.createElement('label');
  label.className = 'checkboxLabel';
  label.innerHTML = options.label;

  bDiv.appendChild(image);
  span.appendChild(bDiv);
  container.appendChild(span);
  container.appendChild(label);

  container.addEventListener('click', function () {
    document.getElementById(bDiv.id).style.display == 'block'
      ? (document.getElementById(bDiv.id).style.display = 'none')
      : (document.getElementById(bDiv.id).style.display = 'block');
    options.action();
  });
  return container;
}
export function separator() {
  var sep = document.createElement('div');
  sep.className = 'separatorDiv';
  return sep;
}

export function dropDownOptionsDiv(options) {
  var container = document.createElement('div');
  container.className = 'dropDownOptionsDiv';
  container.id = options.id;

  for (let x of options.items) container.appendChild(x);

  return container;
}

export function dropDownControl(options) {
  var container = document.createElement('div');
  container.className = 'container';

  var control = document.createElement('div');
  control.className = 'dropDownControl';
  control.innerHTML = options.name;
  control.id = options.name;
  const arrow = document.createElement('img');
  arrow.src = 'http://maps.gstatic.com/mapfiles/arrow-down.png';
  arrow.className = 'dropDownArrow';
  control.appendChild(arrow);
  container.appendChild(control);
  container.appendChild(options.dropDown);

  container.addEventListener('click', function () {
    document.getElementById('myddOptsDiv').style.display == 'block'
      ? (document.getElementById('myddOptsDiv').style.display = 'none')
      : (document.getElementById('myddOptsDiv').style.display = 'block');
    setTimeout(function () {
      document.getElementById('myddOptsDiv').style.display = 'none';
    }, 1500);
  });
  return container;
}

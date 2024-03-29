# chloropleth-ethnoreligious
Interactiv map displaying ethnic/religious composition for Central/Eastern European countries. Developed using TypeScript & Google Maps API.

Interact with the map, and discover the ethnic/religious composition of different places.
<img width="1280" alt="Screenshot 2023-11-05 210302" src="https://github.com/siliviu/chloropleth-ethnoreligious/assets/24477832/270ce14e-84e4-494d-9ec4-c96bdfb5ff7f">
<img width="1280" alt="Screenshot 2023-11-05 210324" src="https://github.com/siliviu/chloropleth-ethnoreligious/assets/24477832/12b92bba-4807-4dcb-9060-d0ed7d06bff3">

You can also choose to see second largest group, the legend updating accordingly. You can click on the name of a group to see its Wikipedia page.
<img width="1280" alt="Screenshot 2023-11-05 210454" src="https://github.com/siliviu/chloropleth-ethnoreligious/assets/24477832/a0edc55a-d26a-434d-a526-92454dbbb8c7">

Explore the borders between regions and make use of the option to display the colours with opacities reflecting their relative majority.
<img width="1280" alt="Screenshot 2023-11-05 210405" src="https://github.com/siliviu/chloropleth-ethnoreligious/assets/24477832/5b9d1c5d-f64c-4540-bd8a-8fa6f824986c">

You can also click on a place to see its name, population and detailed ethnic/religious composition.
<img width="1280" alt="Screenshot 2023-11-05 210527" src="https://github.com/siliviu/chloropleth-ethnoreligious/assets/24477832/d728b213-949c-4b75-9df9-1c8dd258fb71">

There's also an option to highlight a specific group if you click the box corresponding to it on the legend.
<img width="1280" alt="Screenshot 2023-11-05 210555" src="https://github.com/siliviu/chloropleth-ethnoreligious/assets/24477832/382ced48-daf3-4471-9ab4-0fa0f6caab28">

Disclaimers:
* This is made for map enthusiasts with the purpose of embracing diversity and knowledge.
* The data is taken from official censues and any potential mistakes are purely accidental.
* Some (arbitrary) conventions have been made as to what is considered a separate ethnic/religious group and what isn't (eg. Ruthenians are considered Ukrainians, religion grouping, etc.).

The initial goal was to extend the map to all of Europe but I am limited by available census data (http://pop-stat.mashke.org/ aggregates a lot of results for example) and by Google Maps Regions especially (https://developers.google.com/maps/documentation/javascript/dds-boundaries/coverage). There are countries I would love to add, but the regions available for them by the API would be too big to be meaningful.

You can run this yourself by cloning the repo and doing `npm install && npm start` once you've created an `.env` file with a Google Maps API Key (`VITE_GOOGLE_MAPS_API_KEY= [YOUR KEY]`).

const Pbf = require("pbf");
const fs = require("fs");
const path = require("path");

var pbf = new Pbf(
  fs.readFileSync(
    path.join(
      __dirname,
      "https://github.com/zeke/all-the-cities/raw/master/cities.pbf"
    )
  )
);
var cities = [];

while (pbf.pos < pbf.length) {
  cities.push(
    pbf.readMessage(readCity, {
      name: "",
      country: "",
      featureCode: "",
      adminCode: "",
      population: 0,
      lat: 0,
      lon: 0
    })
  );
}

fs.writeFileSync(
  "./cities.json",
  JSON.stringify(
    cities
      .filter(x => x.population > 100000)
      .map(({ lat, lon, name, country }) => ({ lat, lon, name, country }))
  )
);

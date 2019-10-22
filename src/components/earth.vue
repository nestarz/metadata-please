<template>
  <svg ref="svgRef" />
</template>

<style>
svg {
  width: 100%;
  height: 110px;
}

.land {
  fill: rgba(0, 0, 0, 0.12);
}

.border {
  stroke: rgba(255, 255, 255, 0.7);
  fill: none;
}
</style>

<script>
module.exports = {
  setup(props, { emit }) {
    const svgRef = ref(null);
    const coord = ref([]);
    const dragended = ref(true);
    const topojson_path = "/assets/json/world-110m.json";

    const test = async () => {
      const svg = svgRef.value;
      const d3 = await import("/web_modules/d3.js");
      const topojson = await import("/web_modules/topojson.js");
      const { eulerAngles } = await import("/src/utils/math.js");
      const width = svg.clientWidth;
      const height = svg.clientHeight;
      const r = 250;

      const projection = d3
        .geoMercator()
        .scale(70)
        .translate([width / 2, height / 2 + 40])
        //        .clipAngle(90)
        .precision(1);

      const path = d3.geoPath(projection);

      const graticule = d3.geoGraticule().step([10, 10]);
      d3.select(svg)
        .append("path")
        .datum(graticule)
        .attr("class", "graticule")
        .attr("d", path)
        .style("fill", "none")
        .style("stroke", "rgba(0,0,0,0.05)");

      const dragger = () => {
        let gpos0, o0;
        return {
          dragstarted() {
            dragended.value = false;
            d3.select(svg)
              .selectAll(".point")
              .remove();
            gpos0 = projection.invert(d3.mouse(this));
            coord.value = gpos0;
            o0 = projection.rotate();
            d3.select(svg)
              .insert("path")
              .datum({ type: "Point", coordinates: gpos0 })
              .attr("class", "point")
              .attr("d", path);
          },
          dragged() {
            const [x, y] = d3.mouse(this);
            const gpos1 = projection.invert([x, y]);
            coord.value = gpos1;

            o0 = projection.rotate();

            const o1 = eulerAngles(gpos0, gpos1, o0);
            if (o1) projection.rotate(o1); //([o1[0], 0, 0]);

            d3.select(svg)
              .selectAll(".point")
              .datum({ type: "Point", coordinates: gpos1 });
            d3.select(svg)
              .selectAll("path")
              .attr("d", path);
          },
          dragended: () => {
            dragended.value = true;
            emit("coord", coord.value, dragended.value);
          }
        };
      };

      const dragHandler = dragger();
      const drag = d3
        .drag()
        .on("start", dragHandler.dragstarted)
        .on("drag", dragHandler.dragged)
        .on("end", dragHandler.dragended);

      d3.select(svg).call(drag);

      const zoomer = () => {
        let v0; // Mouse position in Cartesian coordinates at start of drag gesture.
        let r0; // Projection rotation as Euler angles at start.
        let q0; // Projection rotation as versor at start.
        return {
          zoomstarted() {
            v0 = versor.cartesian(projection.invert(d3.mouse(this)));
            r0 = projection.rotate();
            q0 = versor(r0);
          },
          zoomed() {
            projection.scale((d3.event.transform.k * (height - 10)) / 2);

            var v1 = versor.cartesian(
                projection.rotate(r0).invert(d3.mouse(this))
              ),
              q1 = versor.multiply(q0, versor.delta(v0, v1)),
              r1 = versor.rotation(q1);
            projection.rotate(r1);

            d3.select(svg)
              .selectAll("path")
              .attr("d", path);
          }
        };
      };

      const zoomHandler = zoomer();
      const zoom = d3
        .zoom()
        .on("start", zoomHandler.zoomstarted)
        .on("zoom", zoomHandler.zoomed);

      d3.select(svg).call(zoom);

      const world = await fetch(topojson_path).then(r => r.json());

      d3.select(svg)
        .append("path")
        .datum(topojson.feature(world, world.objects.land))
        .attr("class", "land")
        .attr("d", path);

      borders = topojson.mesh(world, world.objects.countries, function(a, b) {
        return a !== b;
      });

      d3.select(svg)
        .append("path")
        .datum(borders)
        .attr("class", "border")
        .attr("d", path);
    };

    onMounted(test);
    return {
      svgRef,
      coord
    };
  }
};
</script>
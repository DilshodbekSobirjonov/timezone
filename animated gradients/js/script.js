var width = 700,
    height = 700,
    speed = -0.0099,
    start = Date.now();

var sphere = {type: "Sphere"};

var projection = d3.geo.orthographic()
    .scale(width / 2.1)
    .translate([width / 2, height / 2])
    .precision(.5);

var graticule = d3.geo.graticule();

var canvas = d3.select("body").append("canvas")
    .attr("width", width)
    .attr("height", height);

var context = canvas.node().getContext("2d");

var path = d3.geo.path()
    .projection(projection)
    .context(context);

d3.json("https://s3-us-west-2.amazonaws.com/s.cdpn.io/95802/world-110m.json", function(error, topo) {
  if (error) throw error;

  var land = topojson.feature(topo, topo.objects.land),
      grid = graticule();
  
  var pattern, pattern2;
  var imageObj = new Image();
  imageObj.onload = function() {
    pattern = context.createPattern(imageObj, 'repeat');
  };
  imageObj.src = 'https://cdn.pixabay.com/photo/2017/10/01/12/35/low-poly-2805310_960_720.jpg';

  var imageObj2 = new Image();
  imageObj2.onload = function() {
    pattern2 = context.createPattern(imageObj2, 'repeat');
  };
  imageObj2.src = 'https://image.freepik.com/free-vector/gray-abstract-geometric-low-poly-triangle-shape-pattern_9051-12.jpg';
  
  d3.timer(function() {
    context.clearRect(0, 0, width, height);

    projection.rotate([speed * (Date.now() - start), -15]).clipAngle(90);

    context.beginPath();
    path(sphere);
    context.lineWidth = 0;
    context.strokeStyle = "transparent";
    context.stroke();
    context.fillStyle = "transparent";
    context.fill();

    projection.clipAngle(180);

    context.beginPath();
    path(land);
    // context.fillStyle = "#dadac4";
    context.fillStyle = pattern2;
    context.save();
    context.translate((0.00999999 * (Date.now() - start)), 0);
    context.fill();
    context.restore();
    

    context.beginPath();
    path(grid);
    context.lineWidth = .5;
    context.strokeStyle = "rgba(119,119,119,0)";
    context.stroke();

    projection.clipAngle(90);

    context.beginPath();
    path(land);
    context.fillStyle = pattern;
    context.save();
    context.translate((-0.011 * (Date.now() - start)), 0);
    context.fill();
    context.restore();
    context.lineWidth = 0;
    context.strokeStyle = "transparent";
    context.stroke();
  });
});

d3.select(self.frameElement).style("height", height + "px");
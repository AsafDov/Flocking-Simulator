
// Parameters we can control
// Percteption radius
// maxSteeringForce
// Max maxVelocity
// Separation distance

let agentSys;

// Create sliders for Parameters we could play with
let alignSlider, cohesionSlider, separationSlider, perceptionRadiusSlider, separationDistanceSlider;
let alignText, cohesionText, separationText, perceptionRadiusText, separationDistanceText;

let spaceY = 20;
let spaceX = 10;

function setup(){
    createCanvas(600,600);
    agentSys  = new AgentSystem(200);
    asignSliders();
}


function draw(){
  background(30);

  agentSys.cohese();
  agentSys.align();
  agentSys.separate();
  agentSys.update();
  agentSys.show();

  showText();
}


function asignSliders(){
  fill(200);
  alignSlider = createSlider(0, 2, 1, 0.1);
  alignSlider.position(spaceX, height-100);
  alignText = createElement("h0", 'Align '+ alignSlider.value()).position(alignSlider.width+ spaceX*2,alignSlider.y).style('color', color(200));

  cohesionSlider = createSlider(0, 2, 1, 0.1);
  cohesionSlider.position(spaceX, alignSlider.y+spaceY);
  cohesionText = createElement("h0", 'Cohesion '+cohesionSlider.value()).position(cohesionSlider.width+ spaceX*2,alignSlider.y+spaceY).style('color', color(200));

  separationSlider = createSlider(0, 2, 1, 0.1);
  separationSlider.position(spaceX, cohesionSlider.y+spaceY);
  separationText = createElement("h0",  'Separation' + separationSlider.value()).position(separationSlider.width+ spaceX*2,cohesionSlider.y+spaceY).style('color', color(200));

  perceptionRadiusSlider = createSlider(0, 400, 30, 1);
  perceptionRadiusSlider.position(spaceX, separationSlider.y+spaceY);
  perceptionRadiusText = createElement("h0",  'Perception Radius ' + perceptionRadiusSlider.value()).position(perceptionRadiusSlider.width+ spaceX*2, separationSlider.y+spaceY).style('color', color(200));

  separationDistanceSlider = createSlider(0, 400, 20, 1);
  separationDistanceSlider.position(spaceX, perceptionRadiusSlider.y+spaceY);
  separationDistanceText = createElement("h0",  'Separation Distance ' + separationDistanceSlider.value()).position(separationDistanceSlider.width+ spaceX*2, perceptionRadiusSlider.y+spaceY).style('color', color(200));
}

function showText(){
  // Updating text
  fill(200);
  alignText.html('Align '+alignSlider.value());
  cohesionText.html('Cohesion '+cohesionSlider.value());
  separationText.html('Separation '+separationSlider.value());
  perceptionRadiusText.html('Perception Radius '+perceptionRadiusSlider.value());
  separationDistanceText.html('Separation Distance '+separationDistanceSlider.value());

}

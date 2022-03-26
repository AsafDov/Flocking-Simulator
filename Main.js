
// Parameters we can control
// Percteption radius
// maxSteeringForce
// Max maxVelocity
// Separation distance

// Objective
// X I want to map the color of each of the agents to each of the three forces
// X I also need to limit each of the forces effect.
// X I want to create monsters that eat the agents and see which population of the agents remains the longest
// Generate a new generation
// Each generation has 5 seconds to survive
// For new generations, alive ones are randomly picked from the agents
// New generation starts, No mutation


let agentSys;
let remainingTime= 0;
let running = true;

// Create sliders for Parameters we could play with
let alignSlider, cohesionSlider, separationSlider, perceptionRadiusSlider, separationDistanceSlider;
let alignText, cohesionText, separationText, perceptionRadiusText, separationDistanceText;

let spaceY = 20;
let spaceX = 10;

//Speed of generations moving forward
let propogationSpeedSlider;

function setup(){
    createCanvas(600,600);
    agentSys  = new AgentMonsterSystem(130,3);
    // asignSliders();

    propogationSpeedSlider = createSlider(1,1000,1,1);
    propogationSpeedSlider.position(10,10);
}


function draw(){
  for(let i=0; i<propogationSpeedSlider.value(); i++){
    agentSys.applyForcesUpdate()
    if(AgentMonsterSystem.living <= 0){
        agentSys.rePopulate();
        AgentMonsterSystem.generation++;
    }
  }

  if(AgentMonsterSystem.generation%10 ==0){
    colors = agentSys.getAverageColor();
    console.log("Align: " + red(colors));
    console.log("Cohese: " + green(colors));
    console.log("Separate: " + blue(colors));
    console.log("------------------");
  }
    background(30);
    text('Genration: \n' + AgentMonsterSystem.generation, 5, 80);
    agentSys.show();
    showAverageColor();


}


function asignSliders(){
  // fill(200);

  // perceptionRadiusSlider = createSlider(0, 400, 30, 1);
  // perceptionRadiusSlider.position(spaceX, height-3*spaceY);
  // perceptionRadiusText = createElement("h0",  'Perception Radius ' + perceptionRadiusSlider.value()).position(perceptionRadiusSlider.width+ spaceX*2, height - 3*spaceY);
  // perceptionRadiusText.style('color', '#00afd3');

  // separationDistanceSlider = createSlider(0, 400, 20, 1);
  // separationDistanceSlider.position(spaceX, perceptionRadiusSlider.y+spaceY);
  // separationDistanceText = createElement("h0",  'Separation Distance ' + separationDistanceSlider.value()).position(separationDistanceSlider.width+ spaceX*2, perceptionRadiusSlider.y+spaceY);
  // separationDistanceText.style('color', '#00afd3');
}

function showText(){
  // Updating text
  // fill(200);
  // alignText.html('Align '+alignSlider.value());
  // cohesionText.html('Cohesion '+cohesionSlider.value());
  // separationText.html('Separation '+separationSlider.value());
  // perceptionRadiusText.html('Perception Radius '+perceptionRadiusSlider.value());
  // separationDistanceText.html('Separation Distance '+separationDistanceSlider.value());

}

function waitMillis(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}


function showAverageColor(){
  fill(agentSys.getAverageColor());
  ellipse(width-40,50,50);
}

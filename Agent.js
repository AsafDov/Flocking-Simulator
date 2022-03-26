

class Agent{

  constructor(){
    this.position = createVector(random(0,width),random(0,height));
    // this.position = createVector(width/2,height/2);
    this.velocity = createVector(random(-2,2),random(-2,2));
    this.acceleration = createVector(0,0);
    // The radios of perception, what each agent sees
    this.perceptionRadius = 30;
    // Need a veriable to put a limit on the steering force.
    this.maxSteeringForce = 0.5;
    this.maxVelocity = 4;

    // minimum space allowed for each agent with another
    this.separationDistance = 50;


    //Scale Factor to map to color()\
    this.alignScale = random(0,2);
    this.coheseScale =  random(0,2);
    this.separateScale =  random(0,2);

    // Asign color
    let red  =  map(this.alignScale, 0,2,100,255);
    let blue  =  map(this.coheseScale, 0,2,100,255);
    let green  =  map(this.separateScale, 0,2,100,255);
    this.agentColor = color(red,blue,green);

    // ALIVE OR DEAD
    this.alive = true;

    // How long has it lived
    this.fitness = 0;
  }

  align(otherAgents){

    let steering = new p5.Vector(0,0);
    let total = 0;
    for(let other of otherAgents){
      let distance = p5.Vector.dist(this.position,other.position);
      if(other != this && distance < this.perceptionRadius){
        steering.add(other.velocity);
        total++;
      }
    }
    if(total > 0){
      steering.div(total);
      steering.setMag(this.maxVelocity);
      steering.sub(this.velocity);
      steering.limit(this.maxSteeringForce);

      this.acceleration.add(steering.mult(this.alignScale));
    }
  }

  cohese(otherAgents){
    let steering = new p5.Vector(0,0);
    let total = 0;
    for(let other of otherAgents){
      let distance = p5.Vector.dist(this.position,other.position);
      if(other != this && distance < this.perceptionRadius){
        steering.add(other.position);
        total++;
      }
    }
    if(total > 0){
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(this.maxVelocity);
      steering.sub(this.velocity);
      steering.limit(this.maxSteeringForce);
      this.acceleration.add(steering.mult(this.coheseScale));
    }
  }

  separate(otherAgents){
    let steering = new p5.Vector(0,0);
    let total = 0;
    for(let other of otherAgents){
      let distance = p5.Vector.sub(this.position, other.position);
      if(other != this && distance.mag() < this.separationDistance){
        distance.div(distance.mag());
        steering.add(distance);
        total++;
      }
    }
      if(total>0){
        steering.div(total);
        steering.setMag(this.maxVelocity);
        steering.sub(this.velocity);
        steering.limit(this.maxSteeringForce);
        this.acceleration.add(steering.mult(this.separateScale));
      }
  }

  show(){
    let x = this.position.x;
    let y = this.position.y;

    let theta = this.velocity.heading() + PI/2;
    fill(this.agentColor);
    stroke(0);
    push();
    translate(x, y);
    rotate(theta);
    beginShape();
    vertex(0, -7);
    vertex(-5, 7);
    vertex(5, 7);
    endShape(CLOSE);
    pop();

  }

  update(){
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration).limit(this.maxVelocity);
    this.acceleration.mult(0);

    // Handling the edges
    let x = this.position.x;
    let y = this.position.y;

    if(x>=0){
      this.position.x = x%width;
    }
    else{
      this.position.x = width - x%width;
    }
    if(y>0){
      this.position.y = y%height;
    }
    else{
      this.position.y = height - y%height;
    }

    // Handle Sliders
    // this.perceptionRadius = perceptionRadiusSlider.value();
    // this.separationDistance = separationDistanceSlider.value();

    // update the fittness
    this.fitness++;
  }

  copy(){
    let toReturn = new Agent();
    toReturn.alignScale = this.alignScale;
    toReturn.coheseScale = this.coheseScale;
    toReturn.separateScale = this.separateScale;
    return toReturn;
  }

}

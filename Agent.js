

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
      this.acceleration.add(steering.mult(alignSlider.value()));
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
      this.acceleration.add(steering.mult(cohesionSlider.value()));
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
        this.acceleration.add(steering.mult(separationSlider.value()));
      }
  }

  show(){
    let x = this.position.x;
    let y = this.position.y;

    let theta = this.velocity.heading() + PI/2;
    fill(30,200,10);
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
    this.perceptionRadius = perceptionRadiusSlider.value();
    this.separationDistance = separationDistanceSlider.value();


  }

}

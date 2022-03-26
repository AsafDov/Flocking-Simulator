class Monster extends Agent{

  constructor(){
    super();
    this.agentColor = color(240,240,240);
    this.diameter = 70;
    this.attractionForce = 100;
    this.separateScale = 1;
    this.separationDistance = this.diameter*3;
  }

  show(){
    fill(this.agentColor);
    ellipse(this.position.x,this.position.y, this.diameter);
  }


  attack(otherAgents){
    let steering = new p5.Vector(0,0);
    let total = 0;
    for(let other of otherAgents){
      if (other.alive == true){
        let distance = p5.Vector.sub(this.position, other.position);
        if(distance.mag() < this.diameter/2){
          other.alive = false;
          AgentMonsterSystem.living--;
          // continue;
        }
        if(distance.mag() < this.attractionForce*(this.perceptionRadius+this.diameter) ){
          distance.div(distance.mag());
          steering.add(distance);
          total++;
        }
      }
    }
    if(total>0){
      steering.div(total);
      steering.setMag(this.maxVelocity);
      steering.sub(this.velocity);
      steering.limit(this.maxSteeringForce);
      this.acceleration.add(steering.mult(-this.separateScale));
    }

  }

  focusedAttack(otherAgents){
    let steering = new p5.Vector(0,0);
    let bestDistance = p5.Vector.sub(this.position, new p5.Vector(width,height));
    for(let other of otherAgents){
      if (other.alive == true){
        let distance = p5.Vector.sub(this.position, other.position);
        if(distance.mag() < this.diameter/2){
          other.alive = false;
          AgentMonsterSystem.living--;
          // continue;
        }
        else if(distance.mag() < bestDistance.mag() ){
          bestDistance = distance;
        }
      }
    }

    bestDistance.div(bestDistance.mag());
    steering.add(bestDistance)
    steering.setMag(this.maxVelocity); //Shold I remove?
    steering.sub(this.velocity);
    steering.limit(this.maxSteeringForce); //Shold I remove?
    this.acceleration.add(steering.mult(-this.separateScale));

  }



}

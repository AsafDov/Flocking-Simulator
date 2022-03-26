class AgentSystem{

  constructor(numOfAgents){
    this.numOfAgents = numOfAgents;
    this.agents = [];
    for (let i=0; i<numOfAgents; i++){
      this.agents.push(new Agent());
    }
  }

  show(){
    for (let i=0; i<this.numOfAgents; i++){
      this.agents[i].show();
    }
  }

  update(){
    for (let i=0; i<this.numOfAgents; i++){
      this.agents[i].update();
    }
  }

  seek(){

  }

  //Aligning the agents with the LOCAL average heading
  align(){
    for(let agent of this.agents){
      agent.align(this.agents);
    }
  }

  cohese(){
    for(let agent of this.agents){
      agent.cohese(this.agents);
    }
  }

  separate(){
    for(let agent of this.agents){
      agent.separate(this.agents);
    }
  }


}

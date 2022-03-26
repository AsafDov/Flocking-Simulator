class AgentMonsterSystem extends AgentSystem{
  static generation = 0;
  static living;

  constructor(agentPopulation, monsterPopulation){
    super(agentPopulation);
    AgentMonsterSystem.living = agentPopulation;
    this.monsters = [];
    for (let i=0; i<monsterPopulation; i++){
      this.monsters.push(new Monster());
    }

  }

  show(){
    super.show();
    for (let i=0; i<this.monsters.length; i++){
      this.monsters[i].show();
    }
  }

  update(){
    super.update();

    for (let i=0; i<this.monsters.length; i++){
      this.monsters[i].attack(this.agents);
      this.monsters[i].update();
    }
  }

  applyForcesUpdate(){
    for(let agent of this.agents){
      if(agent.alive == true){
        agent.align(this.agents);
        agent.cohese(this.agents);
        agent.separate(this.agents);
        agent.separate(this.monsters);
        agent.update();
      }

      // console.log(this.living);
    }
    for (let i=0; i<this.monsters.length; i++){
      this.monsters[i].separate(this.monsters);
      this.monsters[i].focusedAttack(this.agents);
      this.monsters[i].update();
    }

  }


  align(){

    for(let agent of this.agents){
      if(agent.alive){
        agent.align(this.agents);
        // agent.align(this.monsters);
      }
    }
  }

  cohese(){
    for(let agent of this.agents){
      if(agent.alive){
        agent.cohese(this.agents);
        // agent.cohese(this.monsters);
      }
    }
  }

  separate(){
    for(let agent of this.agents){
      if(agent.alive){
        agent.separate(this.agents);
        agent.separate(this.monsters);
      }
    }
  }

  rePopulate(){
    this.agents = this.agents.sort((agent1,agent2)=>(agent1.fitness<agent2.fitness)?1:-1);
    // console.log("first: " + this.agents[0].fitness);
    // console.log("second: " + this.agents[1].fitness);
    // console.log("third: " + this.agents[2].fitness);
    let selectionPrecentile =0.05; //Choose 10% of the best population
    let livingMembers = [];

    for( let i=0; i<int(selectionPrecentile*this.numOfAgents); i++){
      livingMembers.push(this.agents[i]);
    }
    //
    let newAgents = [];
    if(livingMembers.length == 0){
      for (let i=0; i<this.numOfAgents; i++){
        newAgents.push(new Agent());
      }
    }
    // else{

    for (let i=0; i<this.numOfAgents; i++){
      newAgents.push(livingMembers[int(random(0,livingMembers.length))].copy());
      // }
    }
    AgentMonsterSystem.living = this.numOfAgents;
    this.agents = newAgents;

    let redC = 0;
    let blueC = 0;
    let greenC = 0;
    // Follow Avegrage color //
    for(let agent of this.agents){
      let c = agent.agentColor;
      redC += red(c);
      blueC += blue(c);
      greenC += green(c);
    }

    // console.log("Align: " + redC/this.agents.length);
    // console.log("Cohese: " + greenC/this.agents.length);
    // console.log("Separate: " + blueC/this.agents.length);
    // console.log("------------------");

  }

  getAverageColor(){
    let redC=0,blueC=0,greenC=0;

    for( let agent of this.agents){
      redC += red(agent.agentColor);
      blueC += blue(agent.agentColor);
      greenC += green(agent.agentColor);
    }
    return color(redC/this.numOfAgents,greenC/this.numOfAgents,blueC/this.numOfAgents);
  }



}

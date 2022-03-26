class Generation{
  static generation = 0;

  constructor(parents){
    generation++;
    this.populationNumber = 200;
    this.population;
    if(Generation.genration = 0){
      this.population = new AgentMonsterSystem(this.populationNumber,3);
    }
    else{
      this.rePopulate(parents)
    }
  }

  rePopulate(parents){
    this.population
  }


}

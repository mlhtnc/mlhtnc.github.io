var maxIteration = 5000;
var totalIteration = 0;
var geneText;
var ga;

window.addEventListener("load", function() {
  document.getElementById("play").addEventListener("click", play);
  document.getElementById("reset").addEventListener("click", reset);
  geneText = document.getElementById("gene-text");
  reset();
});

function reset() {
  let mutationRate = parseFloat(document.getElementById("mutation-rate").value);
  ga = new GeneticAlgorithm(10, mutationRate);

  totalIteration = 0;
  geneText.innerHTML = ga.population[0].gene;
  document.getElementById("generation").innerHTML = "";
}

function play() {
  let mutationRate = parseFloat(document.getElementById("mutation-rate").value);
  GeneticAlgorithm.mutationRate = mutationRate;

  for(let i = 0; i < maxIteration; ++i) {
    ga.evolve();

    let best = ga.isProblemSolved();
    if(best < 0)
      continue;

    geneText.innerHTML = ga.population[best].gene;
    totalIteration += i + 1;
    updateIterationNumber(true);
    return;
  }

  geneText.innerHTML = ga.population[0].gene;
  totalIteration += maxIteration;
  updateIterationNumber(false);
}

function updateIterationNumber(success) {
  document.getElementById("generation").innerHTML =
        totalIteration + ". nesilde problem " + (success ? "çözüldü" : "çözülemedi");
}

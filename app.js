'use strict'
console.log("script loaded")

var allSongs = [];
var songChart;
var chartDrawn = false;

function Song(title, identifier) {
  this.title = title;
  this.identifier = identifier;
  this.votes = 0;

  allSongs.push(this);
}

new Song('American Girl', 'american');
new Song('Mary Jane\'s Last Dance', 'maryjane');
new Song('Wildflowers', 'wildflowers');
new Song('Refugee', 'refugee');
new Song('Free Fallin\'', 'freefallin');

var votes = [];
var title = [];

function updateChartArrays() {
  for (var i =0; i < allSongs.length; i++) {
    title[i] = allSongs[i].title;
    votes[i] = allSongs[i].votes;
    }
  }


function showSongsAsList(){
  var songList = document.getElementById('list');
  songList.innerHTML = '';

  for(var i = 0; i < allSongs.length; i++){
    var liEl = document.createElement('li');
    liEl.textContent = allSongs[i].title + ', ' + allSongs[i].votes + ' votes';
    songList.appendChild(liEl);
  }
}

function tallyVote(thisSong) {
  for(var i = 0; i < allSongs.length; i++){
    if (thisSong === allSongs[i].identifier) {
      allSongs[i].votes++;
    }
  }
updateChartArrays();
}

var data = {
  labels: title,
  datasets: [
    {
      data: votes,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
    ]
    }
  ]
};

function drawChart() {
  var ctx = document.getElementById("myChart").getContext('2d');
  songChart = new Chart(ctx, {
    type: 'bar',
    data: data,
  });
  chartDrawn = true;
  

}

document.getElementById('voting').addEventListener('click', function(event) {
  tallyVote(event.target.id);
});

document.getElementById('list-button').addEventListener('click', function(){
  showSongsAsList();
});

document.getElementById('draw-chart').addEventListener('click', function(){
  drawChart();
});
/*
markmotet
January 28th, 2020

DESCRIPTION: Cretes a dynamically updating graph of a Reddit post's upvote count

*/

// Dependencies
var snoowrap = require('snoowrap');           // Reddit API
window.ApexCharts = require('apexcharts');    // ApexCharts API

// Setting up information for using the Reddit API. Most of this is secret :D
const config = {
    userAgent: 'Karmometer for Reddit by markmellow5',
    clientId: '',
    clientSecret: '',
    username: '',
    password: ''
};

// Initializes a new Reddit instance
var reddit = new snoowrap(config);

// PUT SUBMISSION ID HERE
var submissionID = 'SUBMISSION_ID_HERE';

// Submit button
document.getElementById('button1').addEventListener('click', function(e) {
    e.preventDefault();
    console.log(document.getElementById("textbox").value);
});

var data = [];

// Setting Apex Charts settings
var options = {
    series: [{
      data: data.slice()
    }],
    chart: {
      id: 'realtime',
      height: 350,
      type: 'line',
      animations: {
        enabled: true,
        easing: 'easeinout',
        dynamicAnimation: {
          speed: 1000
        }
      },
      toolbar: {
        show: true
      },
      zoom: {
        enabled: false
      }
    },
    stroke: {
      curve: 'stepline'
      //curve: 'smooth'
    },
    title: {
      text: 'Karmometer',
      align: 'left'
    },
    xaxis: {
      type: 'numeric'
    },
    yaxis: {
    },
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();

  // Dynamically adds the updated submission score to the graph every 4 seconds
  window.setInterval(function () {  
    reddit.getSubmission(submissionID).score.then(function(resolvedPromise) {
        data.push(resolvedPromise);
    });
    chart.updateSeries([{
      data: data
    }]);
  }, 4000)
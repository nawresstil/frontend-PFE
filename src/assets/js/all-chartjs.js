this.companyService.getPercentageGroupByStatus().subscribe((response: CountSocieties[]) => {
  this.society = response;

  // Render doughnut chart
  new Chart(document.getElementById('doughnut'), {
    type: 'doughnut',
    data: {
      labels: this.society.map(item => item.label),
      datasets: [{
        data: this.society.map(item => item.value),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          // Add more colors if needed
        ],
      }],
    },
  });
});

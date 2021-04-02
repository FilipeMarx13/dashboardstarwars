const personagensCont = document.getElementById('personagens');
const moonsCont = document.getElementById('moons');
const planestCont = document.getElementById('planets');
const navesCont = document.getElementById('naves');
const filmesCont = document.getElementById('filmes');
const carsCont = document.getElementById('vehicles');

preencherCont();
preencherTabela();

function preencherCont(){
  Promise.all([
    swapiGet('people/'),
    swapiGet('species/'),
    swapiGet('planets/'),
    swapiGet('starships/'),
    swapiGet('films/'),
    swapiGet('vehicles/'),
      ])
  .then(function (results) {
    personagensCont.innerHTML = results[0].data.count;
    moonsCont.innerHTML = results[1].data.count;
    planestCont.innerHTML = results[2].data.count;
    navesCont.innerHTML = results[3].data.count;
    filmesCont.innerHTML = results[4].data.count;
    carsCont.innerHTML = results[5].data.count;
  });
}

async function preencherTabela(){
  const response = await swapiGet("films/");
  const tableData = response.data.results;
  // console.log(tableData)
  tableData.forEach(film => {
    $('#filmstabela').append(`<tr>
      <td>${film.title}</td>
      <td>${moment(film.release_date).format("DD/MM/YYYY")}</td>
      <td>${film.director}</td>
      <td>${film.episode_id}</td>
      </tr>`);
  });


}

function swapiGet(param) {//recebendo a requisao da function passada
  return axios.get(`https://swapi.dev/api/${param}`); //Uso crase para poder usar $ para pegar o parametro
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

async function drawChart() {
  const response = await swapiGet("vehicles/");
  const vehiclesArray = response.data.results;
  // console.log(vehiclesArrar);

  const dataArray = [];
  dataArray.push(["Veiculos", "Passageiros"]);
  vehiclesArray.forEach((vehicle) => {
    dataArray.push([vehicle.name, Number(vehicle.passengers)]);
  });

  console.log(dataArray);
  var data = google.visualization.arrayToDataTable(dataArray);

  var options = {
    title: 'Veiculos',
    legend: 'none',
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));

  chart.draw(data, options);
}

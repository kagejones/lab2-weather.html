$(function(){
  $('#citySearch').keyup(getCities);
  $('#stackSearch').keyup(getStack);
});

function getCities() {
  //console.log('up');
  var query= escape(titleCase($('#citySearch').val()));
  var url = "http://bioresearch.byu.edu/cs260/jquery/getcity.cgi?q=" + query;
  //console.log(url);
  $.getJSON(url, function(data){
    // console.log('data', data);
      if(data.length >0) {
        $('#cityResult').empty();
        for(item of data) {
          var li = $(`<li>${item.city}</li>`);
          $('#cityResult').append(li);
        }
      }
      if(data.length === 1){
        getWeather(data[0].city);
        li.empty();
      }
  });
  if($('#citySearch').val().length == 0)
  {
    $('#cityResult').empty();
  }
}

function getWeather(city) {
  var url = `https://api.wunderground.com/api/f5646b863630aea0/geolookup/conditions/q/UT/${city}.json`;
  $.getJSON(url, function(data){
      console.log('data',data);
      $('#weather').empty();
      $('#weather').append(`
        <h3>Weather for ${data.location.city}</h3>
        <div>The Temperature is ${data.current_observation.temp_f}</div>
        <div>The Conditions are ${data.current_observation.weather}</div>
        `);

  });
}


function getStack() {
  if($('#stackSearch').val().length >0) {
  var search= escape($('#stackSearch').val().replace(' ','_'));
  let url=`https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=${search}&site=stackoverflow`;
  console.log(url);
  $.getJSON(url, function(data){
        $('#stackResult').empty();
        for(item of data.items) {
          var li = $(`<li><a href ="${item.link}">${item.title}</a></li>`);
          $('#stackResult').append(li);
        }
      });
  }
  if($('#stackSearch').val().length == 0)
  {
    $('stackResult').empty();
  }
}

function titleCase(string) {
  string= string.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);

}

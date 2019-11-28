var api = "https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api";
var ingredients = "/";
var



let boton = document.getElementById('boton');
let input =  document.getElementById('input');
let lista =  document.getElementById('lista');


async function search() {

  // let userInput = encodeURIComponent(input.value);
  //
  // let link = 'https://en.wikipedia.org/w/api.php?action=query&list=search&utf8=&format=json&origin=*&srlimit=50&srsearch=' + userInput;


  let response = await fetch(api);

  let result = await response.json();


  console.log(result);

  // let array = result.query.search;
  //
  // for(x of array){
  //
  //   let resultID = x.pageid;
  //
  //   let li = document.createElement('li');
  //   let a = document.createElement('a');
  //   li.appendChild(a);
  //   a.textContent = x.title;
  //   a.href = 'http://en.wikipedia.org/?curid=' + resultID;
  //   a.target = "_blank";
  //   lista.appendChild(li);
  //
  // }

};

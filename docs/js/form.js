let submitInput = document.querySelector('input[type="submit"]');
let formAsk = document.querySelector('.form-ask');
//console.log(submitInput);
formAsk.addEventListener('submit', (evt) => {
  console.log('click');
  evt.preventDefault();
  body = new FormData(evt.target);
  fetch('http://topolpro.ru/ask.php',
  {
    method : 'POST',
    mode: 'no-cors',
    body : body,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
  }
  ).then((response) => console.log(response));

  //.then((json) => console.log(JSON.stringify(json)));
})

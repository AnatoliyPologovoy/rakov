console.log('he');
let list = document.querySelector('.main-list');

for (const item of list.children) {
  item.draggable = true;
}

list.addEventListener('dragstart', (evt) => {
  evt.target.classList.add('selected');
});

list.addEventListener('dragend', (evt) => {
  evt.target.classList.remove('selected');
});

const getNextElement = (cursorPosition, currentElement) => {
  const currentElementCoord = currentElement.getBoundingClientRect();
  const currentElementCenter = currentElementCoord.y + currentElementCoord.height/2;
  console.log(cursorPosition);

  const nextElement = (cursorPosition < currentElementCenter) ?
    currentElement :
    currentElement.nextElementSibling;

  return nextElement;
};

list.addEventListener('dragover', (evt) => {
  evt.preventDefault();

  const selectedElement = list.querySelector('.selected');
  const currentElement = evt.target;

  const isMoveable = selectedElement !== currentElement &&
  currentElement.classList.contains('list-item');

  if(!isMoveable) {
    return;
  }

  /*
  const nextElement = (currentElement === selectedElement.nextElementSibling) ?
  //if cursor move down, nextElement =
  currentElement.nextElementSibling :
  //if cursor move up nextElement =
  currentElement;
  */

  console.log(evt.target);
  const nextElement = getNextElement(evt.clientY, currentElement);


  list.insertBefore(selectedElement, nextElement);

})

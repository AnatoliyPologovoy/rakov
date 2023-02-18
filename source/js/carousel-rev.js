let windowCarousel = document.querySelector('.carousel-rev__view');
let listCarousel = document.querySelector('.carousel-rev__list');

let buttonCarouselLeft = document.querySelector('.carousel-rev__button-left');
let buttonCarouselRight = document.querySelector('.carousel-rev__button-right');

const carousel =
(windowCarousel, element, buttonCarouselLeft, buttonCarouselRight, widthItem, quantityItem) => {

  let shift = 0;
  let count = 0;
  let cloneElement;
  let shiftCloneElementLeft;
  let shiftCloneElementRight;

  const createCloneElementLeft = () => {
    cloneElement = element.cloneNode(true);
    shiftCloneElementLeft = - widthItem * quantityItem;
    cloneElement.style.left = shiftCloneElementLeft + 'px';
    windowCarousel.appendChild(cloneElement);
    return cloneElement;
  }

  const createCloneElementRight = () => {
    cloneElement = element.cloneNode(true);
    shiftCloneElementRight = widthItem;
    cloneElement.style.left = shiftCloneElementRight + 'px';
    windowCarousel.appendChild(cloneElement);
    return cloneElement;
  }

  let cloneElementLeft = createCloneElementLeft();

  const shiftingButtonLeft = () => {
    shift -= widthItem;
    element.style.left = shift + 'px';

    if(cloneElementLeft) {
      shiftCloneElementLeft -= widthItem;
      cloneElementLeft.style.left = shiftCloneElementLeft + 'px';
    }

    if (count == quantityItem - 2) { // почему 2?
      cloneElementLeft.remove();
      cloneElementLeft = element;
      element = createCloneElementRight();
      element.classList.add('element');

      cloneElementLeft.classList.add('clone');
      shiftCloneElementLeft = shift;
      shift = widthItem;
      count = -2;
    }

    count++;
    console.log(count);
  }

  const shiftingButtonRight = () =>{
    shift += widthItem;
    element.style.left = shift + 'px';

    if(cloneElementLeft) {
      shiftCloneElementLeft += widthItem;
      cloneElementLeft.style.left = shiftCloneElementLeft + 'px';
    }

    if (count == - quantityItem + 1) {
      element.remove();
      element = cloneElementLeft;
      shift = shiftCloneElementLeft;
      cloneElementLeft = createCloneElementLeft();
      count = 1;
    }
    count--;
    console.log(count);
  }

  buttonCarouselLeft.addEventListener('click', () => {
    shiftingButtonLeft();
   })

  buttonCarouselRight.addEventListener('click', () => {
    shiftingButtonRight();
   })


}

carousel(carouselView, carouselList, carouselButtonRight, carouselButtonLeft, 230, 8);
carousel(windowCarousel, listCarousel, buttonCarouselRight, buttonCarouselLeft, 290, 3);

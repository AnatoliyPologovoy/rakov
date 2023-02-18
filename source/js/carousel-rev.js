let windowCarousel = document.querySelector('.carousel-rev__view');
let listCarousel = document.querySelector('.carousel-rev__list');

let buttonCarouselLeft = document.querySelector('.carousel-rev__button-left');
let buttonCarouselRight = document.querySelector('.carousel-rev__button-right');

const carousel =
  (windowCarousel, element, buttonCarouselLeft, buttonCarouselRight, widthItem, quantityItem) => {

    let shift = 0;
    let count = 0;
    let cloneElement;
    let positionCloneElementLeft;
    let positionCloneElementRight;
    //for set active item
    let countActive = 0;
    let activeList = element;
    let notActiveList;

    const setActiveItem = (activeList) => {
      const cleanClassOfCollection = (activeList, className) => {
        for (let i = 0; i < activeList.children.length; i++) {
          activeList.children[i].classList.remove(className);
        }
      }
      if (notActiveList) {
        cleanClassOfCollection(notActiveList, 'list-cards__item-current')
      }
      cleanClassOfCollection(activeList, 'list-cards__item-current')

      activeList.children[countActive].classList.add('list-cards__item-current');
    }
    setActiveItem(activeList);

    const createCloneElementLeft = (shiftingAdditional = 0) => {
      cloneElement = element.cloneNode(true);
      positionCloneElementLeft = -widthItem * quantityItem - shiftingAdditional;
      cloneElement.style.left = positionCloneElementLeft + 'px';
      windowCarousel.appendChild(cloneElement);
      return cloneElement;
    }
    const createCloneElementRight = () => {
      cloneElement = element.cloneNode(true);
      positionCloneElementRight = widthItem + widthItem;
      cloneElement.style.left = positionCloneElementRight + 'px';
      windowCarousel.appendChild(cloneElement);
      return cloneElement;
    }

    let cloneElementLeft = createCloneElementLeft();

    const shiftingLeft = () => {
      shift -= widthItem;
      element.style.left = shift + 'px';

      if (cloneElementLeft) {
        positionCloneElementLeft -= widthItem;
        cloneElementLeft.style.left = positionCloneElementLeft + 'px';
      }

      if (count === quantityItem - 3) {
        cloneElementLeft.remove();
        cloneElementLeft = element;
        element = createCloneElementRight();
        element.classList.add('element');

        cloneElementLeft.classList.add('clone');
        positionCloneElementLeft = shift;
        shift = widthItem + widthItem;
        count = -3;
      }

      //counting active element
      countActive++
      if (countActive === quantityItem) {
        activeList = element;
        notActiveList = cloneElementLeft;
        countActive = 0
      }
      setActiveItem(activeList);

      count++;
      console.log('count: ' + count + '. countActive: ' + countActive);
    }
    const shiftingRight = () => {
      shift += widthItem;
      element.style.left = shift + 'px';

      if (cloneElementLeft) {
        positionCloneElementLeft += widthItem;
        cloneElementLeft.style.left = positionCloneElementLeft + 'px';
      }

      if (count === -quantityItem + 2) {
        element.remove();
        element = cloneElementLeft;
        shift = positionCloneElementLeft;
        cloneElementLeft = createCloneElementLeft(widthItem);
        positionCloneElementLeft -= widthItem - widthItem;
        count = 2;
      }

      //counting active element
      countActive--
      if (countActive === -1) {
        countActive = quantityItem - 1;
        activeList = cloneElementLeft;
        notActiveList = element;
      }
      setActiveItem(activeList);


      count--;
      console.log('count: ' + count + '. countActive: ' + countActive);
    }

    buttonCarouselLeft.addEventListener('click', () => {
      shiftingLeft();
    })
    buttonCarouselRight.addEventListener('click', () => {
      shiftingRight();
    })
  }


carousel(carouselView, carouselList, carouselButtonRight, carouselButtonLeft, 230, 8);
carousel(windowCarousel, listCarousel, buttonCarouselRight, buttonCarouselLeft, 290, 4);

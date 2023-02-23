let widthWindow = document.querySelector('body').offsetWidth;

window.addEventListener('resize', () => {
  window.location.reload();
  widthWindow = document.querySelector('body').offsetWidth;
})

//carousel list cards
let carouselList = document.querySelector('.carousel__list-cards');
let carouselView = document.querySelector('.carousel__view');

let carouselServiceButtonLeft = document.querySelector('.carousel__button-left');
let carouselServiceButtonRight = document.querySelector('.carousel__button-right');

let markersFillService = document.querySelector('.markers__fill-service');
let markersFillServiceWidth = 26.6;
let widthItemService = 230; //width item + margin

//addaptive settings
let startActiveItem = 0;
let additionalShift = 0;
if (widthWindow > 767) {
  startActiveItem = 1;
  additionalShift = 0;
}


//carousel reviews
let windowCarousel = document.querySelector('.carousel-rev__view');
let listCarousel = document.querySelector('.carousel-rev__list');

let carouselReviewButtonLeft = document.querySelector('.carousel-rev__button-left');
let carouselReviewButtonRight = document.querySelector('.carousel-rev__button-right');

let markersFillReview = document.querySelector('.markers__fill-rev');
let markersFillReviewWidth = 53;

let widthItemReview = 310;

if (widthWindow > 767) {
  widthItemReview = 320;
}



const createCarousel =
  (windowCarousel, //главное окно просмотра, внутри генерируемые списки
   element, //список с элементами
   buttonCarouselLeft, // кнопка со срелкой влево но смещяет список вправо
   buttonCarouselRight, // кнопка со срелкой вправо но смещяет список влево
   widthItem, // ширина элемента в списке с учетом маржинов
   quantityItem, // количество элементов в списке
   markersFill, // элемент маркера
   markersFillWidth, //ширина маркера
   startActiveItem = 0, //активный элемент списка
   additionalShift = 0 // дополнительное смещение, равное стартовому значению left списка
  ) => {

    let shift = 0 + additionalShift;
    let count = 0;
    let cloneElement;
    let positionCloneElementLeft;
    let positionCloneElementRight;
    //for set active item
    let countActive = startActiveItem;
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
      positionCloneElementLeft = -widthItem * quantityItem - shiftingAdditional + additionalShift;
      cloneElement.style.left = positionCloneElementLeft + 'px';
      windowCarousel.appendChild(cloneElement);
      return cloneElement;
    }
    const createCloneElementRight = () => {
      cloneElement = element.cloneNode(true);
      positionCloneElementRight = widthItem * 3 + additionalShift;
      cloneElement.style.left = positionCloneElementRight +'px';
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

      if (quantityItem > 4 && count === quantityItem - 4) {
        cloneElementLeft.remove();
        cloneElementLeft = element;
        element = createCloneElementRight();
        element.classList.add('element');

        cloneElementLeft.classList.add('clone');
        positionCloneElementLeft = shift;
        shift = widthItem * 3 + additionalShift;
        count = -4;
      }

      if (quantityItem < 5 && count === quantityItem - 3) { //костыли изза количества элементов меньше 5
        cloneElementLeft.remove();
        cloneElementLeft = element;
        element = createCloneElementRight();
        element.classList.add('element');
        element.style.left = positionCloneElementRight - widthItem +'px'; //костыли изза количества элементов меньше 5

        cloneElementLeft.classList.add('clone');
        positionCloneElementLeft = shift;
        shift = widthItem * 2 + additionalShift;
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
      //console.log('count: ' + count + '. countActive: ' + countActive);
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
      //console.log('count: ' + count + '. countActive: ' + countActive);
    }

    //shifting markers
    let markersCount = 0;
    let markersShift = 0;

    const shiftingMarkersRight = () => {
      if (markersCount === quantityItem - 1) {
        markersShift = 0 - markersFillWidth;
        markersCount = 0 - 1;
      }
      markersShift += markersFillWidth;
      markersFill.style.left = markersShift + 'px';
      markersCount++

    }
    const shiftingMarkersLeft = () => {
      if (markersCount === 0) {
        markersShift = (quantityItem) * markersFillWidth;
        markersCount = quantityItem;
      }
      markersShift -= markersFillWidth;
      markersFill.style.left = markersShift + 'px';
      markersCount--
    }

    buttonCarouselRight.addEventListener('click', () => {
      shiftingLeft();
      shiftingMarkersRight();
    })
    buttonCarouselLeft.addEventListener('click', () => {
      shiftingRight();
      shiftingMarkersLeft();
    })
    console.log('carousel created')
  }


createCarousel(  //carousel service
  carouselView,
  carouselList,
  carouselServiceButtonLeft,
  carouselServiceButtonRight,
  widthItemService,
  8,
  markersFillService,
  markersFillServiceWidth,
  startActiveItem,
  additionalShift);

createCarousel( //carousel reviews
  windowCarousel,
  listCarousel,
  carouselReviewButtonLeft,
  carouselReviewButtonRight,
  widthItemReview,
  4,
  markersFillReview,
  markersFillReviewWidth,
  startActiveItem);


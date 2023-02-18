let carouselList = document.querySelector('.carousel__list-cards');
let carouselView = document.querySelector('.carousel__view');

let carouselButtonLeft = document.querySelector('.carousel__button-left');
let carouselButtonRight = document.querySelector('.carousel__button-right');
/*
let carouselShift = 0;
let carouselShiftClone = 290; // width item (width + margins)
let carouselCount = 0;
let carouselListClone;

const shiftingButtonRight = () => {
  //Shifting for original element
  carouselShift -= 290;
  carouselList.style.left = carouselShift + 'px';
  carouselCount++ //counting shifting
  //Create and push in DOM clone original element. Clone has start shift = 0 + width item
  if (carouselCount == 4 && !carouselListClone) {
    carouselListClone = carouselList.cloneNode(true);
    carouselListClone.style.left = carouselShiftClone + 'px';
    carouselView.appendChild(carouselListClone);
  }
  //Start shifting clone element
  if (carouselCount >= 5 && carouselListClone) {
    carouselShiftClone -= 290;
    carouselListClone.style.left = carouselShiftClone + 'px';
  }

  //Removing and reassignmenting
  if (carouselCount == 8) {
    carouselCount = 3; // in next step(carouselCount == 4) will be create new clone on right
    carouselList.remove(); // Removing original element becouse his drifted away too much
    carouselList = carouselListClone; // Now clone element become original element
    carouselListClone = undefined;
    carouselShift = -870; // Position original element equal for carouselCount = 3
    carouselShiftClone = 290; // Starting shifting for clone element when will be create = width item

    if (carouselListCloneLeft) { // if there is clone original element on left (he must was very drifted away)
      carouselListCloneLeft.remove(); // Removing clone on left becouse his drifted away too much
      carouselListCloneLeft = undefined; // Cleaned variable that will be create if carouselCount == 1
      carouselShiftCloneLeft = -1740; //// Starting shifting for clone original element on left =
      //                                  (-(width item*number item) - width item (because after create
      //                                   worked shifting + width item))
    }
  }
  // Shifting clone original element on left if there is
  if (carouselListCloneLeft) {
    carouselShiftCloneLeft -= 290;
    carouselListCloneLeft.style.left = carouselShiftCloneLeft + 'px';
  }
}

carouselButtonRight.addEventListener('click', (evt) => {
  evt.preventDefault();
  shiftingButtonRight();
  shiftingMarkersButtonRight();
});

// Create clone original element and push his in DOM on left original element
// because start position item == 1 (carouselCount == 0)
let carouselShiftCloneLeft = -1450;
let carouselListCloneLeft = carouselList.cloneNode(true);
carouselListCloneLeft.style.left = carouselShiftCloneLeft + 'px';
carouselView.appendChild(carouselListCloneLeft);

const shiftingButtonLeft = () => {
  //Shifting for original element
  carouselShift += 290;
  carouselList.style.left = carouselShift + 'px';
  //Shifting for clone original element on right
  if (carouselCount >= 5 && carouselListClone) {
    carouselShiftClone += 290;
    carouselListClone.style.left = carouselShiftClone + 'px';
  }

  if (carouselCount == 1 && !carouselListCloneLeft) {
    carouselListCloneLeft = carouselList.cloneNode(true);
    carouselListCloneLeft.style.left = carouselShiftCloneLeft + 'px';
    carouselView.appendChild(carouselListCloneLeft);

  }
  //Shifting for clone original element on left
  if (carouselListCloneLeft) {
    carouselShiftCloneLeft += 290;
    carouselListCloneLeft.style.left = carouselShiftCloneLeft + 'px';
  }

  carouselCount-- //counting shifting
  //Removing and reassignmenting
  if (carouselCount == -4) {
    carouselCount = 1;
    carouselList.remove(); // Removing original element becouse his drifted away too much
    carouselList = carouselListCloneLeft; // Now clone element become original element
    carouselListCloneLeft = undefined; // Cleaned variable that will be create on next сlick
    carouselShiftCloneLeft = -1740;
    carouselShift = -290;

    if (carouselListClone) {
      carouselListClone.remove(); // Removing clone original element on right becouse his drifted away too much
      carouselListClone = undefined;
      carouselShiftClone = 290;
    }
  }
}

carouselButtonLeft.addEventListener('click', (evt) => {
  evt.preventDefault();
  shiftingButtonLeft();
  shiftingMarkersButtonLeft();
});

let markersFill = document.querySelector('.markers__fill');
let markersCount = 0;
let markersShift = 0;
let markersWidth = 54;

const shiftingMarkersButtonRight = () => {
  if (markersCount == 4) {
    markersShift = 0 - markersWidth;
    markersCount = 0 - 1;
  }
  markersShift += markersWidth;
  markersFill.style.left = markersShift + 'px';
  markersCount++

}
const shiftingMarkersButtonLeft = () => {
  if (markersCount == 0) {
    markersShift = 5 * markersWidth;
    markersCount = 5;
  }
  markersShift -= markersWidth;
  markersFill.style.left = markersShift + 'px';
  markersCount--
}
*/

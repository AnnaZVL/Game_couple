import { modalRezalt } from './render.js';

export class Card {
  _open = false
  _success = false

  constructor(container, number, flip) {
    this.cardNumber = number;
    this.flip = flip;
    this.card = this.createElement();
    this.container = container
    this.container.append(this.card);
  };

  createElement() {
    const $card = document.createElement('div'),
          $front = document.createElement('div'),
          $back = document.createElement('div');

    $front.classList.add('card__front');

    $back.classList.add('card__back');
    $back.textContent = this._cardNumber;

    $card.classList.add('card');
    $card.append($front, $back);

    $card.addEventListener('click', () => {
      if (this.open == false && this.success == false) {
        this.open = true;
        this.flip(this);
      };
    });

    return $card;
  }

  set cardNumber(value) {
    this._cardNumber = value;
  };

  get cardNumber() {
    return this._cardNumber;
  };

  set open(value) {
    this._open = value;
    if (value) {
      this.card.classList.add('open');
    } else {
      this.card.classList.remove('open');
    };
  };
  get open() {
    return this._open;
  };

  set success(value) {
    this._success = value;
    if (value) {
      this.card.classList.add('success');
    } else {
      this.card.classList.remove('success');
    };
  };
  get success() {
    return this._success;
  };
};

export class AmaizingCard extends Card {
  createElement() {
    const $card = document.createElement('div'),
          $front = document.createElement('div'),
          $back = document.createElement('div'),
          $imgCard = document.createElement('img');

    $imgCard.classList.add('card__img');
    $imgCard.src = this._cardNumber;

    //Обработка ошибки загрузки изображения
    $imgCard.onerror = function () {
      $imgCard.src = './img/error.png';
      const myError = new MyError('LoadingImage', 'Image loading error');

      modalRezalt('Ошибка загрузки изображения');
      document.querySelector('.game__field').remove();
      throw myError
    };

    $front.classList.add('card__front');

    $back.classList.add('card__back');
    $back.append($imgCard);

    $card.classList.add('card');
    $card.append($front, $back);

    $card.addEventListener('click', () => {
      if (this.open == false && this.success == false) {
        this.open = true;
        this.flip(this);
      };
    });

  return $card;
};

  set cardNumber(value) {
    const imges = [
      './img/1.jpg',
      './img/2.jpg',
     './img/3.jpg',
      './img/4.jpg',
      './img/5.jpg',
    ]
    for (let i = 0; i < imges.length; i++) {
        if (value === i) {
          this._cardNumber = imges[i]
        };
      };
  };
  get cardNumber() {
    return this._cardNumber;
  };
};

export class MyError extends Error {
  constructor(name, message) {
    super();
    this.name = name;
    this.message = message;
  }
}

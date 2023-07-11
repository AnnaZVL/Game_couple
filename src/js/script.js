import { Card, AmaizingCard } from './card.js';
import { renderStartField, renderGameFild, modalRezalt } from './render.js';

let numberCard = 0;
let firstCard = null;
let secondCard = null;
let stepTaimer;
let imgCart = false;

    // Создание стартового поля
function playGame() {

    renderStartField();

    const $startField = document.querySelector('.start-field'),
    $inputNamber = document.querySelector('.input-number'),
    $text = document.querySelector('.text');

    // начало игры при вводе в инпут
    $inputNamber.addEventListener('change', (e) => {
      let quantityCard = Number(e.target.value);

      // проверка числа на диапазон и четность
      if (quantityCard <= 10 && quantityCard > 2 && quantityCard % 2 === 0) {
        numberCard = quantityCard;
        // Проверка что выбрано картинки или цифры
        document.querySelectorAll('.button-start').forEach(e => {
            e.addEventListener('click', () => {
              $startField.remove();
              renderGameFild();
              try {
                creatCards(quantityCard, e.dataset.img);
              } catch(err) {
                console.log('err', err);
              }
            });
        });
        } else if (quantityCard % 2 !== 0) {
            $text.style.color = 'red';
            $text.textContent = "Введите четное число";
            e.target.value = '';
            } else {
              $text.style.color = 'red';
              $text.textContent = "Введите число в диапазоне от 2 до 10";
              e.target.value = '';
          };
        });
};

function creatCards(number, imgCard) {
    // Старт таймера
    const $taimer = document.querySelector('.taimer'),
          $cards = document.querySelector('.cards');

    stepTaimer = clearInterval(stepTaimer);
    $taimer.textContent = '60' ;
    stepTaimer = setInterval(startTaimer, 1000);

    // Создание карточек и логика игры
    const numberArr = createdNumberArr(number);
    $cards.style.gridTemplate = `auto / repeat(${numberArr.length / 2}, 1fr)`;
    let card = '';
    for (const number of numberArr) {
      if (imgCard == 'img') {
          card = new AmaizingCard($cards, number, flip);
        } else {
          card = new Card($cards, number, flip);
      };
    };
    //Логика игры
    function flip(card) {
      if (firstCard !== null && secondCard !== null) {
        if (firstCard.cardNumber !== secondCard.cardNumber) {
          firstCard.open = false;
          secondCard.open = false;
          firstCard = null;
          secondCard = null;
        };
      };
      if (firstCard == null) {
        firstCard = card;
      } else {
          if (secondCard == null){
              secondCard = card;
          };
        };
      if (firstCard !== null && secondCard !== null) {
          if (firstCard.cardNumber == secondCard.cardNumber) {
            firstCard.success = true;
            secondCard.success = true;
            firstCard = null;
            secondCard = null;
          };
      };
       endGame(numberArr);
    };
};

function endGame (arr) {
    // Проверка на "все карточки открыты"
      setTimeout(() => {
        if (document.querySelectorAll('.card.success').length == arr.length) {
          modalRezalt('Победа');
          document.querySelector('.cards').remove();
          document.querySelector('.timer-box').remove();
          stepTaimer = clearInterval(stepTaimer);
        }
      }, 500);
};

//Таймер игры
function startTaimer() {
  const $taimer = document.querySelector('.taimer');
  $taimer.textContent -= 1;

  if ($taimer.textContent <= 0) {
    stepTaimer = clearInterval(stepTaimer);
    $taimer.textContent = 0;
    if ($taimer.textContent == 0) {
      modalRezalt("Игра закончена. Вы проиграли");
      document.querySelector('.cards').remove();
      document.querySelector('.timer-box').remove();
    };
  };
};

//создание массива из парных чисел
function createdNumberArr(cardCount) {
  let numberArr = [];

  for (let n = 1; n <= (cardCount / 2); n++) {
    numberArr.push(n);
  };

  numberArr = numberArr.concat(numberArr);

  for (let i = numberArr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [numberArr[i], numberArr[j]] = [numberArr[j], numberArr[i]];
  };

  return numberArr;
};

playGame();

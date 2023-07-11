export function renderStartField() {
  const $startField = document.createElement('div'),
        $inputNamber = document.createElement('input'),
        $title = document.createElement('h1'),
        $text = document.createElement('h3'),
        $btnImgBox = document.createElement('div'),
        $btnTitle = document.createElement('h3'),
        $btnNumber = document.createElement('button'),
        $btnImg = document.createElement('button');

  //создание поля ввода
    $title.textContent = 'ИГРА ПАРЫ';
    $title.classList.add('title');

    $inputNamber.classList.add('input-number');
    $inputNamber.placeholder = '4';

    $text.textContent = 'Введите четное число от 2 до 10';
    $text.classList.add('text');

    $btnTitle.textContent = 'Что будете искать?';
    $btnTitle.classList.add('text');

    $btnNumber.textContent = 'Цифры';
    $btnNumber.classList.add('btn-restart', 'btn-number', 'button-start');

    $btnImg.textContent = 'Картинки';
    $btnImg.classList.add('btn-restart', 'btn-img', 'button-start');
    $btnImg.dataset.img = false;

    $btnImgBox.classList.add('btn-box');
    $btnImgBox.append($btnNumber, $btnImg);

    $startField.append($title, $text, $inputNamber, $btnTitle, $btnImgBox);
    $startField.classList.add('start-field');

    $btnImg.addEventListener('click', (e) => {
      e.target.dataset.img = 'img';
    });

    $btnNumber.addEventListener('click', (e) => {
      e.target.dataset.img = 'number';
    });

    document.body.append($startField);

    return true;
  };

export function renderGameFild() {
  const $cards = document.createElement('div'),
        $timerBox = document.createElement('div'),
        $taimer = document.createElement('div'),
        $textTaimer = document.createElement('h4');


    $textTaimer.textContent = 'До конца игры осталось:';
    $taimer.classList.add('taimer');
    $taimer.textContent = '60 c';

    $timerBox.append($textTaimer, $taimer);
    $timerBox.classList.add('timer-box');

    $cards.classList.add('cards');

    document.querySelector('.wrapper').append($cards);
    document.querySelector('.game__field').append($timerBox);
};

export function modalRezalt(text, statusBtn) {
  const $modalBody = document.createElement('div'),
        $modalBox = document.createElement('div'),
        $modalText = document.createElement('h3'),
        $btnBox = document.createElement('div'),
        $btnRestart = document.createElement('button'),
        $btnOver = document.createElement('button');

  $modalText.textContent = text;
  $modalText.classList.add('modal__text');

  $btnRestart.textContent = 'Играть еще';
  $btnRestart.id = 'restart';
  $btnRestart.classList.add('btn-restart', 'button-end');
  $btnOver.textContent = 'Закончить игру';
  $btnOver.id = 'over';
  $btnOver.classList.add('btn-restart');

  if (statusBtn) {
    $btnRestart.style.display = statusBtn;
    $btnOver.style.display = statusBtn;
  };

  $btnBox.append($btnRestart, $btnOver);
  $btnBox.classList.add('btn-box');

  $modalBox.classList.add('modal__box');
  $modalBox.append($modalText, $btnBox);

  $modalBody.append($modalBox);
  $modalBody.classList.add('modal__body');

  $btnRestart.addEventListener('click', () => {
    $modalBody.remove();
    window.location.reload();
  });

  $btnOver.addEventListener('click', () => {
    $modalBody.remove();
    modalRezalt('Прощайте', 'none');
  });

  document.body.append($modalBody);
};

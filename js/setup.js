'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var KEY_CODES = {
  esc: 27,
  enter: 13
};

var userDialog = document.querySelector('.setup');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
var similarListElement = userDialog.querySelector('.setup-similar-list');
var userDialogOpen = document.querySelector('.setup-open');
var userDialogOpenIcon = userDialogOpen.querySelector('.setup-open-icon');
var userDialogClose = userDialog.querySelector('.setup-close');
var setupUserName = userDialog.querySelector('.setup-user-name');
var setupUserNameFocus;
var setupWizard = userDialog.querySelector('.setup-wizard');
var setupFireball = userDialog.querySelector('.setup-fireball-wrap');

function getRandomIndex(index) {
  return Math.floor(Math.random() * index);
}

function getWizard(names, surnames, coats, eyes) {
  var similarWizards = [];
  for (var i = 0; i < 4; i++) {
    similarWizards[i] = {
      name: names[getRandomIndex(names.length)] + ' ' + surnames[getRandomIndex(surnames.length)],
      coatColor: coats[getRandomIndex(coats.length)],
      eyesColor: eyes[getRandomIndex(eyes.length)]
    };
  }
  return similarWizards;
}

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

function init() {
  var wizards = getWizard(WIZARD_NAMES, WIZARD_SURNAMES, COAT_COLORS, EYES_COLORS);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
  userDialogOpenIcon.tabIndex = 0;
  userDialogClose.tabIndex = 0;
  setupUserName.required = true;
  setupUserName.minLength = 2;
  setupUserName.maxLength = 25;
  userDialog.querySelector('.setup-wizard-form').action = 'https://1510.dump.academy/code-and-magick';
}

function showUserDialog() {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onUserDialogEscPress);
}

function hideUserDialog() {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onUserDialogEscPress);
}

function onUserDialogEscPress(evt) {
  if (evt.keyCode === KEY_CODES.esc && !setupUserNameFocus) {
    hideUserDialog();
  }
}

userDialogOpen.addEventListener('click', function() {
  showUserDialog();
});

userDialogOpen.addEventListener('keydown', function(evt) {
  if (evt.keyCode === KEY_CODES.enter) {
    showUserDialog();
  }
});

userDialogClose.addEventListener('click', function() {
  hideUserDialog();
});

userDialogClose.addEventListener('keydown', function(evt) {
  if (evt.keyCode === KEY_CODES.enter) {
    hideUserDialog();
  }
});

setupUserName.onblur = function() {
  setupUserNameFocus = 0;
};

setupUserName.onfocus = function() {
  setupUserNameFocus = 1;
};

setupWizard.querySelector('.wizard-coat').addEventListener('click', function() {
  setupWizard.querySelector('.wizard-coat').style.fill = COAT_COLORS[getRandomIndex(COAT_COLORS.length)];
});

setupWizard.querySelector('.wizard-eyes').addEventListener('click', function() {
  setupWizard.querySelector('.wizard-eyes').style.fill = EYES_COLORS[getRandomIndex(EYES_COLORS.length)];
});

setupFireball.addEventListener('click', function() {
  setupFireball.style.backgroundColor = FIREBALL_COLORS[getRandomIndex(FIREBALL_COLORS.length)];
});

init();

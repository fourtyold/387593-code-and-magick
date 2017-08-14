'use strict';
window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);
  ctx.fillStyle = 'white';
  ctx.fillRect(100, 10, 420, 270);
  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var max = -1;
  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
    }
  }
  var histogramHeight = 150;
  var step = histogramHeight / max;
  var barWidth = 40;
  var indent = 50;
  var initialX = 140;
  var initialY = 100;
  var lineHeight = 20;

  ctx.textBaseLine = 'top';

  for (i = 0; i < times.length; i++) {
    ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random() + ')';
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillRect(initialX + (indent + barWidth) * i, initialY + (histogramHeight - times[i] * step), barWidth, times[i] * step);
    ctx.fillStyle = 'black';
    ctx.fillText(names[i], initialX + (indent + barWidth) * i, initialY + histogramHeight + lineHeight);
    ctx.fillText(times[i].toFixed(), initialX + (indent + barWidth) * i, initialY + (histogramHeight - times[i] * step) - lineHeight);
  }
};

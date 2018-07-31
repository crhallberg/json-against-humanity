function toggle(source) {
  var checkboxes = document.querySelectorAll('input[type=checkbox]');
  for(var i=checkboxes.length;i--;) {
    if (checkboxes[i].className != 'toggle') {
      checkboxes[i].checked = source.checked;
    }
  }
}
function toggleOfficial(source) {
  var checkboxes = document.querySelectorAll('input[type=checkbox]:not(.toggle)');
  for(var i=checkboxes.length;i--;) {
    checkboxes[i].checked = source.checked && checkboxes[i].className == 'official';
  }
}

fetch('../data/order.json').then(response => response.json()).then(function(deck) {
  var html = '';
  for(var i=0;i<deck.order.length;i++) {
    html += '<div class="chex">'
      + '<input type="checkbox" name="decks[]" value="'+deck.order[i]+'" id="'+deck.order[i]+'"';
    if (deck[deck.order[i]].name[0] != '[') {
      html += ' class="official"';
    }
    if(i == 0) {
      html += ' checked';
    }
    html += '> <label for="'+deck.order[i]+'">'+deck[deck.order[i]].name;
    if(deck[deck.order[i]].icon) {
      if (deck.order[i].match('greenbox')) {
        html += ' <i class="fa green fa-square"></i>';
      } else if(typeof deck[deck.order[i]].icon === "string") {
        html += ' <i class="fa fa-'+deck[deck.order[i]].icon+'"></i>';
      } else {
        html += ' <i class="fa fa-number">'+deck[deck.order[i]].icon+'</i>';
      }
    }
    if (deck.order[i].match('CAHe[1-3]')) {
      html += ' <span role="tooltip" class="red" aria-label="Part of the Red Box Expansion"><i class="fa red fa-square"></i></span>';
    }
    if (deck.order[i].match('CAHe[4-6]')) {
      html += ' <span role="tooltip" class="blue" aria-label="Part of the Blue Box Expansion"><i class="fa blue fa-square"></i></span>';
    }
    html += '</label></div>';
  }
  document.getElementById('deck-list').innerHTML = html;
  document.querySelector('.top-toggles').classList.remove('hidden');
});

async function showCountry(code) {
  document.title = 'Task 1 | Countries | ' + code;
  const res = await fetch(
    'https://countriesnode.herokuapp.com/v1/countries/' + code
  );
  const json = await res.json();
  node.innerHTML =
    '<div class="country"><span class="currency"><span>Currency:</span>' +
    json['currency'] +
    '</span></span><span class="areacode"><span>Area Code:</span><span>' +
    json['phone'] +
    '</span></span></div>';
}

async function showCountries() {
  document.title = 'Task 1 | Countries';
  const res = await fetch('https://countriesnode.herokuapp.com/v1/countries');
  const json = await res.json();
  node.innerHTML = json
    .map(
      c =>
        '<div class="item" onclick="goTo(\'countries/' +
        c.code +
        "'," +
        false +
        ')"><div class="left"><span>' +
        c.name +
        '</span><span>' +
        c.native +
        '</span></div><div class="right"><span>' +
        c.continent +
        '</span><span>' +
        c.languages.join(', ') +
        '</span></div></div>'
    )
    .join('');
}

function showHome() {
  document.title = 'Task 1 | Home';
  node.innerHTML =
    '<a class="route" onclick="goTo(\'countries\')">Countries</a>';
}

async function goTo(page, isDirectAccess = true) {
  if (page == 'countries') {
    history.pushState('countries', null, 'countries');
    await showCountries();
  } else if (/^countries\/[A-Z]+$/.test(page)) {
    var code = page.split('/')[1];
    if (isDirectAccess) {
      history.pushState('countries/' + code, null, null);
    } else {
      history.pushState('countries/' + code, null, 'countries/' + code);
    }
    await showCountry(code);
  } else {
    history.pushState('home', null, '');
    return showHome();
  }
}

async function goBack(page) {
  if (page == 'countries') {
    await showCountries();
  } else if (/^countries\/[A-Z]+$/.test(page)) {
    await showCountry(page.split('/')[1]);
  } else if (page == 'home') {
    return showHome();
  }
}

window.addEventListener('popstate', function(e) {
  var page = e.state;
  if (page != null) {
    goBack(page);
  }
});

var node = document.getElementById('root');
goTo(window.location.pathname.substring(1));

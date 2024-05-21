
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('formularzKarmy').addEventListener('submit', function(e) {
    e.preventDefault();

    // Pobranie wartości z formularza
    const bialko = parseFloat(document.getElementById('bialko').value);
    const tluszcz = parseFloat(document.getElementById('tluszcz').value);
    const popiol = parseFloat(document.getElementById('popiol').value);
    const wlokno = parseFloat(document.getElementById('wlokno').value);
    const wilgotnosc = parseFloat(document.getElementById('wilgotnosc').value);
    const fosfor = parseFloat(document.getElementById('fosfor').value);

    // Obliczenie mokrej masy
    const mokraMasa = 100 - bialko - tluszcz - popiol - wlokno - wilgotnosc;

    // Obliczenie suchej masy
    const suchaMasa = 100 - wilgotnosc;

    // Obliczenie węglowodanów w suchej masie
    const weglo = (mokraMasa / suchaMasa) * 100;

    // Obliczenie procentowej zawartości składników na suchą masę
    const fosforNaSuchaMase = (fosfor / suchaMasa) * 100;
    const bialkoNaSuchaMase = (bialko / suchaMasa) * 100;
    const tluszczNaSuchaMase = (tluszcz / suchaMasa) * 100;

    const wynikiContainer = document.getElementById('wynikiContainer');
    wynikiContainer.innerHTML = `
      <div class="alert alert-success">
        <p>Mokra masa: <strong>${mokraMasa.toFixed(2)}%</strong></p>
        <p>Sucha masa: <strong>${suchaMasa.toFixed(2)}%</strong></p>
        <p>Węglowodany: <strong>${weglo.toFixed(2)}%</strong></p>
        <p>Fosfor: <strong>${fosforNaSuchaMase.toFixed(2)}%</strong></p>
        <p>Białko: <strong>${bialkoNaSuchaMase.toFixed(2)}%</strong></p>
        <p>Tłuszcz: <strong>${tluszczNaSuchaMase.toFixed(2)}%</strong></p>
    `;

  });
});
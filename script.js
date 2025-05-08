function searchCountry() {
    const searchInput = document.querySelector('.search-bar');
    const content = document.getElementById('content');
    const countryName = searchInput.value.trim();

    if (!countryName) return;

    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => response.json())
        .then(data => {
            content.innerHTML = '';
            data.forEach(country => {
                const countryCard = document.createElement('div');
                countryCard.className = 'country-card';
                countryCard.innerHTML = `
                    <img src="${country.flags.png}" alt="${country.flags.alt || 'Country flag'}">
                    <h3>${country.name.common}</h3>
                    <p><strong>Capital:</strong> ${country.capital?.[0] || 'N/A'}</p>
                    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                    <p><strong>Region:</strong> ${country.region}</p>
                    <p><strong>Languages:</strong> ${Object.values(country.languages || {}).join(', ') || 'N/A'}</p>
                `;
                content.appendChild(countryCard);
            });
        })
        .catch(error => {
            content.innerHTML = '<p class="error">Country not found. Please try again.</p>';
        });
}

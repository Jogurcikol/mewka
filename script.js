// script.js

// --- Dane o kategoriach i przedmiotach (Twoje dane, przeniesione z HTML) ---
const categoriesData = {
    "Metody": [
        { name: "Rockstar Method", price: "20 zł", details: "Wyślij sumę 20 zł na numer 508 478 404." },
        { name: "Uber Method", price: "10 zł", details: "Wyślij sumę 10 zł na numer 508 478 404." },
        { name: "Paypal Hitting", price: "20 zł", details: "Wyślij sumę 20 zł na numer 508 478 404." },
        { name: "Members Discord", price: "Cena na tickecie", details: "Cena ustalana na tickecie, minimalna kwota to 5 zł." }
    ],
    "Hacking": [
        { name: "acc-crack", price: "Cena na tickecie", details: "Cena ustalana na tickecie." },
        { name: "free-streaming-itp", price: "10 zł", details: "Wyślij sumę 10 zł (PSC +20%) na numer 508 478 404." },
        { name: "free-spotify-p", price: "10 zł", details: "Wyślij sumę 10 zł (PSC +20%) na numer 508 478 404." },
        { name: "rat-tools", price: "100 zł", details: "Wyślij sumę 100 zł (PSC +20%) na numer 508 478 404." }
    ],
    "Rzeczy Do Kupna": [
        { name: "Generator-Nitro", price: "10 zł", details: "Wyślij sumę 10 zł (PSC +20%) na numer 508 478 404." },
        { name: "Rangi", price: "10 zł", details: "Ranga Seller: 10 zł (PSC +20%)." },
        { name: "Gry", price: "Różne", details: "Ceny gier: od 4 zł do 20 zł (szczegóły w opisie)." },
        { name: "Ludzi-na-serwer", price: "Cena na tickecie", details: "Cena ustalana na tickecie, minimum jaki musicie posiadać to 5 zł." },
        { name: "Konto-Discord", price: "2 zł", details: "Wyślij sumę 2 zł (PSC +20%) na numer 508 478 404." },
        { name: "Konto-TikTok", price: "2 zł", details: "Wyślij sumę 2 zł (PSC +20%) na numer 508 478 404." },
        { name: "Konto-Steam", price: "5 zł", details: "Wyślij sumę 5 zł (PSC +20%) na numer 508 478 404." },
        { name: "Aplikacja-do-metody-steam", price: "10 zł", details: "Wyślij sumę 10 zł (PSC +20%) na numer 508 478 404." },
        { name: "Naprawka-pliku-st", price: "10 zł", details: "Wyślij sumę 10 zł (PSC +20%) na numer 508 478 404." },
        { name: "Wymiana-waluty", price: "Cena na tickecie", details: "Cena ustalana na tickecie." },
        { name: "Modelki", price: "Cena na tickecie", details: "Cena ustalana na tickecie." },
        { name: "Nowa-Era", price: "Cena na tickecie", details: "Cena ustalana na tickecie." },
        { name: "Forza-Horizon-5-Full", price: "Cena na tickecie", details: "Cena ustalana na tickecie." },
        { name: "HBO-Max", price: "Cena na tickecie", details: "Cena ustalana na tickecie." }
    ]
};

// Dodatkowe szczegóły dla gier (Twoje dane, przeniesione z HTML)
const gameDetails = {
    "Gry": [
        { name: "Gierka od 0 do 50zł", price: "4 zł", details: "Wyślij 4 zł." },
        { name: "Gierka od 50 do 150zł", price: "5 zł", details: "Wyślij 5 zł." },
        { name: "Gierka od 150 w górę", price: "6 zł", details: "Wyślij 6 zł." },
        { name: "Pakiet 2 gierek od 0 do 50zł", price: "6 zł", details: "Wyślij 6 zł." },
        { name: "Pakiet 2 gierek od 50 do 150zł", price: "8 zł", details: "Wyślij 8 zł." },
        { name: "Pakiet 2 gierek od 150 w górę", price: "10 zł", details: "Wyślij 10 zł." },
        { name: "Pakiet losowych 2 gierek", price: "5 zł", details: "Wyślij 5 zł." },
        { name: "Pakiet losowych 3 gierek", price: "8 zł", details: "Wyślij 8 zł." },
        { name: "Pakiet losowych 4 gierek", price: "11 zł", details: "Wyślij 11 zł." },
        { name: "Pakiet losowych 5 gierek", price: "14 zł", details: "Wyślij 14 zł." },
        { name: "Pakiet losowych 6 gierek", price: "17 zł", details: "Wyślij 17 zł." },
        { name: "Pakiet losowych 7 gierek", price: "20 zł", details: "Wyślij 20 zł." }
    ]
};

let currentCategory = ''; // Przechowuje aktualnie wybraną kategorię
let previousScreenId = 'mainScreen'; // Śledzi poprzedni ekran

// --- Funkcje do obsługi ekranów ---

/**
 * Przełącza widoczność ekranów w aplikacji.
 * Dodaje klasy do animacji.
 * @param {string} screenId ID ekranu, który ma zostać aktywny.
 */
function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        if (screen.id === screenId) {
            screen.classList.add('active');
            // Resetuj animację, aby zawsze się pojawiała
            screen.style.animation = 'none';
            void screen.offsetWidth; // Trigger reflow
            screen.style.animation = null;
        } else {
            screen.classList.remove('active');
        }
    });
    // Zapisz aktualny ekran jako poprzedni, jeśli nie jest to ekran szczegółów
    if (screenId !== 'itemDetailsScreen') {
        previousScreenId = screenId;
    }
}

/**
 * Generuje i wyświetla ekran z kategoriami.
 */
function showCategoriesScreen() {
    const categoryGrid = document.getElementById('categoryGrid');
    categoryGrid.innerHTML = ''; // Wyczyść poprzednie kategorie

    Object.keys(categoriesData).forEach(categoryName => {
        const card = document.createElement('button'); // Używamy button zamiast div dla dostępności
        card.type = 'button';
        card.classList.add('grid-card', 'glow-on-hover'); // Dodajemy klasę glow-on-hover
        card.innerHTML = `<span class="category-name">${categoryName}</span>`; // Dodajemy span dla lepszej kontroli CSS
        card.dataset.category = categoryName; // Użyj data attribute zamiast onclick
        categoryGrid.appendChild(card);
    });

    showScreen('categoriesScreen');
}

/**
 * Generuje i wyświetla ekran z przedmiotami danej kategorii.
 * @param {string} categoryName Nazwa kategorii do wyświetlenia.
 */
function showItemsScreen(categoryName) {
    currentCategory = categoryName; // Zapisz aktualną kategorię
    document.getElementById('itemsHeaderTitle').innerText = categoryName;
    const itemGrid = document.getElementById('itemGrid');
    itemGrid.innerHTML = ''; // Wyczyść poprzednie przedmioty

    let itemsToShow = categoriesData[categoryName];

    // Specjalna obsługa dla kategorii "Gry"
    if (categoryName === "Rzeczy Do Kupna" && itemsToShow.some(item => item.name === "Gry")) {
        itemsToShow = [];
        categoriesData[categoryName].forEach(item => {
            if (item.name === "Gry") {
                gameDetails["Gry"].forEach(game => itemsToShow.push(game));
            } else {
                itemsToShow.push(item);
            }
        });
    }

    itemsToShow.forEach(item => {
        const card = document.createElement('button'); // Używamy button
        card.type = 'button';
        card.classList.add('grid-card', 'glow-on-hover'); // Dodajemy klasę glow-on-hover
        card.innerHTML = `<span class="item-name">${item.name}</span> <br> <span class="item-price">Cena: ${item.price}</span>`;
        card.dataset.itemName = item.name;
        card.dataset.itemDetails = item.details;
        itemGrid.appendChild(card);
    });

    showScreen('itemsScreen');
}

/**
 * Pokazuje ekran szczegółów przedmiotu.
 * @param {string} itemName Nazwa przedmiotu.
 * @param {string} itemDetails Szczegóły przedmiotu.
 */
function showItemDetails(itemName, itemDetails) {
    document.getElementById('itemTitle').innerText = itemName;
    document.getElementById('itemPaymentInfo').innerText = itemDetails + "\n\nZrób screena że wysyłałeś pieniądze, a następnie stwórz ticketa na naszym discordzie.";
    showScreen('itemDetailsScreen');
}

/**
 * Funkcja do otwierania linku Discorda.
 */
function openDiscord() {
    window.open("https://discord.gg/aTHTuQ8g", "_blank", "noopener,noreferrer");
}

/**
 * Wraca do poprzedniego ekranu przedmiotów po wyświetleniu szczegółów.
 */
function showPreviousItems() {
    showItemsScreen(currentCategory); // Po prostu odświeżamy listę przedmiotów w bieżącej kategorii
}

// --- Inicjalizacja i obsługa zdarzeń ---

// Domyślnie pokaż ekran główny po załadowaniu DOM
document.addEventListener('DOMContentLoaded', () => {
    showScreen('mainScreen');
    initParticles(); // Inicjalizuj particles.js
});

// Delegowanie zdarzeń dla przycisków w całym `app-container`
// To jest bardziej efektywne niż dodawanie `onclick` do każdego elementu
document.querySelector('.app-container').addEventListener('click', (event) => {
    const target = event.target.closest('.button, .grid-card'); // Znajdź najbliższy przycisk lub kartę

    if (!target) return; // Jeśli nie kliknięto na przycisk/kartę, zakończ

    if (target.dataset.action) {
        // Obsługa przycisków akcji (np. z mainScreen, back-buttons)
        switch (target.dataset.action) {
            case 'showCategoriesScreen':
                showCategoriesScreen();
                break;
            case 'showMainScreen':
                showScreen('mainScreen');
                break;
            case 'showPreviousItems':
                showPreviousItems();
                break;
            case 'openDiscord':
                openDiscord();
                break;
        }
    } else if (target.classList.contains('grid-card')) {
        // Obsługa kliknięć na karty kategorii/przedmiotów
        if (target.dataset.category) {
            // Kliknięto kartę kategorii
            showItemsScreen(target.dataset.category);
        } else if (target.dataset.itemName && target.dataset.itemDetails) {
            // Kliknięto kartę przedmiotu
            showItemDetails(target.dataset.itemName, target.dataset.itemDetails);
        }
    }
});


// --- Inicjalizacja particles.js ---
function initParticles() {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80, // Liczba cząsteczek
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff" // Kolor cząsteczek (biały)
            },
            "shape": {
                "type": "circle", // Kształt cząsteczek (kółka)
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5, // Przezroczystość cząsteczek
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3, // Rozmiar cząsteczek
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true, // Czy cząsteczki mają być połączone liniami
                "distance": 150, // Długość linii
                "color": "#ffffff", // Kolor linii
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true, // Czy cząsteczki się poruszają
                "speed": 3, // Prędkość ruchu
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true, // Reakcja na najechanie myszką
                    "mode": "grab" // Tryb reakcji (łapanie cząsteczek)
                },
                "onclick": {
                    "enable": true, // Reakcja na kliknięcie
                    "mode": "push" // Tryb reakcji (dodawanie cząsteczek)
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 200,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
}

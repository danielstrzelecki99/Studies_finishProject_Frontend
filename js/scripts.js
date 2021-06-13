/*!
 * Start Bootstrap - Agency v7.0.4 (https://startbootstrap.com/theme/agency)
 * Copyright 2013-2021 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
 */
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    //===============================================================================
});

function sprawdzPole(pole_id, obiektRegex) {
    var obiektPole = document.getElementById(pole_id);
    if (!obiektRegex.test(obiektPole.value)) return (false);
    else return (true);
}

function zaznaczone_boxy() {
    let zaznaczone_boxy = "";
    if (document.getElementById("audio").checked) zaznaczone_boxy += "Premium Audio";
    if (document.getElementById("adaptacyjne_zawieszenie").checked) zaznaczone_boxy += " Adaptacyjne zawieszenie";
    if (document.getElementById("kamery_parkowania").checked) zaznaczone_boxy += " Kamery parkowania";

    return zaznaczone_boxy;
}

function zaznaczone_radio() {
    let obiekty = document.getElementsByName("payment-method");
    for (let i = 0; i < obiekty.length; i++) {
        if (obiekty[i].checked) {
            return obiekty[i].value;
        }
    }
}

function sprawdz() {
    var ok = true;
    obiektNazw = /^[A-ZĆĘŁŃŚŹŻ][a-ząćęłńóśźż]{2,20}$/;
    obiektemail =
        /^([a-zA-Z0-9])+([.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]+)+/;
    obiektNrTelefonu = /^[1-9][0-9]{8}$/;
    if (!sprawdzPole("lname", obiektNazw)) {
        ok = false;
        document.getElementById("im_error").innerHTML =
            "Wpisz poprawnie imie!";
    } else document.getElementById("im_error").innerHTML = "";
    if (!sprawdzPole("lsurname", obiektNazw)) {
        ok = false;
        document.getElementById("nazw_error").innerHTML =
            "Wpisz poprawnie nazwisko!";
    } else document.getElementById("nazw_error").innerHTML = "";
    if (!sprawdzPole("number", obiektNrTelefonu)) {
        ok = false;
        document.getElementById("number_error").innerHTML =
            "Wpisz poprawny numer telefonu!";
    } else document.getElementById("number_error").innerHTML = "";
    if (!sprawdzPole("adress_email", obiektemail)) {
        ok = false;
        document.getElementById("email_error").innerHTML =
            "Wpisz poprawnie email!";
    } else document.getElementById("email_error").innerHTML = "";

    if (ok) {
        let komunikat = "Dane z wypełnionego przez Ciebie formularza: " +
            "\nImię: " + document.getElementById("lname").value +
            "\nNazwisko: " + document.getElementById("lsurname").value +
            "\nNr telefonu: " + document.getElementById("number").value +
            "\nKraj: " + document.getElementById("country").value +
            "\nE-mail: " + document.getElementById("adress_email").value +
            "\nMarka i model: " + document.getElementById("markamodel").value +
            "\nTyp: " + document.getElementById("typ").value +
            "\nSilnik: " + document.getElementById("silnik").value +
            "\nKolor: " + document.getElementById("kolor").value +
            "\nWyposażenie: " + zaznaczone_boxy() +
            "\nSposób zapłaty: " + zaznaczone_radio();
        if (window.confirm(komunikat)) zapiszDane();
        else ok = false;
    }
    return ok
}

function zapiszDane() {
    var item = {};
    item.name = document.getElementById("lname").value;
    item.surname = document.getElementById("lsurname").value;
    item.number = document.getElementById("number").value;
    item.country = document.getElementById("country").value;
    item.mail = document.getElementById("adress_email").value;
    item.car = document.getElementById("markamodel").value;
    item.cartype = document.getElementById("typ").value;
    item.engine = document.getElementById("silnik").value;
    item.color = document.getElementById("kolor").value;
    item.equipment = zaznaczone_boxy();
    item.payment = zaznaczone_radio();
    var orders = JSON.parse(localStorage.getItem("orders"));
    if (orders === null) orders = [];
    orders.push(item);
    localStorage.setItem('orders', JSON.stringify(orders));
}

// function showProducts() {
//     var products = JSON.parse(localStorage.getItem('products'));
//     var el = document.getElementById('list');
//     var str = "<h2>Koszyk:</h2>";
//     if (products === null || products.length == 0) el.innerHTML = str + "<p>koszyk jest pusty</p>";
//     else {
//         str += '<table><thead><tr><th>Nazwa</th><th>Cena</th><th>Kolor</th><th>Ilość</th></tr></thead><tbody>'
//         for (i = 0; i < products.length; i++) {
//             str += '<tr>';
//             str += "<td>" + products[i].name + "</td>";
//             str += "<td>" + products[i].price + "</td>";
//             str += "<td>" + products[i].color + "</td>";
//             str += "<td>" + products[i].quantity + "</td>";
//             str += "<td><button onclick='deleteProduct(" + i + ")'>Usuń</button></td>";
//             str += "<td><button onclick='editProduct(" + i + ")'>Edytuj</button></td>";
//             str += "<td><p id='edit" + i + "'></p></td>"
//             str += "</tr>";
//         }
//         str += '</tbody></table>';
//         el.innerHTML = str;
//     }
// }
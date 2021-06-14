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
    pokazDane();
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
    pokazDane();
}

function pokazDane() {
    var orders = JSON.parse(localStorage.getItem('orders'));
    var el = document.getElementById('list');
    var str = "";
    if (orders === null || orders.length == 0) el.innerHTML = str + "<p>Nie zamówiłeś jeszcze żadnego auta</p>";
    else {
        str += '<table>'
        for (i = 0; i < orders.length; i++) {
            str += '<tr>';
            str += "<td>" + orders[i].car + "</td>";
            str += "<td>" + orders[i].cartype + "</td>";
            str += "<td>" + orders[i].engine + "</td>";
            str += "<td>" + orders[i].color + "</td>";
            str += "<td><button onclick='deleteProduct(" + i + ")'><i class='fas fa-trash-alt'></i></button></td>";
            str += "<td><button onclick='edytujDane(" + i + ")'><a href='#about'><i class='fas fa-edit'></i></a></button></td>";
            str += "<td><p id='edit" + i + "'></p></td>"
            str += "</tr>";
        }
        str += '</tbody></table>';
        el.innerHTML = str;
    }
}

function edytujDane(i) {
    var orders = JSON.parse(localStorage.getItem('orders'));
    var order = orders[i];
    document.getElementById("lname").value = order.name;
    document.getElementById("lsurname").value = order.surname;
    document.getElementById("number").value = order.number;
    document.getElementById("country").value = order.country;
    document.getElementById("adress_email").value = order.mail;
    document.getElementById("markamodel").value = order.car;
    document.getElementById("typ").value = order.cartype;
    document.getElementById("silnik").value = order.engine;
    document.getElementById("kolor").value = order.color;
    // item.equipment = zaznaczone_boxy();
    let obiekty = document.getElementsByName("payment-method");
    for (let i = 0; i < obiekty.length; i++) {
        if (order.payment == obiekty[i].value) {
            obiekty[i].checked = true;
        }
    }
    // product.name = document.getElementById("name").value;
    // product.price = document.getElementById("price").value;
    // product.color = document.getElementById("color").value;
    // product.quantity = document.getElementById("quantity").value;
    // products[i] = product;
    // localStorage.setItem('products', JSON.stringify(products));
    // modify = false;
    // showProducts();
    // clearInputs();
    // document.getElementById("edit" + i).innerHTML = "";
}
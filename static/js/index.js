if (document.querySelector('#start-button')) {
    var startButton = document.querySelector('#start-button');
    var input1 = document.querySelector('#input1-container');
    var input2 = document.querySelector('#input2-container');
    var result = document.querySelector('#result-container');
    var next1 = document.querySelector('#next1');
    var back1 = document.querySelector('#back1');
    var next2 = document.querySelector('#next2');
    var back2 = document.querySelector('#back2');
    var back3 = document.querySelector('#back3');
    var start = document.querySelector('#back');

    var period;
    var rate;

    var topDesktop1 = '25vh';
    var topDesktop2 = '30vh';
    var topMobile1 = '15vh';
    var topMobile2 = '20vh';
    
    var displayComponent = startButton;
    var listComponent = [startButton, input1, input2, result];

    var message1 = document.querySelector('#message1');
    var message2 = document.querySelector('#message2');
    var listInput1 = document.getElementsByClassName('input1');
    var listLabel1 = document.getElementsByClassName('label1');
    for (let i = 0; i < listInput1.length; i++) {
        listInput1[i].onchange = function() {
            if (listInput1[i].value != '') {
                listLabel1[i].style.top = '-25px';
                listLabel1[i].style.fontSize = '15px';
            } else if (listInput1[i].value == '') {
                listLabel1[i].style.top = '0';
                listLabel1[i].style.fontSize = '18px';
            }
        }
        listInput1[i].oninput = function() {
            if (listInput1[i].value != '') {
                listLabel1[i].style.top = '-25px';
                listLabel1[i].style.fontSize = '15px';
            } else if (listInput1[i].value == '') {
                listLabel1[i].style.top = '0';
                listLabel1[i].style.fontSize = '18px';
            }
        }
    }

    startButton.onclick = function() {
        displayComponent = display(input1, listComponent, 'flex');
    }

    back1.onclick = function() {
        displayComponent = display(startButton, listComponent, 'block');
    }

    next1.onclick = function() {
        var message = validateInput1(listInput1);
        if (message == true) {
            period = Number(listInput1[0].value);
            rate = Number(listInput1[1].value);
            displayComponent = display(input2, listComponent, 'flex');
            var table = document.querySelector('#table-body');
            var tableHTML = '';
            for (let i = 0; i < period; i++) {
                tableHTML = tableHTML.concat(`
                    <tr>
                        <td>${ i + 1 }</td>
                        <td><input type="text"></td>
                        <td><input type="text"></td>
                    </tr>
                `);
            }
            table.innerHTML = tableHTML;
        } else {
            displayMessage(message, message1);
        }
    }

    back2.onclick = function() {
        displayComponent = display(input1, listComponent, 'flex');
    }

    next2.onclick = function() {
        displayComponent = display(result, listComponent, 'flex');
    }

    back3.onclick = function() {
        displayComponent = display(input2, listComponent, 'flex');
    }

    start.onclick = function() {
        displayComponent = display(startButton, listComponent, 'block');
    }

    if (document.querySelector('#information') && document.querySelector('#info-link')) {
        var teamInfo = document.querySelector('#information');
        var infoLink = document.querySelector('#info-link');
    
        infoLink.onmouseover = function() {
            teamInfo.style.opacity = '1';
            if (window.innerWidth > 768) {
                teamInfo.style.top = topDesktop1;
            } else {
                teamInfo.style.top = topMobile1;
            }
            unDisplay(listComponent);
        }
    
        infoLink.onmouseout = function() {
            teamInfo.style.opacity = '0';
            if (window.innerWidth > 768) {
                teamInfo.style.top = topDesktop2;
            } else {
                teamInfo.style.top = topMobile2;
            }
            reDisplay(displayComponent);
        }
    }
    
    if (document.querySelector('#tutorial') && document.querySelector('#tut-link')) {
        var tutorial = document.querySelector('#tutorial');
        var tutLink = document.querySelector('#tut-link');

        tutLink.onmouseover = function() {
            tutorial.style.opacity = '1';
            if (window.innerWidth > 768) {
                tutorial.style.top = topDesktop1;
            } else {
                tutorial.style.top = topMobile1;
            }
            unDisplay(listComponent);
        }
    
        tutLink.onmouseout = function() {
            tutorial.style.opacity = '0';
            if (window.innerWidth > 768) {
                tutorial.style.top = topDesktop2;
            } else {
                tutorial.style.top = topMobile2;
            }
            reDisplay(displayComponent);
        }
    }

    function display(displayComponent, listComponent, displayProperty) {
        listComponent.forEach((component) => {
            if (
                component != displayComponent &&
                component.style.display != 'none' &&
                component.style.opacity != '0'
            ) {
                component.style.display = 'none';
                component.style.opacity = '0';
                displayComponent.style.display = displayProperty;
                displayComponent.style.opacity = '1';
            }
        })
        return displayComponent;
    }

    function unDisplay(listComponent) {
        listComponent.forEach((component) => {
            component.style.opacity = '0';
        })
    }

    function reDisplay(displayComponent) {
        displayComponent.style.opacity = '1';
    }

    function validateInput1(listInput1) {
        var period = Number(listInput1[0].value);
        var rate = Number(listInput1[1].value);
        var message = '';
        if (isNaN(period)) {
            message = message.concat('Number of period must be positive number smaller than 13!');
        } else if (period <= 0 || period > 12) {
            message = message.concat('Number of period must be positive number smaller than 13!');
        }
        if (isNaN(rate)) {
            message = message.concat('<br>Rate must be positive number smaller than 100!');
        } else if (rate <= 0 || rate > 100) {
            message = message.concat('<br>Rate must be positive number smaller than 100!');
        }
        if (message == '') {
            return true;
        }
        return message;
    }

    function validateInput2(input2) {
        
    }

    function displayMessage(message, obj) {
        obj.innerHTML = message;
        setTimeout(function() {
            obj.innerHTML = '';
        }, 5000);
    }
}
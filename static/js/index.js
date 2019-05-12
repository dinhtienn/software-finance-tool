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
    var resultValue = document.querySelector('#value');

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
    var listInput2;
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
            rate = Number(listInput1[1].value) / 100;
            displayComponent = display(input2, listComponent, 'flex');
            var table = document.querySelector('#table-body');
            var tableHTML = '';
            for (let i = 0; i < period; i++) {
                tableHTML = tableHTML.concat(`
                    <tr>
                        <td>${ i + 1 }</td>
                        <td><input type="text" class="input2 benefit"></td>
                        <td><input type="text" class="input2 cost"></td>
                    </tr>
                `);
            }
            table.innerHTML = tableHTML;
            listInput2 = document.getElementsByClassName('input2');
        } else {
            displayMessage(message, message1);
        }
    }

    back2.onclick = function() {
        displayComponent = display(input1, listComponent, 'flex');
    }

    next2.onclick = function() {
        if (validateInput2(listInput2)) {
            var listBenefitDom = document.getElementsByClassName('benefit');
            var listCostDom = document.getElementsByClassName('cost');
            var listBenefit = listValue(listBenefitDom);
            var listCost = listValue(listCostDom);
            var listCashFlow = findListCashFlow(listBenefit, listCost);

            var pv = PV(period, rate, listBenefit[0], listCost[0]);
            var fw = FW(pv, period, rate);
            var npv = NPV(period, rate, listCashFlow);
            var nfv = NFV(npv, period, rate);
            var irr = IRR(period, rate, listCashFlow);
            var pp = PP(listCashFlow, listCost, period);
            var roi = ROI(listCashFlow, listCost);
            
            displayComponent = display(result, listComponent, 'flex');
            resultValue.innerHTML = `
                <li><i class="fas fa-long-arrow-alt-right"></i>$ ${ pv }</li>
                <li><i class="fas fa-long-arrow-alt-right"></i>$ ${ fw }</li>
                <li><i class="fas fa-long-arrow-alt-right"></i>$ ${ npv }</li>
                <li><i class="fas fa-long-arrow-alt-right"></i>$ ${ nfv }</li>
                <li><i class="fas fa-long-arrow-alt-right"></i>${ irr } %</li>
                <li><i class="fas fa-long-arrow-alt-right"></i>${ pp } years</li>
                <li><i class="fas fa-long-arrow-alt-right"></i>${ roi } %</li>
            `;
        } else {
            displayMessage('Benefit and Cost must be positive number!', message2);
        }
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

    function validateInput2(listInput2) {
        for (let i = 0; i < listInput2.length; i++) {
            if (isNaN(Number(listInput2[i].value))) {
                return false;
            } else if(listInput2[i].value == '') {
                return false;
            }
        }
        return true;
    }

    function displayMessage(message, obj) {
        obj.innerHTML = message;
        if (obj == message2) {
            document.querySelector('#message2-container').style.display = 'block';
        }
        setTimeout(function() {
            obj.innerHTML = '';
            if (obj == message2) {
                document.querySelector('#message2-container').style.display = 'none';
            }
        }, 5000);
    }

    function listValue(listDom) {
        var listValue = [];
        for (let i = 0; i < listDom.length; i ++) {
            listValue.push(Number(listDom[i].value));
        }
        return listValue;
    }

    function findListCashFlow(listBenefit, listCost) {
        var listCashFlow = [];
        for (let i = 0; i < listBenefit.length; i ++) {
            listCashFlow.push(listBenefit[i] - listCost[i]);
        }
        return listCashFlow;
    }

    function totalCashFlow(listCashFlow) {
        var total = 0;
        listCashFlow.forEach((cashFlow) => {
            total += cashFlow;
        })
        return total;
    }

    function totalCost(listCost) {
        var total = 0;
        listCost.forEach((cost) => {
            total += cost;
        })
        return total;
    }

    function roundNumber(number) {
        return Math.floor(number * 100) / 100;
    }

    function PV(period, rate, benefit1, cost1) {
        var pv = ((Number(benefit1) - Number(cost1)) / ((1 + rate) ** period));
        if (pv < 0) pv = 0 - pv;
        return roundNumber(pv);
    }

    function FW (pv, period, rate) {
        var fw = pv * ((1 + rate) ** period);
        return roundNumber(fw);
    }

    function NPV(period, rate, listCashFlow) {
        var npv = 0;
        for (let i = 0; i < period; i++) {
            npv += listCashFlow[i] / ((1 + rate) ** (i + 1));
        }
        return roundNumber(npv);
    }

    function NFV(npv, period, rate) {
        var nfv = npv * ((1 + rate) ** period)
        return roundNumber(nfv);
    }

    function IRR(period, rate, listCashFlow) {
        var valid = 1;
        var running = true;
        var lastRate = 0;
        var npv;
        var status = '';
        while (running) {
            npv = NPV(period, rate, listCashFlow);
            if (npv < valid && npv > (0 - valid)) {
                return roundNumber(rate * 100);
            } else if (npv < 0) {
                if (status == 'positive') {
                    return roundNumber(((rate + lastRate) * 100) / 2);
                }
                status = 'negative';
                lastRate = rate;
                rate -= 0.01;
            } else if (npv > 0) {
                if (status == 'negative') {
                    return roundNumber(((rate + lastRate) * 100) / 2);
                }
                lastRate = rate;
                rate += 0.01;
            }
            if (rate < 0 || rate > 1) {
                return '?';
            }
        }
    }

    function PP(listCashFlow, listCost, period) {
        var check = totalCashFlow(listCashFlow) / totalCost(listCost);
        if (check < 1) {
            return `more than ${ period }`;
        }
        for (let i = 0; i < period; i ++) {
            check = totalCashFlow(listCashFlow.slice(0, i + 1)) / totalCost(listCost.slice(0, i + 1));
            if (check >= 1) {
                return i + 1;
            }
        }
    }

    function ROI(listCashFlow, listCost) {
        var roi = (totalCashFlow(listCashFlow) * 100) / totalCost(listCost);
        return roundNumber(roi);
    }
}
if (document.querySelector('#start-button')) {
    var startButton = document.querySelector('#start-button');
    var input1 = document.querySelector('#input1-container');
    var next1 = document.querySelector('#next1');
    var back1 = document.querySelector('#back1');
    var displayComponent = startButton;
    var listComponent = [startButton, input1];

    startButton.onclick = function() {
        displayComponent = display(input1, listComponent, 'flex');
    }

    back1.onclick = function() {
        displayComponent = display(startButton, listComponent, 'block');
    }

    if (document.querySelector('#information') && document.querySelector('#info-link')) {
        var teamInfo = document.querySelector('#information');
        var infoLink = document.querySelector('#info-link');
    
        infoLink.onmouseover = function() {
            teamInfo.style.opacity = '1';
            teamInfo.style.top = '25vh';
            unDisplay(listComponent);
        }
    
        infoLink.onmouseout = function() {
            teamInfo.style.opacity = '0';
            teamInfo.style.top = '30vh';
            reDisplay(displayComponent);
        }
    }
    
    if (document.querySelector('#tutorial') && document.querySelector('#tut-link')) {
        var tutorial = document.querySelector('#tutorial');
        var tutLink = document.querySelector('#tut-link');
    
        tutLink.onmouseover = function() {
            tutorial.style.opacity = '1';
            tutorial.style.top = '25vh';
            unDisplay(listComponent);
        }
    
        tutLink.onmouseout = function() {
            tutorial.style.opacity = '0';
            tutorial.style.top = '30vh';
            reDisplay(displayComponent);
        }
    }

    function display(displayComponent, listComponent, displayProperty) {
        listComponent.forEach(function(component) {
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
        listComponent.forEach(function(component) {
            component.style.opacity = '0';
        })
    }

    function reDisplay(displayComponent) {
        displayComponent.style.opacity = '1';
    }
}
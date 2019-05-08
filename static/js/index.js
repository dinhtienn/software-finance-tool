if (document.querySelector('#information') && document.querySelector('#info-link')) {
    var teamInfo = document.querySelector('#information');
    var infoLink = document.querySelector('#info-link');

    infoLink.onmouseover = function() {
        teamInfo.style.opacity = '1';
        teamInfo.style.top = '25vh';
    }

    infoLink.onmouseout = function() {
        teamInfo.style.opacity = '0';
        teamInfo.style.top = '30vh';
    }
}

if (document.querySelector('#tutorial') && document.querySelector('#tut-link')) {
    var tutorial = document.querySelector('#tutorial');
    var tutLink = document.querySelector('#tut-link');

    tutLink.onmouseover = function() {
        tutorial.style.opacity = '1';
        tutorial.style.top = '25vh';
    }

    tutLink.onmouseout = function() {
        tutorial.style.opacity = '0';
        tutorial.style.top = '30vh';
    }
}
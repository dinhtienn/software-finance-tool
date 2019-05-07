if (document.querySelector('#information') && document.querySelector('#info-link')) {
    var teamInfo = document.querySelector('#information');
    var infoLink = document.querySelector('#info-link');

    infoLink.onmouseover = function() {
        teamInfo.style.opacity = '1';
    }

    infoLink.onmouseout = function() {
        teamInfo.style.opacity = '0';
    }
}
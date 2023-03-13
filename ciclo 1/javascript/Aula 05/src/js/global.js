// Selects mobile drop menu
const mobileMenu = document.getElementById("drop-menu");

// Function to make mobile menu show up
function openMenu() {
    mobileMenu.style.transform = "translateX(0)";
}

// Function to hide mobile menu
function closeMenu() {
    mobileMenu.style.transform = "translateX(-45vw)";
}

// Function that switch between Dark and Light mode
function switchColor() {
    // Every element that have to change its color must be declared here
    const bodyStyle = getComputedStyle(body);
    const primaryColor = document.getElementsByClassName("primary-color");
    const secondaryColor = document.getElementsByClassName("secondary-color");
    const tertiaryColor = document.getElementsByClassName("tertiary-color");
    const titleColor = document.getElementsByClassName("title");
    const subtitleColor = document.getElementsByClassName("subtitle");
    const textColor = document.getElementsByClassName("text");
    const linkColor = document.getElementsByClassName("link");
    const iconColor = document.getElementsByTagName("i");
    const dropMenuLink = document.getElementsByClassName("drop-link");
    const lightThemeIcon = document.getElementById("sun-figure");
    const darkThemeIcon = document.getElementById("moon-figure");

    // Initiates color theme logic
    // If the current color theme is dark, change every element to its counterpart color,
    // hide the dark theme switch, and show the light theme switch
    if (bodyStyle.backgroundColor == "rgb(34, 30, 45)") {
        darkThemeIcon.style.display = "inline-block";
        lightThemeIcon.style.display = "none";

        for (let i = 0; i < primaryColor.length; i++) {
            primaryColor[i].style.backgroundColor = "#FEF7E7";
            primaryColor[i].style.color = "#000";
        }
        for (let i = 0; i < secondaryColor.length; i++) {
            secondaryColor[i].style.backgroundColor = "#D4C9AE";
            secondaryColor[i].style.color = "#000";
        }
        for (let i = 0; i < tertiaryColor.length; i++) {
            tertiaryColor[i].style.backgroundColor = "#EDE4D1";
            tertiaryColor[i].style.color = "#000";
        }
        for (let i = 0; i < titleColor.length; i++) {
            titleColor[i].style.color = "#000";
        }
        for (let i = 0; i < subtitleColor.length; i++) {
            subtitleColor[i].style.color = "#000";
        }
        for (let i = 0; i < textColor.length; i++) {
            textColor[i].style.color = "#000";
        }
        for (let i = 0; i < linkColor.length; i++) {
            linkColor[i].style.color = "#000";
            linkColor[i].addEventListener("mouseover", function () {
                linkColor[i].style.borderBottom =
                    "1px solid rgba(100, 100, 100, 100)";
            });
            linkColor[i].addEventListener("mouseleave", function () {
                linkColor[i].style.borderBottom = "1px solid transparent";
            });
        }
        for (let i = 0; i < iconColor.length; i++) {
            iconColor[i].style.color = "#000";
        }
        for (let i = 0; i < dropMenuLink.length; i++) {
            dropMenuLink[i].style.color = "#000";
        }
    }
    // If the current color theme is light, change every element to its counterpart color,
    // hide the light theme switch, and show the dark theme switch
    else {
        darkThemeIcon.style.display = "none";
        lightThemeIcon.style.display = "inline-block";
        for (let i = 0; i < primaryColor.length; i++) {
            primaryColor[i].style.backgroundColor = "#221E2D";
            primaryColor[i].style.color = "#fff";
        }
        for (let i = 0; i < secondaryColor.length; i++) {
            secondaryColor[i].style.backgroundColor = "#413956";
            secondaryColor[i].style.color = "#fff";
        }
        for (let i = 0; i < tertiaryColor.length; i++) {
            tertiaryColor[i].style.backgroundColor = "#665a87";
            tertiaryColor[i].style.color = "#fff";
        }
        for (let i = 0; i < titleColor.length; i++) {
            titleColor[i].style.color = "#fff";
        }
        for (let i = 0; i < subtitleColor.length; i++) {
            subtitleColor[i].style.color = "#fff";
        }
        for (let i = 0; i < textColor.length; i++) {
            textColor[i].style.color = "#d0d0d0";
        }
        for (let i = 0; i < linkColor.length; i++) {
            linkColor[i].style.color = "#fff";
            linkColor[i].addEventListener("mouseover", function () {
                console.log("teste");
                linkColor[i].style.borderBottom =
                    "1px solid rgb(255, 255, 255)";
            });
            linkColor[i].addEventListener("mouseleave", function () {
                linkColor[i].style.borderBottom = "1px solid transparent";
            });
        }
        for (let i = 0; i < iconColor.length; i++) {
            iconColor[i].style.color = "#fff";
        }
        for (let i = 0; i < dropMenuLink.length; i++) {
            dropMenuLink[i].style.color = "#fff";
        }
    }
}

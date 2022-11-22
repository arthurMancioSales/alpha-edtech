// Selects mobile drop menu
const mobileMenu = document.getElementById("drop-menu");

const primaryDarkColor = "#221E2D"
const secondaryDarkColor = "#413956"
const tertiaryDarkColor = "#665a87"

const titleDarkColor = "#fff"
const textDarkColor = "#d0d0d0"
const linkDarkColor = "#fff"

const primaryLightColor = "#FEF7E7"
const secondaryLightColor = "#D4C9AE";
const tertiaryLightColor = "#EDE4D1";

const titleLightColor = "#000"
const textLightColor = "#000"

const lightThemeIcon = document.getElementById("sun-figure");
const darkThemeIcon = document.getElementById("moon-figure");

// Function to make mobile menu show up
function openMenu() {
    mobileMenu.style.transform = "translateX(0)";
}

// Function to hide mobile menu
function closeMenu() {
    mobileMenu.style.transform = "translateX(-50vw)";
}

// Function that switch between Dark and Light mode
function switchColor() {
    const root = document.querySelector(":root")
    const bodyStyle = getComputedStyle(body);
    
    if (bodyStyle.backgroundColor == "rgb(34, 30, 45)") { 
        darkThemeIcon.style.display = "inline-block";
        lightThemeIcon.style.display = "none";

        root.style.setProperty("--primary-color", primaryLightColor)
        root.style.setProperty("--secondary-color", secondaryLightColor)
        root.style.setProperty("--tertiary-color", tertiaryLightColor)
        root.style.setProperty("--title-color", titleLightColor)
        root.style.setProperty("--text-color", textLightColor)
    } else {
        darkThemeIcon.style.display = "none";
        lightThemeIcon.style.display = "inline-block";

        root.style.setProperty("--primary-color", primaryDarkColor)
        root.style.setProperty("--secondary-color", secondaryDarkColor)
        root.style.setProperty("--tertiary-color", tertiaryDarkColor)
        root.style.setProperty("--title-color", titleDarkColor)
        root.style.setProperty("--text-color", textDarkColor)
    }
}

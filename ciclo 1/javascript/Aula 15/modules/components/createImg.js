export default function CreateImg(src, height) {
    const img = document.createElement("img")
    img.src = src
    img.style.height = height

    return img
}
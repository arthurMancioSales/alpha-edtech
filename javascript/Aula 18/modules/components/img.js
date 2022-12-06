export default function CreateImg(src, id, height) {
    const img = document.createElement("img");
    img.id = id;
    img.src = src;
    img.style.height = height;

    return img;
}

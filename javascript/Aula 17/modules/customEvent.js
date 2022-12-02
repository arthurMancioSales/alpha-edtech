export default function EventoCustomizado(url) {
    return new CustomEvent("onstatechange", {detail: {url: url}});
}

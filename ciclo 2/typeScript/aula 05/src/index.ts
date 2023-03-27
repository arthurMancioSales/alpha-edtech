const rootElement = document.getElementById('root')!;
rootElement.innerHTML = 'Teste webpack';
rootElement.onmouseenter = () => rootElement.style.color = "crimson"
rootElement.onmouseleave = () => rootElement.style.color = "black"
function qsa(seletor) {
    return Array.from(document.querySelectorAll(seletor));
}

function ativarDetalhar(idElemento) {
    const elementos = qsa(`.experiencias_conteudo *[itemid="${idElemento}"]`);
    elementos.forEach((elemento) => elemento.setAttribute("itemprop", "detalhar:true"));
}

function desativarDetalhar() {
    const elementos = qsa(`.experiencias_conteudo *[itemprop*="detalhar:true"]`);
    elementos.forEach((elemento) => elemento.setAttribute("itemprop", "detalhar:false"));
}

function aoApertar(evento) {
    const idElemento = evento.target.attributes.itemid?.value || evento.target.parentNode.attributes.itemid.value;
    desativarDetalhar();
    ativarDetalhar(idElemento);
}

qsa(".experiencias_conteudo_linha-do-tempo button").forEach((item) => item.addEventListener("click", aoApertar));
qsa(".experiencias_conteudo_acontecimento").forEach((item) => item.addEventListener("click", aoApertar));

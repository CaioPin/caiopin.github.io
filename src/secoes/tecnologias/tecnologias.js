const tecnologias = [
    ["javascript", "typescript", "react", "react-native"],
    ["java", "spring-boot", "express", "go", "c", "ruby"],
    ["postgresql", "sqlite", "mongodb", "redis"],
    ["docker", "firebase", "shell", "figma"]
];
const cores = ["roxo", "laranja", "azul-claro", "vermelho"];

function qs(seletor) {
    return document.querySelector(seletor);
}

function qsa(seletor) {
    return Array.from(document.querySelectorAll(seletor));
}

function abrirSubmenu(idElemento) {
    const elemento = qs(`.tecnologias_selecao_submenu_opcoes[itemid="${idElemento}"]`);
    elemento.style.display = "flex";

    const container = qs(".tecnologias_selecao_submenu");
    const numeroId = idElemento.split("-")[2];
    const cor = cores[numeroId];
    container.setAttribute("itemprop", `cor:${cor}`);

    const imagemMenu = qs(`.tecnologias_selecao_menu_opcao[itemid="${idElemento}"] img`);
    imagemMenu.setAttribute("itemprop", "ativo:true");
}

function fecharSubemnus() {
    const elementos = qsa(".tecnologias_selecao_submenu_opcoes");
    elementos.forEach((elemento) => elemento.style.display = "none");

    const imagens = qsa(".tecnologias_selecao_menu img");
    imagens.forEach((imagem) => imagem.setAttribute("itemprop", "ativo:false"));
}

function aoApertarMenu(evento) {
    const idElemento = evento.target.attributes.itemid?.value || evento.target.parentNode.attributes.itemid.value;
    fecharSubemnus();
    abrirSubmenu(idElemento);
}

function detalharTecnologia(nomeTecnologia) {
    const elementos = qsa(".tecnologias_projeto");
    elementos.forEach((elemento) => {
        const propriedades = elemento.attributes.itemprop.value;
        const listaTecnologias = propriedades.split(";")[0];

        if (listaTecnologias.split(":")[1].split(" ").includes(nomeTecnologia)) {
            tecnologias.forEach((conjuntoTecnologias, indice) => {
                if (conjuntoTecnologias.includes(nomeTecnologia)) {
                    const cor = `cor:${cores[indice]}`;
                    elemento.setAttribute("itemprop", `${listaTecnologias};${cor}`);
                }
            });

            elemento.style.display = "flex";
        }
    });

    const icone = qs(`.tecnologias_selecao_submenu_opcao[itemid="${nomeTecnologia}"] img`);
    const texto = qs(`.tecnologias_selecao_submenu_opcao[itemid="${nomeTecnologia}"] span`);
    icone.setAttribute("itemprop", "ativo:true");
    texto.setAttribute("itemprop", "ativo:true");
}

function resumirTecnologias() {
    const elementos = qsa(".tecnologias_projeto");
    elementos.forEach((elemento) => elemento.style.display = "none");

    const icones = qsa(".tecnologias_selecao_submenu img");
    const textos = qsa(".tecnologias_selecao_submenu span");
    icones.forEach((icone) => icone.setAttribute("itemprop", "ativo:false"));
    textos.forEach((texto) => texto.setAttribute("itemprop", "ativo:false"));
}

function aoApertarSubmenu(evento) {
    const idElemento = evento.target.attributes.itemid?.value || evento.target.parentNode.attributes.itemid.value;
    resumirTecnologias();
    detalharTecnologia(idElemento);
}

function definirTecnologiaInicial() {
    const baseId = "selecao-menu-";

    const indiceMenu = Math.floor(Math.random() * (tecnologias.length - 1));
    const indiceTecnologia = Math.floor(Math.random() * (tecnologias[indiceMenu].length - 1));
    const tecnologia = tecnologias[indiceMenu][indiceTecnologia];

    abrirSubmenu(`${baseId}${(indiceMenu)}`);
    detalharTecnologia(tecnologia);
}

qsa(".tecnologias_selecao_menu_opcao").forEach((elemento) => elemento.addEventListener("click", aoApertarMenu));
qsa(".tecnologias_selecao_submenu_opcao").forEach((elemento) => elemento.addEventListener("click", aoApertarSubmenu));

definirTecnologiaInicial();

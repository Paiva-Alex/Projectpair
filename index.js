let ultimoClick = ""
document.addEventListener("DOMContentLoaded", function(e) {
    // Preencher as caixas com os filmes - Estado inicial
    axios.get('https://api.themoviedb.org/3/discover/movie?api_key=19f39f3c484954b02ac387996570be32')
        .then(response => {
            const filmes = response.data.results;
            const baselink = "https://image.tmdb.org/t/p/w500/"
            const tamanho = document.getElementById('tchau')

            filmes.forEach(filme => {
                var link = document.createElement('a')
                var imagem = document.createElement('img')
                link.classList.add("black");
                imagem.classList.add('tamanhoalex')
                imagem.setAttribute('src', `${baselink}/${filme.poster_path}`);
                link.appendChild(imagem)
                tamanho.appendChild(link)
            });
        })


    // Esse cara aqui é a lógica de fazer as estrelinhas ficarem amarelas
    const sefude = document.getElementsByClassName("coco")

    function removerEstrelaAmarelaIrmaoPraFrente(irmao) {
        if (irmao != null || undefined) {
            irmao.classList.remove("estrela");
            removerEstrelaAmarelaIrmaoPraFrente(irmao.nextElementSibling)
        }
    }

    function adicionarEstrelaAmarelaIrmaoPraTras(irmao) {
        if (irmao != null || undefined) {
            irmao.classList.add("estrela");
            adicionarEstrelaAmarelaIrmaoPraTras(irmao.previousElementSibling)
        }
    }

    function removerEstrelaAmarelaIrmaoPraTras(irmao) {
        if (irmao != null || undefined) {
            irmao.classList.remove("estrela");
            removerEstrelaAmarelaIrmaoPraTras(irmao.previousElementSibling)
        }
    }


    function removerEstrelaPraTrasSeJaFoiClicadaNelaAntes(currentTarget) {
        if (ultimoClick === currentTarget.id) {

            removerEstrelaAmarelaIrmaoPraTras(currentTarget)

            ultimoClick = ""

        } else {
            ultimoClick = event.currentTarget.id
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=19f39f3c484954b02ac387996570be32&query=`)

        }
    }

    for (var i = 0; i < sefude.length; i++) {
        sefude[i].addEventListener("click", function(event) {

            //Fazer toggle para todos os irmãos a esquerda x x x x x
            //console.log("penes")
            //console.log(event.currentTarget.previousSibling.previousSibling.firstChild.nextSibling.classList.toggle("estrela"))
            removerEstrelaAmarelaIrmaoPraFrente(event.currentTarget.nextElementSibling)
            adicionarEstrelaAmarelaIrmaoPraTras(event.currentTarget)
            removerEstrelaPraTrasSeJaFoiClicadaNelaAntes(event.currentTarget)
                //event.currentTarget.previousSibling.firstChild.classList.toggle("estrela")

        }, false);
    }

    //Lógica de busca
    const busca = document.getElementById("busca")
    const discover = document.getElementById('discover')
    busca.addEventListener("keyup", (event) => {
        if (event.target.value == "") {
            const tamanho = document.getElementById('tchau')
            discover.innerHTML = "Discover Movies"
            tamanho.innerHTML = 'Loading...'

            axios.get('https://api.themoviedb.org/3/discover/movie?api_key=19f39f3c484954b02ac387996570be32')
                .then(response => {
                    const filmes = response.data.results;
                    const baselink = "https://image.tmdb.org/t/p/w500/"

                    tamanho.innerHTML = ''
                    filmes.forEach(filme => {
                        var link = document.createElement('a')
                        var imagem = document.createElement('img')
                        link.classList.add("black");
                        imagem.classList.add('tamanhoalex')
                        imagem.setAttribute('src', `${baselink}/${filme.poster_path}`);
                        link.appendChild(imagem)
                        tamanho.appendChild(link)
                    });
                })
        } else {
            const tamanho = document.getElementById('tchau')
            discover.innerHTML = `Searching for: ${event.target.value}`
            tamanho.innerHTML = 'Loading...'
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=19f39f3c484954b02ac387996570be32&query=${event.target.value}`)
                .then(response => {
                    const filmes = response.data.results;
                    const baselink = "https://image.tmdb.org/t/p/w500/"
                    tamanho.innerHTML = ''
                    console.log(filmes.length)
                    if (filmes.length >= 1) {
                        filmes.forEach(filme => {
                            var link = document.createElement('a')
                            var imagem = document.createElement('img')
                            link.classList.add("black");
                            imagem.classList.add('tamanhoalex')
                            imagem.setAttribute('src', `${baselink}/${filme.poster_path}`);
                            link.appendChild(imagem)
                            tamanho.appendChild(link)
                        });
                    } else {
                        tamanho.innerHTML = 'No movies found :('
                    }
                })
        }
    })
});
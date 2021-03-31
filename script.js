function Enviar(url, funcao){
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            funcao(JSON.parse(this.responseText))
        }
    }

    xhttp.open('GET', url, true)
    xhttp.send()
}

function regiao(listaregiao){

    let select = document.getElementById('regiao')
    select.addEventListener('change', 
        function() {
            let url = 'https://servicodados.ibge.gov.br/api/v1/localidades/'

            if (this.value == "Selecione"){
                url += 'estados'

                document.getElementById('municipio').innerHTML = ''
                let opcao = document.createElement('option')
                opcao.value = ""
                opcao.innerHTML = "Selecione"
                document.getElementById('municipio').appendChild(opcao)

            }else{
                url += `regioes/${this.value}/estados`
                
                document.getElementById('municipio').innerHTML = ''
                let opcao = document.createElement('option')
                opcao.value = ""
                opcao.innerHTML = "Selecione"
                document.getElementById('municipio').appendChild(opcao)
            }  
            if (this.value) 
            console.log(this.value)
            Enviar(url, uf)                         
        }                
    )

    console.log(typeof listaregiao)

    for (i in listaregiao){

        console.log(listaregiao[i])
        opcao = document.createElement('option')
        opcao.value = listaregiao[i].id
        opcao.innerHTML = `${listaregiao[i].nome}  (${listaregiao[i].sigla})`
        document.getElementById('regiao').appendChild(opcao)
    }
}

function uf(listauf){

    let select = document.getElementById('uf')
    select.addEventListener('change', function(){
       
     Enviar(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${this.value}/municipios`, municipio)
    
    }
    
)
    document.getElementById('uf').innerHTML = ''
    let opcao = document.createElement('option')
    opcao.value = ""
    opcao.innerHTML = "Selecione"
    document.getElementById('uf').appendChild(opcao)

    console.log(listauf)
    for( i in listauf) {
    
    console.log(listauf[i])
    let opcao = document.createElement('option')
    opcao.value = listauf[i].id
    opcao.innerHTML = `${listauf[i].nome}  (${listauf[i].sigla})`
    document.getElementById('uf').appendChild(opcao)
    }
}

function municipio(listamunicipio){
    
    document.getElementById('municipio').innerHTML = ''
    let opcao = document.createElement('option')
    opcao.value = ""
    opcao.innerHTML = "Selecione"
    document.getElementById('municipio').appendChild(opcao)
    
    for( i in listamunicipio) {
    
    console.log(listamunicipio[i])
    let opcao = document.createElement('option')
    opcao.value = listamunicipio[i].id
    opcao.innerHTML = `${listamunicipio[i].nome}`
    document.getElementById('municipio').appendChild(opcao)
   
}
}

Enviar('https://servicodados.ibge.gov.br/api/v1/localidades/regioes', regiao)
Enviar('https://servicodados.ibge.gov.br/api/v1/localidades/estados', uf)
class Despesa{
    constructor(ano,mes,dia,tipo,descricao,valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados(){
        for(let position in this){
            if(this[position] == undefined || this[position] == '' || this[position] == null){
                return false
            }
        }
        return true
    }
}

class Banco{

    constructor(){
        let id = localStorage.getItem('id')

        if(id === null){
            localStorage.setItem('id',0)
        }
    }

    getNextId(){
        let nextId = localStorage.getItem('id')
        return parseInt(nextId) + 1
    }

    gravar(despesa){
        let id = this.getNextId()

        localStorage.setItem(id,JSON.stringify(despesa))

        localStorage.setItem('id',id)
    }

    recuperarTodosRegistros(){
        //Array Objetos
        let despesas = Array()

        let maxItens = localStorage.getItem('id')
        
        //recuperando os itens no localStorage
        for(let i = 1; i <= maxItens; i++){

            let despesa = JSON.parse(localStorage.getItem(i))
            
            if(despesa === null ){
                continue
            }
            //armazenando no Array
            despesas.push(despesa)
        }

        return despesas
    }
}

let banco = new Banco()

function cadastrarDespesa(){
    
    //capturando valores do input
   let ano =  document.getElementById('ano')
   let mes =  document.getElementById('mes')
   let dia =  document.getElementById('dia')
   let tipo =  document.getElementById('tipo')
   let descricao =  document.getElementById('descricao')
   let valor =  document.getElementById('valor')

   //instanciando objeto
   let despesa = new Despesa(
       ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value
   )
    
   if(despesa.validarDados()){
        banco.gravar(despesa)
        document.getElementById('textoModal').innerHTML = 'Sucesso ao salvar dados'
        document.getElementById('lableModalDespesa').innerHTML = 'Sucesso'
        document.getElementById('tipoTexto').className = "modal-header text-success"
        document.getElementById('buttonModalBack').innerHTML = 'OK'
        $('#modalDespesas').modal('show')
   }else{
        document.getElementById('textoModal').innerHTML = 'Erro ao salvar dados'
        document.getElementById('lableModalDespesa').innerHTML = 'Erro'
        document.getElementById('tipoTexto').className = "modal-header text-danger"
        document.getElementById('buttonModalBack').innerHTML = 'Voltar e Corrigir'
        $('#modalDespesas').modal('show')
   }
}

function carregaListaDespesas(){
    let despesas = Array()
    despesas = banco.recuperarTodosRegistros()
    
    let listaDespesas = document.getElementById('listaDespesas')

    despesas.forEach(d => {
        
        //criando table row   
        let linha = listaDespesas.insertRow()

        //criando td
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        switch(d.tipo){
            case '1': d.tipo = 'Alimentação';break
            case '2': d.tipo = 'Educação';break
            case '3': d.tipo = 'Lazer';break
            case '4': d.tipo = 'Saúde';break
            case '5': d.tipo = 'Transporte';break
        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
    })
}

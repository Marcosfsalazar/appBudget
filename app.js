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
        $('#sucessoGravacao').modal('show')
   }else{
        $('#erroGravacao').modal('show')
   }
}

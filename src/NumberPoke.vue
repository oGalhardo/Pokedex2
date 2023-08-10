<template>
    <div>
        <input type="number" name="nameNum" id="nameNumId">
        <button @click="enviaValor">Pesquisar Pokemon</button>
    </div>
</template>
<script>
export default{
    methods:{
        enviaValor(){
            const valor = (document.getElementById('nameNumId'))
            const num = parseInt(valor.value)
            this.$emit('valor-recebido', num)
        }
    }
    
}
</script>
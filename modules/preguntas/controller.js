const store = require('./store');

async function getPregunta(id) {
    try{
        const result = await store.getPregunta(id);
        return(result);
    }catch(e){
        console.log(e);
        return {
            status: 500,
            message: 'Unexpected controller error',
            detail: e
        };
    }
}

async function getPreguntas() {
    try{
        const result = await store.getPreguntas();
        return(result);
    }catch(e){
        console.log(e);
        return {
            status: 500,
            message: 'Unexpected controller error',
            detail: e
        };
    }
}

async function setPreguntas(pregunta, id) {
    try{
        pregunta.user = id;
        const result = await store.setPreguntas(pregunta);
        return(result);
    }catch(e){
        console.log(e);
        return {
            status: 500,
            message: 'Unexpected controller error',
            detail: e
        };
    }
}

async function updatePregunta(pregunta) {
    try{
        const result = await store.updatePregunta(pregunta);
        return(result);
    }catch(e){
        console.log(e);
        return {
            status: 500,
            message: 'Unexpected controller error',
            detail: e
        };
    }
}

async function deletePregunta(id) {
    try{
        const result = await store.deletePregunta(id);
        return(result);
    }catch(e){
        console.log(e);
        return {
            status: 500,
            message: 'Unexpected controller error',
            detail: e
        };
    }
}

module.exports = {
    getPregunta,
    getPreguntas,
    setPreguntas,
    updatePregunta,
    deletePregunta
}
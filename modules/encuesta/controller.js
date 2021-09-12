const store = require('./store');

async function getEncuesta(id) {
    try{
        const result = await store.getEncuesta(id);
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

async function getEncuestas() {
    try{
        const result = await store.getEncuestas();
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

async function setEncuesta(encuesta) {
    try{
        const result = await store.setEncuesta(encuesta);
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

async function updateEncuesta(encuesta) {
    try{
        const result = await store.updateEncuesta(encuesta);
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

async function deleteEncuesta(id) {
    try{
        const result = await store.deleteEncuesta(id);
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
    getEncuesta,
    getEncuestas,
    setEncuesta,
    updateEncuesta,
    deleteEncuesta
}
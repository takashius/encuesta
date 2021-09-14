const store = require('./store');
const Preguntas = require('../preguntas/store');

async function getEncuesta(id) {
    try{
        let lisResp = null;
        const quest = await Preguntas.getPreguntas();
        const result = await store.getUserEncuesta(id);
        if(result.message){
            lisResp = result.message.preguntas;
        }
        const encuesta = quest.message.map((res) => {
            if(result.message){
                let pregunta = {
                    preguntaId: res._id,
                    pregunta: res.title,
                    respuesta: false,
                }
                if(lisResp.length > 0){
                    lisResp.find( list => {
                        if(list.pregunta.equals(res._id)){
                            pregunta.respuesta = list.respuesta;
                        }
                    });
                }
                return pregunta;
            }else{
                return {
                    preguntaId: res._id,
                    pregunta: res.title,
                    respuesta: false,
                }
            }
        });
        return({
            status: 200,
            message: encuesta
        });
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

async function updateEncuesta(user, preguntas) {
    try{
        const result = await store.updateEncuesta(user, preguntas);
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
const Preguntas = require('./model');

async function getPregunta(id) {
    try {
      let query = {active: true};
      if (id) {
        query._id = id;
      }
  
      const result = await Preguntas.findOne(query);
      return { status: 200, message: result }
    } catch (e) {
      return {
        status: 500,
        message: 'Unexpected store error',
        detail: e
      };
    }
}

async function getPreguntas() {
    try {
      let query = {active: true};
  
      const result = await Preguntas.find(query);
      return { status: 200, message: result }
    } catch (e) {
        console.log(e);
      return {
        status: 500,
        message: 'Unexpected store error',
        detail: e
      };
    }
}

async function setPreguntas(pregunta) {
  try {
    if (!pregunta) {
      return {
        status: 400,
        message: 'No pregunta recived'
      };
    }
    const model = new Preguntas(pregunta)
    const result = await model.save();
    return { status: 201, message: result };

  } catch (e) {
    console.log(e);
    return {
      status: 500,
      message: 'Unexpected store error',
      detail: e
    };
  }
}
  
async function updatePregunta(pregunta){
    try{
        const foundPregunta = await Preguntas.findOne({ _id: pregunta.id });

        if(pregunta.title){
            foundPregunta.title = pregunta.title;
        }

        const result = await foundPregunta.save();

    return { status: 200, message: result };
  } catch (e) {
    return {
      status: 500,
      message: 'Unexpected store error',
      detail: e
    };
  }
}

async function deletePregunta(id){
    if(!id){
        return {
            status: 400,
            message: 'No pegunta id recived'
        };
    }

    try{
        await Preguntas.findOneAndDelete({_id: id});
        return { status: 200, message: 'The prgunta has been deleted correctly' }
    }catch(e){
        console.log(e);
        return {
            status: 500,
            message: 'Unexpected error',
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
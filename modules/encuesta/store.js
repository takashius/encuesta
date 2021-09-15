const Encuesta = require('./model');

async function getEncuesta(id) {
    try {
      let query = {active: true};
      if (id) {
        query._id = id;
      }
      const result = await Encuesta.findOne(query);
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

async function getUserEncuesta(id) {
    try {
      let query = {active: true};
      if (id) {
        query.user = id;
      }
      const result = await Encuesta.findOne(query);
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

async function getEncuestas() {
    try {
      let query = {active: true};
  
      const result = await Encuesta.find(query);
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

async function setEncuesta(encuesta) {
  try {
    if (!encuesta) {
      return {
        status: 400,
        message: 'No encuesta recived'
      };
    }
    const model = new Encuesta(encuesta)
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
  
async function updateEncuesta(id, preguntas){
    try{
        const foundEncuesta = await Encuesta.findOne({ user: id });
        if(preguntas){
          foundEncuesta.preguntas = preguntas;
        }
        const result = await foundEncuesta.save();

    return { status: 200, message: result };
  } catch (e) {
    console.log(e);
    return {
      status: 500,
      message: 'Unexpected store error',
      detail: e
    };
  }
}

async function deleteEncuesta(id){
    if(!id){
        return {
            status: 400,
            message: 'No task id recived'
        };
    }

    try{
        await Encuesta.findOneAndDelete({_id: id});
        return { status: 200, message: 'The encuesta has been deleted correctly' }
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
    getEncuesta,
    getEncuestas,
    getUserEncuesta,
    setEncuesta,
    updateEncuesta,
    deleteEncuesta
}
const store = require('./store');
const encuesta = require('../encuesta/controller');

async function getUsers(filterUsers) {
    try {
        const result = await store.list(filterUsers);
        return result;
    } catch (e) {
        return {
            status: 500,
            message: "Unexpected error",
            detail: e
        };
    }

}

async function getUser(id) {
    try {
        const result = await store.oneUser(id)
        return result;
    } catch (e) {
        return {
            status: 500,
            message: "Unexpected error",
            detail: e
        };
    }

}

async function addUser(user) {
    try{
        if (!user) {
            return {
                status: 404,
                message: 'User not found'
            }
        }
    
        correo = await store.checkMail(user.email, false);
        if (correo.status == 200) {
            return {
                status: 400,
                message: 'The email already exists associated with another user account'
            }
        }
    
        if (!user.photo) {
            user.photo = "https://lotrox-test.s3-us-west-2.amazonaws.com/user-default.jpg";
        }
    
        const fullUser = await store.add(user);
        if(fullUser.status == 201){
            await encuesta.setEncuesta({user: fullUser.message._id, preguntas:[]});
            const preguntas = await encuesta.getEncuesta(fullUser.message._id);
            if(preguntas.status == 200){
                const usuarioFinal = fullUser.message;
                usuarioFinal.preguntas = preguntas.message;
                return {
                    status: 201,
                    message: usuarioFinal
                }
            }else{               
                return fullUser;
            }
        }else{
            return fullUser;
        }
    }catch(e){
        console.log(e);
        return {
            status: 500,
            message: "Unexpected controller error"
        }
    }
}

async function updateUser(user) {
    try {
        const result = await store.update(user);
        return (result);
    } catch (e) {
        console.log('[ERROR]', e);
        return {
            status: 500,
            message: 'Unexpected controller error',
            detail: e
        };
    }
}

function deleteUser(id) {
    return new Promise(async (resolve, reject) => {
        if (!id) {
            reject('Invalid data');
            return false;
        }
        store.delete(id)
            .then(() => {
                resolve();
            })
            .catch(e => {
                reject(e);
            });
    });
}

async function loginUser(user) {
    try {
        if (!user) {
            return {
                status: 400,
                message: 'Invalid data'
            };
        }
        const { email, password } = user;
        const result = await store.login(email, password);
        if (result.status == 200) {
            await encuesta.setEncuesta({user: result.message._id, preguntas:[]});
            const preguntas = await encuesta.getEncuesta(result.message._id);
            if(preguntas.status == 200){
                const usuarioFinal = result.message;
                usuarioFinal.preguntas = preguntas.message;
                return {
                    status: 201,
                    message: usuarioFinal
                }
            }else{               
                return result;
            }
        } else {
            return {
                status: 400,
                message: 'Incorrect email or password'
            };
        }
    }catch(e){
        console.log(e);
        return {
            status: 500,
            message: "Unexpected controller error"
        }
    }
}

function logoutUser(id, token) {
    return new Promise(async (resolve, reject) => {
        if (!token) {
            reject('Invalid data');
            return false;
        }
        const result = await store.logout(id, token);
        resolve(result);
    });
}

function logoutAll(id) {
    return new Promise(async (resolve, reject) => {
        if (!id) {
            reject('Invalid data');
            return false;
        }
        const result = await store.logoutAll(id);
        resolve(result);
    });
}

async function changePassword(user, newPass) {
    try {
        if (newPass.length < 7) {
            return {
                status: 400,
                message: 'Is shorter than the minimum allowed length (7)'
            }
        }
        return store.changePassword(user, newPass);
    } catch (e) {
        return {
            status: 500,
            message: 'Unexpected error',
            detail: e
        }
    }
}

module.exports = {
    getUsers,
    getUser,
    deleteUser,
    loginUser,
    logoutUser,
    logoutAll,
    addUser,
    changePassword,
    updateUser,
}
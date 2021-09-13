const User = require('./model');


async function addUser(user) {
    try {
        const myUser = new User(user);
        await myUser.save();
        const { _id, name, lastname, typeUser, photo, email, date } = myUser;
        const token = await myUser.generateAuthToken();
        user = { _id, name, lastname, typeUser, photo, email, date, token };
        return { status: 201, message: user };
    } catch (e) {
        console.log(e);
        return {
            status: 500,
            message: 'User registration error',
            detail: e
        }
    }

}

async function updateUser(user) {
    try {
        const foundUser = await User.findOne({
            _id: user.id,
        });
        if (user.name) {
            foundUser.name = user.name;
        }
        if (user.lastname) {
            foundUser.lastname = user.lastname;
        }
        if (user.photo) {
            foundUser.photo = user.photo;
        }
        if (user.status) {
            foundUser.status = user.status;
        }
        if (user.password) {
            foundUser.password = user.password;
        }
        if (user.date) {
            foundUser.date = user.date;
        }

        await foundUser.save();
        const { _id, name, lastname, typeUser, photo, email, date, active } = foundUser;
        user = { _id, name, lastname, typeUser, photo, email, date, active };
        return { status: 200, message: user };

    } catch (e) {
        console.log(e);
        return {
            status: 500,
            message: 'Unexpected store error',
            detail: e
        };
    }

}

async function getUser(type) {
    let filter = {
        active: true
    };
    if (type !== null) {
        filter.typeUser = type;
    }
    try {
        const list = await User.find(filter).select('name lastname photo date email');
        return {
            status: 200,
            message: list
        };
    } catch (e) {
        console.log(e);
        return {
            status: 500,
            message: "Unexpected error",
            detail: e
        };
    }
}

async function getOneUser(id) {
    let filter = {active: true};
    if (id !== null) {
        filter = {
            _id: id
        };
    }else{
        return {
            status: 404,
            message: 'No user found'
        };
    }
    try {
        const list = await User.findOne(filter)
            .select('name lastname photo date email typeUser');
        return {
            status: 200,
            message: list
        };
    } catch (e) {
        console.log(e);
        return {
            status: 500,
            message: "Unexpected error",
            detail: e
        };
    }

}

async function deleteUser(id) {
    const foundUser = await User.findOne({
        _id: id
    });
    foundUser.active = false;
    foundUser.save();

    return { status: 200, message: "User deleted" }

}

async function loginUser(mail, pass) {
    try {
        const user = await User.findByCredentials(mail, pass);
        const { _id, name, lastname, photo, email, date, typeUser } = user;
        const token = await user.generateAuthToken();
        return {
            status: 200,
            message: {
                _id, name, lastname, photo, email, date, typeUser, token
            }
        };
    } catch (error) {
        console.log('ERROR STORE LOGIN', error);
        return {
            status: 500,
            message: 'Unexpected error'
        };
    }
}

async function logoutUser(id, tokenUser) {
    try{
        const foundUser = await User.findOne({
            _id: id
        });
        foundUser.tokens = foundUser.tokens.filter((token) => {
            return token.token != tokenUser;
        });
        await foundUser.save();
        return {
            status: 200,
            message: 'Logout successful'
        };
    }catch(e){
        console.log('ERROR STORE LOGOUT', e);
        return {
            status: 500,
            message: 'Unexpected error'
        };
    }
}

async function logoutAll(id) {
    try{
        const foundUser = await User.findOne({
            _id: id
        });
        foundUser.tokens.splice(0, foundUser.tokens.length);
        await foundUser.save();
        return {
            status: 200,
            message: 'Logout successful'
        };
    }catch(e){
        console.log('ERROR STORE LOGOUT', e);
        return {
            status: 500,
            message: 'Unexpected error'
        };
    }
    
}

async function changePassword(user, newPass) {
    try {
        const foundUser = await User.findOne({
            email: user.email,
            active: true
        });
        foundUser.password = newPass;
        foundUser.save();
        return {
            status: 200,
            message: 'Password changed successfully'
        };
    } catch (e) {
        return {
            status: 500,
            message: 'Unexpected error',
            detail: e
        };
    }
}

async function checkMail(mail, isToken) {
    try {
        const user = await User.findOne({
            email: mail
        });

        let token = "";
        if (isToken) {
            token = await user.generateAuthToken();
        }

        if (user) {
            return {
                status: 200,
                message: { user, token }
            };
        } else {
            return {
                status: 404,
                message: 'User not found'
            }
        }
    } catch (e) {
        return {
            status: 500,
            message: 'Unexpected error',
            detail: e
        };
    }
}

module.exports = {
    add: addUser,
    list: getUser,
    update: updateUser,
    oneUser: getOneUser,
    delete: deleteUser,
    login: loginUser,
    logout: logoutUser,
    logoutAll,
    changePassword,
    checkMail,
}
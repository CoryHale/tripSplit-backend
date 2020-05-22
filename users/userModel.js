const db = require('../data/dbConfig');

const addUser = async (user) => {
    return await db('users').insert(user);
}

const updateUser = async (phone_number, newData) => {
    try {
        const checkForUser = await db('users').where({ phone_number });
        if(!(checkForUser)) return null;

        const updatedUser = await db('users').where({ phone_number }).update(newData);
        if(!(updatedUser)) return null;

        const selectUpdatedUser = await db('users').where({ phone_number });
        if(!(selectUpdatedUser)) return null;

        return selectUpdatedUser;
    }
    catch (err) {
        return err.message;
    }
}

const deleteUser = async (phone_number) => {
    try {
        const selectedUser = await db('users').where({ phone_number }).first();
        if(!(selectedUser)) return null;

        const deletedUser = await db('users').where({ phone_number }).del();
        if(!(deletedUser)) return null;

        return selectedUser;
    }
    catch (err) {
        return err.message;
    }
}

const getUsers = _ => {
    return db('users');
}

const getUserById = async (id) => {
    try {
        const selectedUser = await db('users').where({ id }).first();
        return (selectedUser) ? selectedUser : null;
    }
    catch {
        return null;
    }
}

async function findBy(name) {
    return await db('users').where({ name }).first();
}

module.exports = {
    addUser,
    updateUser,
    deleteUser,
    getUsers,
    getUserByNumber,
    findBy
}
const db = require('../data/dbConfig');

const find = async () => {
    return await db('trips');
}

const findTrip = async (id) => {
    try {
        const selectedTrip = await db('trips').where({ id }).first();
        return (selectedTrip) ? selectedTrip : null;
    }
    catch {
        return null;
    }
}

const filterByPrimary = async (primary_member_id) => {
    try {
        const selectedTrips = await db('trips').where({ primary_member_id });
        return (selectedTrips) ? selectedTrips : null;
    }
    catch {
        return null;
    }
}

const addTrip = async (trip) => {
    return await db('trips').insert(trip);
}

const updateTrip = async (id, newData) => {
    try {
        const checkForTrip = await db('trips').where({ id }).first();
        if(!(checkForTrip)) return null;

        const updatedTrip = await db('trips').where({ id }).update(newData);
        if(!(updatedTrip)) return null;

        const selectUpdatedTrip = await db('trips').where({ id }).first();
        if(!(selectUpdatedTrip)) return null;

        return selectUpdatedTrip;
    }
    catch (err) {
        return err.message;
    }
}

const deleteTrip = async (id) => {
    try {
        const selectedTrip = await db('trips').where({ id }).first();
        if(!(selectedTrip)) return null;

        const deletedTrip = await db('trips').where({ id }).del();
        if(!(deletedTrip)) return null;

        return deletedTrip;
    }
    catch (err) {
        return err.message;
    }
}

module.exports = {
    find,
    findTrip,
    filterByPrimary,
    addTrip,
    updateTrip,
    deleteTrip
}
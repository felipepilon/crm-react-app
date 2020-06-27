const dot = require('dot-object');

export const getObjectValue = (obj, property) => {
    const value = obj && property ?
        dot.pick(property, obj) :
        '';

    return value ? value : '';
};

export const setObjectValue = (obj, property, value) => {
    if (obj && property)
        dot.set(property, value, obj);
};
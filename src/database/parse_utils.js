module.exports.createPointer = function (className, id) {
    return {
        __type: 'Pointer',
        className: className,
        objectId: id,
    }
}
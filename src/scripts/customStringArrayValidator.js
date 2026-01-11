function customStringArrayValidator(value, array) {
    if (array.includes(value)) {
        return true;
    }

    throw new Error(
        "status must only have 'ONLINE' or OFFLINE' as valid values",
    );
}

export default customStringArrayValidator;

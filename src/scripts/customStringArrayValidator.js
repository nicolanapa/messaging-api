function customStringArrayValidator(value, array) {
    if (array.includes(value)) {
        return true;
    }

    throw new Error(
        "status must only have one of these as valid values: " +
            array.toString(),
    );
}

export default customStringArrayValidator;

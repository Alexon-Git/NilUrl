function validateChangeUserName(newUserName) {
    if (newUserName.length > 32) {
        return {status: false, msg: "Длина не может быть больше 32 символов!"}
    }

    return {status: true, msg: ""};
}


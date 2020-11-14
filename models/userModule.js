class testUser {
    constructor(name, age){
        this.name = name
        this.age = age
    }
}

const getNewUser = (name, age) => {
    if(!name) {
        throw new Error('name is required')
    }
    if(!age) {
        throw new Error('age is required')
    }
    return new testUser(name, age)
}

module.exports = getNewUser
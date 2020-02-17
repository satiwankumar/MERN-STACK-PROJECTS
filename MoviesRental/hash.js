const bcrypt = require('bcrypt')

//1234 => abcd
//salt is added with password

async function hashing(){
const salt = await bcrypt.genSalt(10, )
}



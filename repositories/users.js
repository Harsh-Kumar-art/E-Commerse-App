const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository');

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository{

    async comparePasswords(saved, supplied){
        const [hashed, salt] = saved.split('.');
        const hashedSuppliedBuff = await scrypt(supplied, salt, 64);

        return hashed === hashedSuppliedBuff.toString('hex');
    }


    async create(attrs){
        attrs.id = this.randomId();

        const salt = crypto.randomBytes(8).toString('hex');
        const buff = await scrypt(attrs.password, salt, 64);


        const records = await this.getAll();
        const record = {
            ...attrs,
            password: `${buff.toString('hex')}.${salt}`
        };
        records.push(record);

        await this.writeAll(records);
        return record;
    }
}

// const test = async ()=>{
//     const repo = new UsersRepository('users.json');
//     // await repo.create({email: 'test@test.com', password: 'password'});

//     // const users = await repo.getAll();

//     // const user = await repo.getOne('fb076b51');
//     // console.log(user);
//     // await repo.delete('fb076b51');

//     // await repo.update('6079abae', {password: 'mypassword'});

//     // const user = await repo.getOneBy({ email: 'test@test.com', password: 'mypassword'});
//     // console.log(user);


// };      

// test();

module.exports = new UsersRepository('users.json');
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const redis = require('redis')

// const client = redis.createClient({
//     url: process.env.REDIS_URL || 'redis://default:8nH7cwOn9BEu6yhwuEF5guY7UxpN6pmK@redis-16575.c252.ap-southeast-1-1.ec2.cloud.redislabs.com:16575/#11254493'
// });

const createUser = async (req, res) => {
    const user = new User({
        userName: req.body.user,
        accountNumber: req.body.account,
        emailAddress: req.body.email,
        identityNumber: req.body.identity
    })
    try {
        const saveUser = await user.save()
        const token = jwt.sign({ _id: saveUser._id }, process.env.TOKENIUM || 'SOMERANDOMTOKEN')
        res.status(200).header('tokenium', token).send(token)
    } catch(err) {
        res.status(400).send(err)
    }
}

const getUsers = async (req, res) => {
    try {
        // const key = req.originalUrl

        // client.on('error', (err) => console.log('Redis Client Error', err));
        // await client.connect();
        
        // const data = await client.get(key)
        // if(data !== null) {
        //     client.quit()
        //     res.status(200).send(JSON.parse(data))
        // }

        const users = await User.find();
        // client.setEx(key, 450, JSON.stringify(users))

        // client.quit()
        res.status(200).send(users);
    } catch(err) {
        res.status(400).send(err)
    }
}

const getUserByAccountNumber =  async (req, res) => {
    try {
        // const key = req.originalUrl

        // client.on('error', (err) => console.log('Redis Client Error', err));
        // await client.connect();
        
        // const data = await client.get(key)
        // if(data !== null) {
        //     client.quit()
        //     res.status(200).send(JSON.parse(data))
        // }

        const user = await User.findOne({ accountNumber: req.params.accountNumber })
        // client.setEx(key, 450, JSON.stringify(user))

        // client.quit()
        res.status(200).send(user)
    } catch(err) {
        res.status(400).send(err)
    }
}

const getUserByIdentityNumber = async (req, res) => {
    try {
        // const key = req.originalUrl

        // client.on('error', (err) => console.log('Redis Client Error', err));
        // await client.connect();
        
        // const data = await client.get(key)
        // if(data !== null) {
        //     client.quit()
        //     res.status(200).send(JSON.parse(data))
        // }
        
        const user = await User.findOne({ identityNumber: req.params.identityNumber })
        // client.setEx(key, 450, JSON.stringify(user))

        // client.quit()
        res.status(200).send(user)
    } catch(err) {
        res.status(400).send(err)
    }
}

const modifyUser = async (req, res) => {
    try {
        const updated = await User.updateOne(
            { _id: req.params.userId},
            { $set: {
                    userName: req.body.user,
                    accountNumber: req.body.account,
                    emailAddress: req.body.email,
                    identityNumber: req.body.identity
                }
            }
        )
        res.status(200).send(updated)
    } catch(err) {
        res.status(400).send(err)
    }
}

const deleteUser = async (req, res) => {
    try {
        const removed = await User.deleteOne({ _id: req.params.userId });
        res.status(200).send(removed);
    } catch(err) {
        res.status(400).send(err)
    }
}

module.exports = {
    getUsers,
    getUserByAccountNumber,
    getUserByIdentityNumber,
    modifyUser,
    deleteUser,
    createUser
}
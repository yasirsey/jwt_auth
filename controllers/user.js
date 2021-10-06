const jwt = require('jsonwebtoken')

const User = require('../models/User')

const getAll = async (req, res, next) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (err) {
        console.log(err)
    }
}

const register = async (req, res, next) => {
    try {
        const { username, password } = req.body

        if (!(username && password)) {
            return res
                .status(400)
                .json({ error: 'Username and Password required.' })
        }

        const validateUser = await User.findOne({ username })

        if (validateUser) {
            return res.status(409).json({ error: 'Username already taken.' })
        }

        const user = await User.create({
            username,
            password,
        })

        //Create Token
        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        return res.status(201).json({ user, token })
    } catch (err) {
        const errorMessage = err.message.split(':').at(-1).trim() || err.message
        res.status(400).json({ error: errorMessage })
    }
}

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body

        if (!(username && password)) {
            return res
                .status(400)
                .json({ error: 'Username and Password required.' })
        }

        const user = await User.findOne({ username })

        if (!user) {
            return res.status(404).json({ error: 'User not found.' })
        }

        user.comparePassword(password, function (err, isMatch) {
            if (err) console.log(err)

            if (!isMatch) {
                return res.status(404).json({ error: 'Wrong password.' })
            }

            //Create Token
            const token = jwt.sign(
                {
                    id: user._id,
                },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            )

            return res.status(201).json({ token })
        })
    } catch (err) {
        const errorMessage = err.message.split(':').at(-1).trim() || err.message
        return res.status(400).json({ error: errorMessage })
    }
}

module.exports = {
    getAll,
    register,
    login
}

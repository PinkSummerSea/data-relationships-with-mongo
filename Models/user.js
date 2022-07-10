const mongoose = require('mongoose');
const Schema = mongoose.Schema;


mongoose.connect('mongodb://localhost:27017/mongo-relationships', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Mongo Connection Open")
})
.catch(err => {
    console.log("Oh No. Mongo Connection Error.")
    console.log(err)
})



const userSchema = new Schema({
    first: String,
    last: String,
    addresses: [
        {
            street: String,
            city: String,
            state: String,
            country: String,
            _id: false
        }
    ]
})

const User = mongoose.model('User', userSchema)

const makeUser = async () => {
    const u = new User({
        first: 'Harry',
        last: 'Potter',
    })
    u.addresses.push({
        street: '123 Sesame St.',
        city: 'New York',
        state: 'NY',
        country: 'USA'
    })
    const res = await u.save()
    console.log(res)
}

const addAddress = async (id) => {
    const user = await User.findById(id);
    user.addresses.push({
        street: '456 Apple St.',
        city: 'New York',
        state: 'NY',
        country: 'USA'
    })
    const res = await user.save()
    console.log(res)
}


// makeUser();
addAddress('62cb096ae899bab62c8cd213')
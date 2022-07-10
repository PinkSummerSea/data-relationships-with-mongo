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
    username: String,
    age: Number
});

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User'}
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// const makeTweets = async () => {
//     // const u = new User({username: 'friedchickenlover', age: 25});
//     const u = await User.findOne({username: 'friedchickenlover'});
//     const tweet2 =new Tweet({text: 'But I am getting fat.', likes: 88});
//     tweet2.user = u;
//     await u.save();
//     await tweet2.save();
// }

// makeTweets();

const findTweet = async () => {
    const tweet = await Tweet.findById("62cb181aa6c362664f366bda").populate('user', 'username');
    console.log(tweet)
}

findTweet()

const mongoUrl = process.env.MONGO_URI || 'mongodb://localhost:27017/habitQuest';

export default { url: mongoUrl };
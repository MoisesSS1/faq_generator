const mongoose = require('mongoose')

mongoose.set("strictQuery", true)

mongoose.connect(`mongodb+srv://patt0lino:${process.env.DB_PASSWORD}@cluster0.1dbjsk6.mongodb.net/?retryWrites=true&w=majority`)



module.exports = mongoose
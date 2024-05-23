const mongoose = require("mongoose")

const connection = mongoose.connect("mongodb+srv://imrans:imrans@cluster0.tbycsjm.mongodb.net/Flashcard?retryWrites=true&w=majority&appName=Cluster0")

module.exports={
    connection
}
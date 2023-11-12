const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const connectDatabase = () => {
    mongoose
        .connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
        })
        .then((con) =>
            console.log("Database Connected to the Collection ✅✅✅ ")
        )
        .catch((err) => console.log(err));
};

module.exports = connectDatabase;

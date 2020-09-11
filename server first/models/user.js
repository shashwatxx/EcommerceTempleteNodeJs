const mongoose = require("mongoose");
const product = require("./product");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },

    email: { type: String, required: true },
    cart: {
        items: [
            {
                productId: { type: mongoose.Types.ObjectId, ref: 'Product', required: true },
                quantity: { type: Number, required: true },
            },
        ],
    },
});

module.exports = mongoose.model("User", UserSchema);


// ?cpnn
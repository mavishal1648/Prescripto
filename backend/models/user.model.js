import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    image:{
        type: String,
        default:"data:image/jpeg;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iY3VycmVudENvbG9yIj48cGF0aCBkPSJNNCAyMkM0IDE3LjU4MTcgNy41ODE3MiAxNCAxMiAxNEMxNi40MTgzIDE0IDIwIDE3LjU4MTcgMjAgMjJINFpNMTIgMTNDOC42ODUgMTMgNiAxMC4zMTUgNiA3QzYgMy42ODUgOC42ODUgMSAxMiAxQzE1LjMxNSAxIDE4IDMuNjg1IDE4IDdDMTggMTAuMzE1IDE1LjMxNSAxMyAxMiAxM1oiPjwvcGF0aD48L3N2Zz4="
    },
    address:{
        type: Object,
        default: {
            line1: "",
            line2: "",
        }
    },
    gender:{
        type: String,
        default:"Not Selected",
    },
    date_of_birth:{
        type: String,
        default:"Not Selected",
    },
    phone:{
        type: String,
        default:"0000000000"
    },
});

const userModel = mongoose.model('user',userSchema);
export default userModel;
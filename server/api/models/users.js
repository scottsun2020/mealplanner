// {
//     _id: 1,
//     username: 'prof_auman',
//     password: '54c656595c6575ad357c09e8cba83a7a:682e6cef79610d2a18d30cf48ee9373b1060ae0353051f4c92611bed29e2818f',
//     preferences: ['ketogenic']
// },

import mongoose from 'mongoose';

const DIETS = [
    'gluten free',
    'dairy free',
    'vegan',
    'vegetarian',
    'ketogenic',
    'pescetarian',
    'primal',
    'paleolithic'
];

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        preferences: { 
            type: [String],
            required: true,
            default: []
            
        }
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}

    }
);
// virtual to populate the associated mealplans for the user
UserSchema.virtual('mealplans', {
    ref: 'MealPlan',
    localField: '_id',
    foreignField: 'user_id'
});
const User = mongoose.model('User', UserSchema);

export default User;
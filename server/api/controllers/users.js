import User from '../models/users.js';

import { hash, compare, signToken } from '../util/auth.js';

const registerUser = async (req, res) => {
    try {
        const { username, password, preferences} = req.body;

        if(!username || !password){
            return res.status(422).json({error: 'Must Provide both username and password'});
        }

        const hashedPassword = await hash(password);

        //add user to the Users collection
        const userEntry = await User.create({
            username,
            password: hashedPassword,
            preferences: preferences
        });

        res.json({ _id: userEntry._id, 
                    username: userEntry.username, 
                    preferences: userEntry.preferences});

    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }

};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || !password){
            return res.status(422).json({error: 'Must Provide both username and password'});
        }

        const userEntry = await User.findOne({ username: username.toLowerCase()});
        //check user and username matching password
        if(!userEntry){
            return res.status(401).json({ error: 'Invalid username'});
        }

        const passwordEqual = await compare(password, userEntry.password);
        if(!passwordEqual) {
            return res.status(401).json({ error: 'Invalid password'});
        }

        const token = signToken(userEntry.username, userEntry._id);

        res.json({ 
            _id: userEntry._id, 
            username: userEntry.username, 
            preferences: userEntry.preferences,
            token_type: 'Bearer',
            access_token: token
        });

    } catch (error) {
        res.status(500).json({error : error.toString()});
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id } = req.verified;
        
        //ensure the guest id in header matches id  provided in URL
        if(id !== user_id){
            return res.status(403).json({ error: 'Forbidden guests.'});
        }
        //find the user
        const userWithMealplans = await User.findById(id).select('-password').populate('mealplans');

        res.status(200).json(userWithMealplans);

    } catch (error) {
        res.status(500).json({ error: error.toString()});
    }
}

const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id } = req.verified;
        const { preferences } = req.body; 

        //ensure the guest id in header matches id  provided in URL
        if(id !== user_id){
            return res.status(403).json({ error: 'Forbidden guests.'});
        }

        //update preferences
        const updateUser = await User.findByIdAndUpdate(
            id,
            { preferences }, 
            { new: true} 
        );
        //check if user exists
        if (!updateUser){
            return res.status(404).json({ error: 'User not found'});
        } 

        res.json({ updateUser });

    } catch (error) {
        res.status(500).json({ error: error.toString()});
    }
}
export { registerUser, loginUser, getUserById, updateUserById }
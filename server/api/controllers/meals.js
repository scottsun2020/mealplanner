import axios from 'axios';
import User from '../models/users.js';

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
const SPOONACULAR_API_URL = process.env.SPOONACULAR_API_URL;

const getMeal = async (req, res) => {
    try {
        const { name, preferences } = req.query;
        const { user_id } = req.verified;

        // veriy there is a requesting user (user_id)
        if(!user_id) {
            return res.status(403).json({error: 'Forbindden User'});
        }
        const userById = await User.findById(user_id);

        // split the preferences into an array or set to an empty array
        const queryPreferences = preferences ? preferences.split(',') : [];
        // concat user preferences with preferences passed into query params
        const diet = [...userById.preferences, ...queryPreferences].join(',');

        const response = await axios.get(`${SPOONACULAR_API_URL}/recipes/complexSearch`, {
            params: {
                apiKey: SPOONACULAR_API_KEY,
                query: name,
                diet,
                addRecipeInformation: true // boolean flag to return diets array
            }
        });

        res.json(response.data.results);

    } catch (error){
        res.status(500).json({error: error.toString()});
    }
} 

export default getMeal;
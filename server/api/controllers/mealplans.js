import Mealplan from '../models/mealplans.js';

const addMealPlan = async (req, res) => {
    try {
        const { user_id } = req.verified;
        const { week, meal } = req.body;

        //find mealplan by userId 
        let mealplan = await Mealplan.findOne({ user_id, week });
        //check if mealplan for the given week exist
        if(!mealplan){
            //add new week into 
            console.log(meal);
            mealplan  = new Mealplan({
                user_id: user_id,
                week: week,
                meals: [meal]     
            });

        } else {
            //if the given week exists, check if the meal plan is full == 3 meals
            if (mealplan.meals.length < 3){
                //add meal into meals 
                mealplan.meals.push(meal);
            
            } else {
                return res.status(400).json({ error: 'Can not add More than 3 Meals'});
            }
        }

        //save the update mealplan or new meal plan
        const savedMealPlan = await mealplan.save();

        res.json(savedMealPlan);
        
    } catch (error) {
        res.status(500).json({ error: error.toString()});
    }
};

const deleteMealPlan = async (req, res) => {
    try {
        //verify the mealplan
        const { user_id } = req.verified;
        const { id }= req.params;

        const mealplan = await Mealplan.findOneAndDelete({
            _id : id,
            user_id
        });
        if(!mealplan) {
            return res.status(404).json({error: 'Meal plan not found'});
        }

        //remove mealpan by id
        await mealplan.deleteOne();

        res.json({ _id: id, message: 'success'});

    } catch (error) {
        res.status(500).json({ error: error.toString()});
    }

}

export { addMealPlan, deleteMealPlan };
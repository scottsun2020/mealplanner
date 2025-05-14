const Users = {
    users: [
        {
            _id: 1,
            username: 'prof_auman',
            password: '54c656595c6575ad357c09e8cba83a7a:682e6cef79610d2a18d30cf48ee9373b1060ae0353051f4c92611bed29e2818f',
            preferences: ['ketogenic']
        },
        {
            _id: 2,
            username: 'scott_sun',
            password: 'no_password',
            preferences: ['gluten free', 'whole30']
        },

    ],

    find(key, value) {
        // find a user by matching a specified key and value
        return this.users.find((user) => user[key] === value);
    },

    exists(id) {
        return this.guests.some((guest) => guest._id === id);
    },

    add(user) {
        // create a new _id based on the current users.length + 1
        const addUser = { ...user, _id: this.users.length + 1 };
        this.users.push(addUser);

        return addUser;
    },

    update(userId, preferences) {
        const user = this.find('_id', userId);

        if (!user) {
            return null;
        }

        user.preferences = preferences;
        return user;
    }
};

const MealPlans = {
    mealplans: [
        {
            _id: 1,
            user_id: 1,
            week: 1,
            meals: [
                {
                    mealId: 1591791,
                    name: 'Keto Snickerdoodle Coffee',
                    diets: ['gluten free', 'lacto ovo vegetarian', 'primal', 'ketogenic'],
                    image: 'https://img.spoonacular.com/recipes/1591791-312x231.jpg'
                },
                {
                    mealId: 1652621,
                    name: 'Keto Pancakes',
                    diets: ['whole30', 'vegan', 'ketogenic'],
                    image: 'https://img.spoonacular.com/recipes/1652621-312x231.jpg'
                }
            ]
        },

        {
            _id: 2,
            user_id: 2,
            week: 1,
            meals: [
                {
                    mealId: 632849,
                    name: 'Asian Marinated Eggplant',
                    diets: ['gluten free', 'lacto ovo vegetarian', 'primal', 'ketogenic'],
                    image: 'https://img.spoonacular.com/recipes/632849-312x231.jpg'
                    
                },
                {
                    mealId: 659092,
                    name: 'Salmon on Kiwi & Lemon Puree',
                    diets: ['gluten free', 'dairy free', 'pescatarian'],
                    image: 'https://img.spoonacular.com/recipes/659092-312x231.jpg'
                }
            ]
        }
    ],

    findAll(userId) {
        // find all meal plans associated to a user by user_id
        return this.mealplans.filter((mealplan) => mealplan.user_id === userId);
    },

    findByKey(key, value) {
        // find a user by matching a specified key and value
        return this.mealplans.find((mealplan) => mealplan[key] === value);
    },

    find(userId, week) {
        // find a meal plan by user_id and week
        return this.mealplans.find((mealplan) => mealplan.user_id === userId && mealplan.week === week);
    },

    add(mealplan, mealplanId) {
        // if mealplanId is provided then we find the existing meal plan and add a meal
        if (mealplanId) {
            const idx = this.mealplans.findIndex((mealplan) => mealplan._id === mealplanId);

            this.mealplans[idx].meals.push(mealplan.meal);
            return this.mealplans[idx];
        }

        // if no mealplanId is provided then we know we need to create a new meal plan with the meal
        const addMealPlan = {
            _id: this.mealplans.length + 1,
            user_id: mealplan.user_id,
            week: mealplan.week,
            meals: [mealplan.meal]
        };
        this.mealplans.push(addMealPlan);

        return addMealPlan;
    },

    delete(mealplanId) {
        this.mealplans = this.mealplans.filter((mealplan) => mealplan._id !== mealplanId);

        return mealplanId;
    }
};

export { Users, MealPlans };

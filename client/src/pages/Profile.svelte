<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import MealCard from "../components/MealCard.svelte";


    let { id } = $props();

    let profile = $state(null);

    onMount(async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const response = await axios.get(`http://localhost:8080/users/${id}`,{
                headers: {
                    Authorization: user.header_token
                }
            });

            profile = response.data;

        } catch (error){
            console.log(error);
        }
    })
</script>

<div class="profile-container">
    {#if !profile}
        <div>Loading User Profile...</div>
    {:else}
        <h1>Welcome, {profile.username}!</h1>
        <h2>User Mealplan with {profile.preferences}</h2>
        <div>
            {#if profile.mealplans.length === 0}
                <p>No Meals in your Mealplan. </p>
            {:else}
                {#each profile.mealplans as mealplan}
                    <div class="mealplan-week">
                        <p>Your Week: {mealplan.week}</p> 
                    </div>
                    <div class="meal-list">
                        {#each mealplan.meals as meal}
                            <MealCard 
                                image={meal.image}
                                title={meal.name}
                                diet= {meal.diets}
                            />
                        {/each}
                    </div>
                {/each}
            {/if}
        </div>
    {/if}
</div>


<style>
    .profile-container {
        margin: 2rem auto;
        padding: 2rem;
        text-align: left;
    }

    h1 {
        font-family: 'Montserrat', sans-serif;
        font-size: 2rem;
    }

    h2 {
        font-family: 'Montserrat', sans-serif;
        font-size: 1.5rem;
    }

    .meal-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1.5rem;
        margin-top: 2rem;
    }

    .mealplan-week {
        font-family: 'Montserrat', sans-serif;
        font-size: 1.3rem;
        margin-bottom: 1rem; /* Adds spacing between week and meals */
        font-weight: bold;
    }
</style>

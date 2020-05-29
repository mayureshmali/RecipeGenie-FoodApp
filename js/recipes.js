// From stup page, pre-modulated::::::::::::::::::::::::::::::::::::::::::::::::

const recipesModule = (function() {

    // Private

    let _render = false;
    
    function _renderRecipe(recipe) {
        const recipeLabel = recipe.label.replace('recipes', '');
        const recipeBulletList = recipe.ingredientLines.join('<li>');
        return `
            <section role="region" class="recipe-card">
                <div class="recipe-header">
                    <div class="recipe-image" style="background-image: url('${recipe.image}');">
                    </div>
                    <div class="recipe-name">
                        <h2>${recipeLabel}</h2>
                        <a href="${recipe.shareAs}" target="_blank"><button class="recipe-link-button button-common">Get the recipe!</button></a>
                    </div>
                    
                </div>
                <div class="card-ingredient-list">
                    <h3>You'll need:</h3>
                    <ul>
                        <li>${recipeBulletList}</li>
                    </ul>
                </div>
            </section>
            `;
    }
        
    function _renderRecipeList(recipeList) {
        const noRecipes = recipeList.length === 0;
        return noRecipes ?
            `<p class="no-recipes-message">We couldn\'t find any recipes using those ingredients, try again!</p>`
            :
            `${recipeList.map(_renderRecipe).join('')}`
    }

    function _handleRetry() {
        $('#retry-button').click(function(event) {
            event.preventDefault();
            window.location.href = '';
            render();
        })
    }

    function _handleNavRestart() {
        $('#nav-restart-button').click(function(event) {
            event.preventDefault();
            window.location.href = '';
            render();
        })
    }

    // Public

    function initiate(mainRender) {
        if (!_render) {
            _render = mainRender;
        }
    }

    function renderRecipesPage(state) {
        const recipeList = _renderRecipeList(state.recipes)
        const recipesPageContent = `
            <nav class="nav" role="navigation">
                <p class="nav-logo">RecipeGenie! &nbsp;<span class="fas fa-utensils"></span></p>
                <div class="nav-restart-button" id="nav-restart-button"><span class="fas fa-undo"></span> Restart</div>
            </nav>
            <div class="page-container">
                <h1 class="header">Recipes</h1>
                <section class="recipe-results" id="recipe-results" role="region">
                    ${recipeList}
                </section>
                <button class="retry-button button-common" id="retry-button">Retry?</button>
            </div>
            `;
    
        const recipePage = commonModule.renderLayout(recipesPageContent);
        $('#root').append(recipePage);
        $('body').removeClass('waiting');
        $(window).scrollTop(0);
        _handleRetry();
        _handleNavRestart();
    }


    return {
        render: renderRecipesPage,
        initiate
    }

})()

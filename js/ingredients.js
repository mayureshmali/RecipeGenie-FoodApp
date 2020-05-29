const ingredientsModule = (function () {
    // Private

    let _render = false;



    function _renderIngredient(ingredient, index) {
        return `
            <div class="ingredient" data-index=${index}>
                <p class="ingredient-label">
                    ${ingredient}
                </p>
                <button class="delete-button">
                    <span class="fas fa-times"></span>
                </button>
            </div>
            `;
    }

    function _renderIngredientList(ingredientList) {
        const ingredients = ingredientList.map(_renderIngredient);
        return `
            <section class="predictions-box" id="predictions-box" role="region">
                ${ingredients.join("")}
            </section>
            `;
    }

    function _handleConfirmIngredients(state) {
        $('#confirm-ingredients-button').click(function (event) {
            event.preventDefault();
            /* change the text in the 'Get some recipes' button to a spinning carrot icon to indicate loading */
            $('#confirm-ingredients-button').html('<span class="fas fa-carrot loader"></span>');
            $('#confirm-ingredients-button').css({
                'padding': '14px 105px',
                'transition': '0s'
            })
            $('body').addClass('waiting');
            /* functionality that deals with sending the ingredients to the Edamam API */
            edamamAPI.analyzeIngredients()
                .then(response => {
                    state.currentPage = "recipes";
                    render(state);
                });
        });
    }

    // Remove an ingredient from the list on the page and from the STORE
    function _handleRemoveIngredient(state) {
        $('.delete-button').click(function (event) {
            event.preventDefault();
            const index = $(this).closest('div')[0].dataset.index;
            state.ingredients.splice(index, 1);
            _render(state);

        })
    }

    // Toggle the visibility of the 'add ingredients' text field
    function _handleToggleAddIngredient() {
        $('#toggle-add-ingredient').click(function (event) {
            event.preventDefault();
            $('#add-ingredients-form').removeClass('hidden');
            $('#toggle-add-ingredient').addClass('grey-out');
        })
    }

    // Add a new ingredient to the list on the page and to the STORE
    function _handleAddIngredient(state) {
        if ($('.add-ingredient').val() !== '') {
            $('#add-ingredient-button').click(function (event) {
                event.preventDefault();
                const newIngredient = $('#add-ingredient').val();
                state.ingredients.push(newIngredient);
                _render(state);
            })
        }
    }

    function _handleNavRestart() {
        $('#nav-restart-button').click(function (event) {
            event.preventDefault();
            window.location.href = '';
            render();
        })
    }

    // Public

    function initiate(mainRender) {
        if (!_render) {
            _render = mainRender;
        };
    }

    function renderIngredientsPage(state) {
        const ingredientList = _renderIngredientList(state.ingredients/* apiFetch.ingredients */)
        const ingredientsPageContent = `
            <nav class="nav" role="navigation">
                <p class="nav-logo">RecipeGenie! &nbsp;<span class="fas fa-utensils"></span></p>
                <div class="nav-restart-button" id="nav-restart-button"><span class="fas fa-undo"></span> Restart</div>
            </nav>
            <section class="page-container">
                <h1 class="header">Ingredients</h1>
                <p class="body-paragraphs">Is this what was in your picture? If we got it wrong, you may use this page to add or delete ingredients.</p>
                ${ingredientList}
                <form role="form" id="add-ingredients-form" class="add-ingredients-form hidden">
                    <input type="text" name="add-ingredient" id="add-ingredient" class="add-ingredient-field" placeholder="Add another ingredient" list="ingredientlist">
                    <datalist id="ingredientlist">
                    <option>american cheese</option>
                    <option>asiago</option>
                    <option>blue cheese</option>
                    <option>bocconcini cheese</option>
                    <option>brick cheese</option>
                    <option>brie</option>
                    <option>butter</option>
                    <option>buttermilk</option>
                    <option>camembert cheese</option>
                    <option>cheddar</option>
                    <option>cheese soup</option>
                    <option>cheshire cheese</option>
                    <option>colby cheese</option>
                    <option>condensed milk</option>
                    <option>cottage cheese</option>
                    <option>cream</option>
                    <option>cream cheese</option>
                    <option>creme de cassis</option>
                    <option>creme fraiche</option>
                    <option>custard</option>
                    <option>double gloucester cheese</option>
                    <option>edam cheese</option>
                    <option>egg</option>
                    <option>emmenthaler cheese</option>
                    <option>evaporated milk</option>
                    <option>farmer cheese</option>
                    <option>feta</option>
                    <option>fontina</option>
                    <option>frosting</option>
                    <option>garlic herb cheese</option>
                    <option>ghee</option>
                    <option>goat cheese</option>
                    <option>goat milk</option>
                    <option>gouda</option>
                    <option>gruyere</option>
                    <option>half and half</option>
                    <option>halloumi</option>
                    <option>hard cheese</option>
                    <option>havarti cheese</option>
                    <option>ice cream</option>
                    <option>italian cheese</option>
                    <option>jarlsberg cheese</option>
                    <option>lancashire cheese</option>
                    <option>longhorn cheese</option>
                    <option>manchego</option>
                    <option>mascarpone</option>
                    <option>milk</option>
                    <option>monterey jack cheese</option>
                    <option>mozzarella</option>
                    <option>muenster</option>
                    <option>neufchatel</option>
                    <option>paneer</option>
                    <option>parmesan</option>
                    <option>pecorino cheese</option>
                    <option>pepper jack</option>
                    <option>pepperjack cheese</option>
                    <option>pizza cheese</option>
                    <option>powdered milk</option>
                    <option>provolone</option>
                    <option>queso fresco cheese</option>
                    <option>raclette cheese</option>
                    <option>red leicester cheese</option>
                    <option>ricotta</option>
                    <option>romano</option>
                    <option>soft cheese</option>
                    <option>sour cream</option>
                    <option>stilton cheese</option>
                    <option>swiss cheese</option>
                    <option>velveeta</option>
                    <option>wensleydale cheese</option>
                    <option>whipped cream</option>
                    <option>yogurt</option>
                    <option>artichoke</option>
                    <option>artichoke heart</option>
                    <option>arugula</option>
                    <option>asparagus</option>
                    <option>avocado</option>
                    <option>bamboo shoot</option>
                    <option>basil</option>
                    <option>bean sprouts</option>
                    <option>beet</option>
                    <option>bell pepper</option>
                    <option>bok choy</option>
                    <option>broccoli</option>
                    <option>broccoli rabe</option>
                    <option>brussels sprout</option>
                    <option>burdock</option>
                    <option>butternut</option>
                    <option>butternut squash</option>
                    <option>cabbage</option>
                    <option>canned tomato</option>
                    <option>caper</option>
                    <option>capsicum</option>
                    <option>carrot</option>
                    <option>cauliflower</option>
                    <option>celery</option>
                    <option>celery root</option>
                    <option>chard</option>
                    <option>chayote</option>
                    <option>chia seeds</option>
                    <option>chili pepper</option>
                    <option>chinese broccoli</option>
                    <option>cilantro</option>
                    <option>collard</option>
                    <option>corn</option>
                    <option>cress</option>
                    <option>cucumber</option>
                    <option>daikon</option>
                    <option>dill</option>
                    <option>dulse</option>
                    <option>eggplant</option>
                    <option>endive</option>
                    <option>fennel</option>
                    <option>frozen vegetables</option>
                    <option>garlic</option>
                    <option>ginger</option>
                    <option>green beans</option>
                    <option>hearts of palm</option>
                    <option>horseradish</option>
                    <option>jerusalem artichoke</option>
                    <option>jicama</option>
                    <option>kale</option>
                    <option>kohlrabi</option>
                    <option>leek</option>
                    <option>micro greens</option>
                    <option>mint</option>
                    <option>mixed vegetable</option>
                    <option>mushroom</option>
                    <option>mustard greens</option>
                    <option>okra</option>
                    <option>olive</option>
                    <option>onion</option>
                    <option>parsley</option>
                    <option>parsnip</option>
                    <option>pickle</option>
                    <option>pimiento</option>
                    <option>porcini</option>
                    <option>portobello mushroom</option>
                    <option>potato</option>
                    <option>pumpkin</option>
                    <option>radicchio</option>
                    <option>radish</option>
                    <option>red onion</option>
                    <option>rocket</option>
                    <option>rosemary</option>
                    <option>rutabaga</option>
                    <option>salad greens</option>
                    <option>sauerkraut</option>
                    <option>scallion</option>
                    <option>seaweed</option>
                    <option>shallot</option>
                    <option>snow peas</option>
                    <option>spaghetti squash</option>
                    <option>spinach</option>
                    <option>squash</option>
                    <option>sun dried tomato</option>
                    <option>sweet pepper</option>
                    <option>sweet potato</option>
                    <option>tomatillo</option>
                    <option>tomato</option>
                    <option>turnip</option>
                    <option>water chestnut</option>
                    <option>watercress</option>
                    <option>yam</option>
                    <option>zucchini</option>
                    <option>apple</option>
                    <option>apple butter</option>
                    <option>apricot</option>
                    <option>banana</option>
                    <option>berries</option>
                    <option>blackberry</option>
                    <option>blueberry</option>
                    <option>boysenberry</option>
                    <option>cantaloupe</option>
                    <option>cherry</option>
                    <option>clementine</option>
                    <option>coconut</option>
                    <option>crabapples</option>
                    <option>craisins</option>
                    <option>cranberry</option>
                    <option>currant</option>
                    <option>date</option>
                    <option>fig</option>
                    <option>grape</option>
                    <option>grapefruit</option>
                    <option>guava</option>
                    <option>honeydew</option>
                    <option>kiwi</option>
                    <option>kumquat</option>
                    <option>lemon</option>
                    <option>lime</option>
                    <option>lingonberry</option>
                    <option>lychee</option>
                    <option>mandarin</option>
                    <option>mango</option>
                    <option>nectarine</option>
                    <option>orange</option>
                    <option>papaya</option>
                    <option>passion fruit</option>
                    <option>peach</option>
                    <option>pear</option>
                    <option>persimmons</option>
                    <option>pineapple</option>
                    <option>plantain</option>
                    <option>plum</option>
                    <option>pomegranate</option>
                    <option>prunes</option>
                    <option>quince</option>
                    <option>raisin</option>
                    <option>raspberry</option>
                    <option>rhubarb</option>
                    <option>star fruit</option>
                    <option>strawberry</option>
                    <option>sultanas</option>
                    <option>tangelos</option>
                    <option>tangerine</option>
                    <option>watermelon</option>
                    <option>angel food</option>
                    <option>angel hair</option>
                    <option>bagel</option>
                    <option>baguette</option>
                    <option>baking powder</option>
                    <option>baking soda</option>
                    <option>barley</option>
                    <option>bicarbonate of soda</option>
                    <option>biscuits</option>
                    <option>bisquick</option>
                    <option>bran</option>
                    <option>bread</option>
                    <option>bread crumbs</option>
                    <option>bread dough</option>
                    <option>bread flour</option>
                    <option>breadsticks</option>
                    <option>brown rice</option>
                    <option>buckwheat</option>
                    <option>cake mix</option>
                    <option>cereal</option>
                    <option>challah</option>
                    <option>chips</option>
                    <option>ciabatta</option>
                    <option>coconut flake</option>
                    <option>coconut flour</option>
                    <option>corn tortillas</option>
                    <option>cornbread</option>
                    <option>cornflour</option>
                    <option>cornmeal</option>
                    <option>cornstarch</option>
                    <option>couscous</option>
                    <option>cracker</option>
                    <option>cream of wheat</option>
                    <option>crescent roll dough</option>
                    <option>croissants</option>
                    <option>croutons</option>
                    <option>english muffin</option>
                    <option>filo dough</option>
                    <option>flour</option>
                    <option>flour tortillas</option>
                    <option>gnocchi</option>
                    <option>gram flour</option>
                    <option>hot dog bun</option>
                    <option>lasagne</option>
                    <option>macaroni cheese mix</option>
                    <option>malt extract</option>
                    <option>matzo meal</option>
                    <option>muffin mix</option>
                    <option>multigrain bread</option>
                    <option>noodle</option>
                    <option>pancake mix</option>
                    <option>pasta</option>
                    <option>pie crust</option>
                    <option>pierogi</option>
                    <option>pita</option>
                    <option>pizza dough</option>
                    <option>polenta</option>
                    <option>popcorn</option>
                    <option>potato flakes</option>
                    <option>potato starch</option>
                    <option>pretzel</option>
                    <option>puff pastry</option>
                    <option>quinoa</option>
                    <option>ramen</option>
                    <option>ravioli</option>
                    <option>rice</option>
                    <option>rice flour</option>
                    <option>risotto</option>
                    <option>rolled oats</option>
                    <option>rye</option>
                    <option>saltines</option>
                    <option>self rising flour</option>
                    <option>semolina</option>
                    <option>shortcrust pastry</option>
                    <option>sorghum flour</option>
                    <option>sourdough starter</option>
                    <option>spelt</option>
                    <option>sponge cake</option>
                    <option>starch</option>
                    <option>stuffing mix</option>
                    <option>tapioca flour</option>
                    <option>tapioca starch</option>
                    <option>vermicelli</option>
                    <option>wafer</option>
                    <option>wheat</option>
                    <option>wheat germ</option>
                    <option>whole wheat flour</option>
                    <option>yeast</option>
                    <option>yeast flake</option>
                    <option>agave nectar</option>
                    <option>artificial sweetener</option>
                    <option>brown sugar</option>
                    <option>confectioners sugar</option>
                    <option>corn syrup</option>
                    <option>honey</option>
                    <option>maple syrup</option>
                    <option>molasses</option>
                    <option>sugar</option>
                    <option>allspice</option>
                    <option>aniseed</option>
                    <option>bay leaf</option>
                    <option>cacao</option>
                    <option>cajun seasoning</option>
                    <option>caraway</option>
                    <option>cardamom</option>
                    <option>cayenne</option>
                    <option>celery salt</option>
                    <option>celery seed</option>
                    <option>chile powder</option>
                    <option>chili paste</option>
                    <option>chili powder</option>
                    <option>chinese five spice</option>
                    <option>chipotle</option>
                    <option>chive</option>
                    <option>cinnamon</option>
                    <option>clove</option>
                    <option>coriander</option>
                    <option>cumin</option>
                    <option>curry powder</option>
                    <option>dill seed</option>
                    <option>fennel seed</option>
                    <option>fenugreek</option>
                    <option>garam masala</option>
                    <option>garlic powder</option>
                    <option>ground coriander</option>
                    <option>ground nutmeg</option>
                    <option>herbes de provence</option>
                    <option>herbs</option>
                    <option>italian herbs</option>
                    <option>italian seasoning</option>
                    <option>italian spice</option>
                    <option>lavender</option>
                    <option>lemon balm</option>
                    <option>marjoram</option>
                    <option>mustard seed</option>
                    <option>nutmeg</option>
                    <option>old bay seasoning</option>
                    <option>onion flake</option>
                    <option>onion powder</option>
                    <option>oregano</option>
                    <option>paprika</option>
                    <option>peppercorn</option>
                    <option>poultry seasoning</option>
                    <option>red pepper flake</option>
                    <option>saffron</option>
                    <option>sage</option>
                    <option>savory</option>
                    <option>star anise</option>
                    <option>steak seasoning</option>
                    <option>taco seasoning</option>
                    <option>tamarind</option>
                    <option>tarragon</option>
                    <option>thyme</option>
                    <option>turmeric</option>
                    <option>vanilla</option>
                    <option>vanilla essence</option>
                    <option>alligator</option>
                    <option>bacon</option>
                    <option>beef liver</option>
                    <option>beef ribs</option>
                    <option>beef roast</option>
                    <option>beef shank</option>
                    <option>beef sirloin</option>
                    <option>beef steak</option>
                    <option>beef suet</option>
                    <option>bologna</option>
                    <option>bratwurst</option>
                    <option>canadian bacon</option>
                    <option>chicken breast</option>
                    <option>chicken giblets</option>
                    <option>chicken leg</option>
                    <option>chicken roast</option>
                    <option>chicken tenders</option>
                    <option>chicken thighs</option>
                    <option>chicken wings</option>
                    <option>chorizo</option>
                    <option>cooked chicken</option>
                    <option>corned beef</option>
                    <option>cornish hen</option>
                    <option>deer</option>
                    <option>duck</option>
                    <option>duck liver</option>
                    <option>elk</option>
                    <option>foie gras</option>
                    <option>goose</option>
                    <option>goose liver</option>
                    <option>ground beef</option>
                    <option>ground chicken</option>
                    <option>ground lamb</option>
                    <option>ground pork</option>
                    <option>ground turkey</option>
                    <option>ground veal</option>
                    <option>grouse</option>
                    <option>ham</option>
                    <option>hot dog</option>
                    <option>lamb</option>
                    <option>lamb chops</option>
                    <option>lamb liver</option>
                    <option>lamb loin</option>
                    <option>lamb shank</option>
                    <option>lamb shoulder</option>
                    <option>leg of lamb</option>
                    <option>liver sausage</option>
                    <option>marrow bones</option>
                    <option>moose</option>
                    <option>ostrich</option>
                    <option>oxtail</option>
                    <option>pancetta</option>
                    <option>pastrami</option>
                    <option>pepperoni</option>
                    <option>pheasant</option>
                    <option>pigeon</option>
                    <option>polish sausage</option>
                    <option>pork</option>
                    <option>pork belly</option>
                    <option>pork chops</option>
                    <option>pork liver</option>
                    <option>pork loin</option>
                    <option>pork ribs</option>
                    <option>pork roast</option>
                    <option>pork shoulder</option>
                    <option>prosciutto</option>
                    <option>quail</option>
                    <option>rabbit</option>
                    <option>salami</option>
                    <option>sausage</option>
                    <option>sliced turkey</option>
                    <option>snail</option>
                    <option>soppressata</option>
                    <option>spam</option>
                    <option>sweetbread</option>
                    <option>turkey</option>
                    <option>turkey liver</option>
                    <option>veal</option>
                    <option>veal chops</option>
                    <option>veal cutlet</option>
                    <option>veal shank</option>
                    <option>venison</option>
                    <option>whole chicken</option>
                    <option>wild boar</option>
                    <option>amberjack</option>
                    <option>anchovy</option>
                    <option>arctic char</option>
                    <option>barramundi</option>
                    <option>bluefish</option>
                    <option>canned salmon</option>
                    <option>canned tuna</option>
                    <option>carp</option>
                    <option>catfish</option>
                    <option>caviar</option>
                    <option>cod</option>
                    <option>cuttlefish</option>
                    <option>eel</option>
                    <option>fish fillets</option>
                    <option>flounder</option>
                    <option>grouper</option>
                    <option>haddock</option>
                    <option>halibut</option>
                    <option>herring</option>
                    <option>john dory</option>
                    <option>lemon sole</option>
                    <option>mackerel</option>
                    <option>mahi mahi</option>
                    <option>marlin</option>
                    <option>monkfish</option>
                    <option>perch</option>
                    <option>pike</option>
                    <option>pollock</option>
                    <option>pompano</option>
                    <option>red snapper</option>
                    <option>rockfish</option>
                    <option>salmon</option>
                    <option>sardines</option>
                    <option>sea bass</option>
                    <option>smoked salmon</option>
                    <option>sole</option>
                    <option>sturgeon</option>
                    <option>swordfish</option>
                    <option>tilapia</option>
                    <option>trout</option>
                    <option>tuna steak</option>
                    <option>whitefish</option>
                    <option>calamari</option>
                    <option>clam</option>
                    <option>cockle</option>
                    <option>conch</option>
                    <option>crab</option>
                    <option>crawfish</option>
                    <option>lobster</option>
                    <option>mussel</option>
                    <option>octopus</option>
                    <option>oyster</option>
                    <option>prawns</option>
                    <option>scallop</option>
                    <option>sea urchin</option>
                    <option>shrimp</option>
                    <option>squid</option>
                    <option>adobo sauce</option>
                    <option>apple cider vinegar</option>
                    <option>balsamic vinegar</option>
                    <option>barbecue sauce</option>
                    <option>blue cheese dressing</option>
                    <option>buffalo sauce</option>
                    <option>caesar dressing</option>
                    <option>cider vinegar</option>
                    <option>cocktail sauce</option>
                    <option>cream sauce</option>
                    <option>duck sauce</option>
                    <option>enchilada sauce</option>
                    <option>fish sauce</option>
                    <option>french dressing</option>
                    <option>honey mustard</option>
                    <option>hot sauce</option>
                    <option>italian dressing</option>
                    <option>ketchup</option>
                    <option>marsala</option>
                    <option>mayonnaise</option>
                    <option>mirin</option>
                    <option>mustard</option>
                    <option>oyster sauce</option>
                    <option>picante sauce</option>
                    <option>pickapeppa sauce</option>
                    <option>ponzu</option>
                    <option>ranch dressing</option>
                    <option>rice vinegar</option>
                    <option>salad dressing</option>
                    <option>sesame dressing</option>
                    <option>soy sauce</option>
                    <option>sriracha</option>
                    <option>steak sauce</option>
                    <option>sweet and sour sauce</option>
                    <option>tabasco</option>
                    <option>taco sauce</option>
                    <option>tahini</option>
                    <option>tartar sauce</option>
                    <option>teriyaki</option>
                    <option>thousand island</option>
                    <option>tzatziki sauce</option>
                    <option>vinaigrette dressing</option>
                    <option>vinegar</option>
                    <option>wine vinegar</option>
                    <option>worcestershire</option>
                    <option>yuzu juice</option>
                    <option>almond oil</option>
                    <option>avocado oil</option>
                    <option>canola oil</option>
                    <option>coconut oil</option>
                    <option>cooking spray</option>
                    <option>corn oil</option>
                    <option>grape seed oil</option>
                    <option>hazelnut oil</option>
                    <option>lard</option>
                    <option>mustard oil</option>
                    <option>olive oil</option>
                    <option>palm oil</option>
                    <option>peanut oil</option>
                    <option>pistachio oil</option>
                    <option>safflower oil</option>
                    <option>sesame oil</option>
                    <option>shortening</option>
                    <option>soya oil</option>
                    <option>soybean oil</option>
                    <option>sunflower oil</option>
                    <option>vegetable oil</option>
                    <option>walnut oil</option>
                    <option>accent seasoning</option>
                    <option>adobo seasoning</option>
                    <option>apple cider</option>
                    <option>balsamic glaze</option>
                    <option>bbq rub</option>
                    <option>bouillon</option>
                    <option>brine</option>
                    <option>caribbean jerk seasoning</option>
                    <option>cassia</option>
                    <option>champagne vinegar</option>
                    <option>chili sauce</option>
                    <option>cream of tartar</option>
                    <option>fish stock</option>
                    <option>ground ginger</option>
                    <option>hoisin sauce</option>
                    <option>jamaican jerk spice</option>
                    <option>kasuri methi</option>
                    <option>liquid smoke</option>
                    <option>mango powder</option>
                    <option>matcha powder</option>
                    <option>miso</option>
                    <option>mustard powder</option>
                    <option>pickling salt</option>
                    <option>pickling spice</option>
                    <option>poppy seed</option>
                    <option>rice wine</option>
                    <option>rose water</option>
                    <option>sesame seed</option>
                    <option>soya sauce</option>
                    <option>vegetable bouillon</option>
                    <option>wasabi</option>
                    <option>alfredo sauce</option>
                    <option>beef gravy</option>
                    <option>chicken gravy</option>
                    <option>cranberry sauce</option>
                    <option>cream gravy</option>
                    <option>curry paste</option>
                    <option>giblet gravy</option>
                    <option>mushroom gravy</option>
                    <option>onion gravy</option>
                    <option>pesto</option>
                    <option>pork gravy</option>
                    <option>salsa</option>
                    <option>sausage gravy</option>
                    <option>tomato gravy</option>
                    <option>tomato paste</option>
                    <option>tomato sauce</option>
                    <option>turkey gravy</option>
                    <option>black beans</option>
                    <option>cannellini beans</option>
                    <option>chickpea</option>
                    <option>chili beans</option>
                    <option>edamame</option>
                    <option>fava beans</option>
                    <option>french beans</option>
                    <option>great northern beans</option>
                    <option>green beans</option>
                    <option>hummus</option>
                    <option>kidney beans</option>
                    <option>lentil</option>
                    <option>lima beans</option>
                    <option>navy beans</option>
                    <option>peas</option>
                    <option>pinto beans</option>
                    <option>red beans</option>
                    <option>refried beans</option>
                    <option>snap peas</option>
                    <option>soybeans</option>
                    <option>split peas</option>
                    <option>absinthe</option>
                    <option>amaretto</option>
                    <option>anisette</option>
                    <option>beer</option>
                    <option>bitters</option>
                    <option>bloody mary</option>
                    <option>bourbon</option>
                    <option>brandy</option>
                    <option>burgundy wine</option>
                    <option>cabernet sauvignon</option>
                    <option>champagne</option>
                    <option>chocolate liqueur</option>
                    <option>ciclon</option>
                    <option>cognac</option>
                    <option>cooking wine</option>
                    <option>creme de menthe</option>
                    <option>curacao</option>
                    <option>dessert wine</option>
                    <option>drambuie</option>
                    <option>frangelico</option>
                    <option>gin</option>
                    <option>grand marnier</option>
                    <option>grappa</option>
                    <option>irish cream</option>
                    <option>kahlua</option>
                    <option>limoncello</option>
                    <option>liqueur</option>
                    <option>madeira wine</option>
                    <option>maraschino</option>
                    <option>masala</option>
                    <option>ouzo</option>
                    <option>port wine</option>
                    <option>raspberry liquor</option>
                    <option>red wine</option>
                    <option>rum</option>
                    <option>sake</option>
                    <option>schnapps</option>
                    <option>shaoxing wine</option>
                    <option>sherry</option>
                    <option>sparkling wine</option>
                    <option>tequila</option>
                    <option>triple sec</option>
                    <option>vermouth</option>
                    <option>vodka</option>
                    <option>whiskey</option>
                    <option>whisky</option>
                    <option>white wine</option>
                    <option>beef broth</option>
                    <option>celery soup</option>
                    <option>chicken broth</option>
                    <option>chicken soup</option>
                    <option>dashi</option>
                    <option>lamb stock</option>
                    <option>mushroom soup</option>
                    <option>onion soup</option>
                    <option>pork stock</option>
                    <option>tomato soup</option>
                    <option>veal stock</option>
                    <option>vegetable soup</option>
                    <option>vegetable stock</option>
                    <option>almond</option>
                    <option>almond meal</option>
                    <option>almond paste</option>
                    <option>cashew</option>
                    <option>chestnut</option>
                    <option>flax</option>
                    <option>hazelnut</option>
                    <option>macadamia</option>
                    <option>macaroon</option>
                    <option>peanut</option>
                    <option>peanut butter</option>
                    <option>pecan</option>
                    <option>pine nut</option>
                    <option>pistachio</option>
                    <option>praline</option>
                    <option>walnut</option>
                    <option>almond milk</option>
                    <option>coconut milk</option>
                    <option>hemp milk</option>
                    <option>margarine</option>
                    <option>non dairy creamer</option>
                    <option>rice milk</option>
                    <option>soy milk</option>
                    <option>amaretti cookies</option>
                    <option>apple jelly</option>
                    <option>apple sauce</option>
                    <option>apricot jam</option>
                    <option>biscotti biscuit</option>
                    <option>bittersweet chocolate</option>
                    <option>black pudding</option>
                    <option>blackberry preserves</option>
                    <option>blueberry jam</option>
                    <option>brownie mix</option>
                    <option>butterscotch</option>
                    <option>candy</option>
                    <option>caramel</option>
                    <option>cherry jam</option>
                    <option>chilli jam</option>
                    <option>chocolate</option>
                    <option>chocolate bar</option>
                    <option>chocolate chips</option>
                    <option>chocolate cookies</option>
                    <option>chocolate morsels</option>
                    <option>chocolate powder</option>
                    <option>chocolate pudding</option>
                    <option>chocolate syrup</option>
                    <option>chocolate wafer</option>
                    <option>cinnamon roll</option>
                    <option>cookie crumb</option>
                    <option>cookie dough</option>
                    <option>cookies</option>
                    <option>corn chips</option>
                    <option>currant jelly</option>
                    <option>dark chocolate</option>
                    <option>doritos</option>
                    <option>doughnut</option>
                    <option>fig jam</option>
                    <option>fudge</option>
                    <option>graham cracker</option>
                    <option>grape jelly</option>
                    <option>gummy worms</option>
                    <option>jalapeno jelly</option>
                    <option>jam</option>
                    <option>jello</option>
                    <option>lady fingers</option>
                    <option>lemon jelly</option>
                    <option>marshmallow</option>
                    <option>mint jelly</option>
                    <option>nutella</option>
                    <option>orange jelly</option>
                    <option>oreo</option>
                    <option>peach preserves</option>
                    <option>plum jam</option>
                    <option>potato chips</option>
                    <option>pudding mix</option>
                    <option>quince jelly</option>
                    <option>raspberry jam</option>
                    <option>red pepper jelly</option>
                    <option>strawberry jam</option>
                    <option>white chocolate</option>
                    <option>apple juice</option>
                    <option>cherry juice</option>
                    <option>chocolate milk</option>
                    <option>club soda</option>
                    <option>coffee</option>
                    <option>coke</option>
                    <option>cranberry juice</option>
                    <option>espresso</option>
                    <option>fruit juice</option>
                    <option>ginger ale</option>
                    <option>green tea</option>
                    <option>grenadine</option>
                    <option>kool aid</option>
                    <option>lemonade</option>
                    <option>margarita mix</option>
                    <option>mountain dew</option>
                    <option>orange juice</option>
                    <option>pepsi</option>
                    <option>pineapple juice</option>
                    <option>sprite</option>
                    <option>tea</option>
                    <option>tomato juice</option>                                     
                    </datalist>
                    <button type="submit" name="add-ingredient-button" id="add-ingredient-button" class="add-ingredient-button button-common">
                        <span class="fas fa-check"></span>
                    </button>
                </form>
                <button class="toggle-add-ingredient" id="toggle-add-ingredient">Add Ingredients</button><br>
                <button class="confirm-ingredients-button button-common" id="confirm-ingredients-button">Get some recipes!</button>
            </section>
            `;

        const ingredientsPage = commonModule.renderLayout(ingredientsPageContent);
        $('#root').append(ingredientsPage);
        _handleConfirmIngredients(state);
        _handleRemoveIngredient(state);
        _handleToggleAddIngredient();
        _handleAddIngredient(state);
        _handleNavRestart();
    }

    return {
        render: renderIngredientsPage,
        initiate
    }




})()
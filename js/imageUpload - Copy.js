// Begin working module: ***********************************************************

const imageUploadModule = (function() {

    // Private

    let _render = false;

    function _handleUploadClick() {
        $('#upload-button-surrogate').click(function () { // on a click on the button with id 'upload-button-surrogate'
            $('#file').trigger('click');// trigger a click on the real file upload button 
        })
    }

    function _handleSubmitClick() {
        $('#submit-button-surrogate').click(function () { // on a click on the button with id 'submit-button-surrogate'
            $('#submit-button').trigger('click');// trigger a click on the real submit button 

        })
    }
    
    function _handleFileUploadEvent() {
        $('#file').change(function(f) {
            $('#submit-button-surrogate').removeClass('hidden');
            let fileName = f.target.files[0].name;
            $('#file-name-display').append(`File selected: ${fileName}`)
        })
    }
    
    function _handleImageSubmit(state) {
        $('.submit-button').click(function(event) {
            event.preventDefault();
            $(window).scrollTop(0);
            /* change the text in the 'Go!' button to a spinning carrot icon to indicate loading */
            $('#submit-button-surrogate').html('<span class="fas fa-carrot loader"></span>');
            /* Trigger file selection */
            const selectedFile = document.getElementById("file").files[0];
            /* turn data into base64 */ 
            const reader = new FileReader();
            reader.onloadend = function() {
                clarifaiAPI.analyzeImage(reader.result.replace('data:image/jpeg;base64,', ''))
                .then(arrayOfIngredients => {
                    state.ingredients = arrayOfIngredients;
                    /* Store response in the state, use data coming from API to populate the state */
                    state.currentPage = 'ingredients';
                    render(state);
                })
            };
            reader.readAsDataURL(selectedFile);
        })
    }

    // Public

    function initiate(mainRender) {
        if (!_render) {
            _render = mainRender;
        };
    }

    function renderLandingPage(state) {
        const landingPageContent = `
            <div class="page-container">
                <header role="banner" class="banner">
                    <h1 class="banner-logo">
                        <span class="fas fa-utensils"></span><br>
                        RecipeGenie!
                    </h1>
                </header>
            
                <p  class="body-paragraphs">Find exciting new recipes and explore the Chef within you! Just upload a 
                picture of your ingredients or enter them manually!</p>
                <p class="body-paragraphs"><strong>First, upload a picture here:</strong></p>
                <button class="upload-button-surrogate" id="upload-button-surrogate"><span class="fas fa-camera"></span></button>
                <p class="body-paragraphs"><strong>Or manually enter your ingredients here:</strong></p>
                <button class="upload-button-surrogate" id="upload-button-surrogate2"><span class="fas fa-keyboard"></span></button>
                <div class="file-name-display" id="file-name-display"></div>
                <button class="submit-button-surrogate button-common hidden" id="submit-button-surrogate">Go!</button>
                <form id="image-upload-form" role="form">
                    <input type="file" id="file" accept="image/*" value="Browse Files" class="file-input"><br>
                    <input type="submit" value="Go!" id="submit-button" class="hidden submit-button button-common">
                </form>
            </div>
            `;
    
        const landingPage = commonModule.renderLayout(landingPageContent);
        $("#root").append(landingPage);
        _handleUploadClick();
        _handleSubmitClick();
        _handleFileUploadEvent();
        _handleImageSubmit(state);
    }
    
    return {
        render: renderLandingPage,
        initiate
    }
    
})();
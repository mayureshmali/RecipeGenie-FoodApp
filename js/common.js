const commonModule = (function() {

    function renderLayout(children) {
        return `
            <main role="main">
                ${children}
            </main>
            `
    }

    return {
        renderLayout
    }
})();

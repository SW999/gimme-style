if (typeof GimmeStyle === 'undefined') {
    const GimmeStyle = {
        init: () => {
            console.log("GimmeStyle initialized");
        },
        destroy: () => {
            console.log("GimmeStyle destroyed");
        }
    };

    GimmeStyle.init();
} else {
    GimmeStyle.destroy();
}
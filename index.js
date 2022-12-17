const MouseTracker = (callback) => {
    const trackerEventListener = { handleEvent: callback };

    return {
        observe: (target) => {
            target.addEventListener('mousemove', trackerEventListener);
        },
        unobserve: (target) => {
            target.removeEventListener('mousemove', trackerEventListener);
        },
    };
};

const calculatePositionningInPercentage = (location, lenght) => {
    const middle = lenght / 2;
    let position = (location - middle) / middle;

    if (position < -1) {
        position = -1; 
    }
    else if (position > 1) {
        position = 1; 
    }


    return parseFloat(position);
}

window.addEventListener('load', () => {
    const card = document.getElementById('Card');

    if (card) {
        const { offsetWidth, offsetHeight } = card; 

        if (window.DeviceOrientationEvent) {
            let firstReading = true;
            let base = null;
            let timer = null;

            window.addEventListener("deviceorientation", ({ beta, gamma }) => {
                if (firstReading) {
                  firstReading = false;
                  base = { beta, gamma };
                }

                card.style.setProperty('--x', calculatePositionningInPercentage((base.gamma - gamma) * offsetWidth * .02 + offsetWidth / 2, offsetWidth));
                card.style.setProperty('--y', calculatePositionningInPercentage((base.beta - beta) * offsetHeight * .02 + offsetHeight / 2, offsetHeight));
            });
        } else {
            const tracker = MouseTracker(({layerX, layerY}) => {
                card.style.setProperty('--x', calculatePositionningInPercentage(layerX, offsetWidth));
                card.style.setProperty('--y', calculatePositionningInPercentage(layerY, offsetHeight));
            });
    
            tracker.observe(card);
    
            card.addEventListener('mouseleave', () => {
                card.style.setProperty('--x', 0);
                card.style.setProperty('--y', 0);
            });
        }
    }
});
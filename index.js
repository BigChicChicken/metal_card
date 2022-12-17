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
        const tracker = MouseTracker((e) => {
            card.style.setProperty('--x', calculatePositionningInPercentage(e.layerX, card.offsetWidth));
            card.style.setProperty('--y', calculatePositionningInPercentage(e.layerY, card.offsetHeight));
        });

        tracker.observe(card);

        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--x', 0);
            card.style.setProperty('--y', 0);
        });
    }
});
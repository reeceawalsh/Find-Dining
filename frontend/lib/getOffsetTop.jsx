const getOffsetTop = (element) => {
    let offsetTop = element.offsetTop;
    let currentElement = element;

    while (currentElement.offsetParent) {
        currentElement = currentElement.offsetParent;
        offsetTop += currentElement.offsetTop;
    }

    return offsetTop;
};

export default getOffsetTop;

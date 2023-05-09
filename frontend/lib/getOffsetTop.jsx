// this function was created to correctly calculate offSet from the top as my scroll function wasn't correctly scrolling down far enough. This function calculates the vertical offset of an element by summing up the offsetTop properties of the element and all its offset parents.
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

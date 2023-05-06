Object.defineProperty(HTMLFormElement.prototype, "submit", {
    configurable: true,
    writable: true,
    value: function () {
        const submitButton = this.ownerDocument.createElement("button");
        submitButton.type = "submit";
        submitButton.style.display = "none";
        this.appendChild(submitButton);
        submitButton.click();
        submitButton.remove();
    },
});

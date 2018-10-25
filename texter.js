class Texter {

    constructor(elemId) {
        this.elem = document.querySelector("#" + elemId)
    }

    display(text, delayMs, callback) {
        this.totalString = text
        this.currentString = ''
        this.delayMs = delayMs
        this.callback = callback

        this._updateTexter()
    }

    _updateTexter() {
        if (this.currentString.length < this.totalString.length) {
            this.currentString += this.totalString[this.currentString.length]
            this.elem.innerHTML = this.currentString

            window.setTimeout(() => this._updateTexter(), this.delayMs);
        }
        else {
            if (this.callback !== undefined) {
                this.callback();
            }
        }
    }
}
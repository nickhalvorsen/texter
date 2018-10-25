class Texter {

    constructor(elemId) {
        this.elem = document.querySelector("#" + elemId)
    }

    display(text, delayMs, callback) {
        this.message = text
        this.index = 0
        this.currentString = ''
        this.closingTags = ''
        this.delayMs = delayMs
        this.callback = callback

        this._updateTexter()
    }

    _updateTexter() {
        if (this.index < this.message.length) {
            var useDelay = true

            var letterToAdd = this.message[this.index]

            if (letterToAdd == '<' && this.message[this.index+1] == '/') {
                var start = this.index
                var end = this.message.indexOf('>', start) 
                var htmlTag = this.message.substring(start, end+1)
                var closingTag = '</' + this._getTagName(htmlTag) + '>'

                this.currentString += htmlTag
                this.index += closingTag.length 
                this.closingTags = this.closingTags.replace('/^' + closingTag + '/')
                useDelay = false
            }
            else if (letterToAdd == '<') {
                var start = this.index
                var end = this.message.indexOf('>', start) 
                var htmlTag = this.message.substring(start, end+1)
                var closingTag = '</' + this._getTagName(htmlTag) + '>'

                this.currentString += htmlTag
                this.index += htmlTag.length 
                this.closingTags = closingTag + this.closingTags
                useDelay = false
            }

            else {
                this.currentString += letterToAdd
                this.index++
            }

            this.elem.innerHTML = this.currentString + this.closingTags

            var delayMs = useDelay ? this.delayMs : 0
            window.setTimeout(() => this._updateTexter(), delayMs);
        }
        else {
            if (this.callback !== undefined) {
                this.callback();
            }
        }
    }

    _getTagName(tag) {
        var regex = /<\/?(\w+)/
        var match = regex.exec(tag)
        return match[1]
    }
}
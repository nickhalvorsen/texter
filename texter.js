class Texter {

    constructor(elemId) {
        this.elem = document.querySelector("#" + elemId)
    }

    display(text, delayMs, callback) {
        this.message = text
        this.messageIndex = 0
        this.currentText = ''
        this.currentClosingTags = ''
        this.delayMs = delayMs
        this.callback = callback

        this._updateTexter()
    }

    _updateTexter() {
        if (this._isDone()) {
            this._callCallback()
            return
        }

        var useDelay = true

        if (this._nextTokenIsClosingHtmlTag()) {
            this._processClosingHtmlTag()
            useDelay = false
        }
        else if (this._nextTokenIsOpeningHtmlTag()) {
            this._processOpeningHtmlTag()
            useDelay = false
        }
        else {
            this._processSingleCharacter()
        }

        this._updateElement()

        var delayMs = useDelay ? this.delayMs : 0
        window.setTimeout(() => this._updateTexter(), delayMs)
    }

    _isDone() {
        return this.messageIndex >= this.message.length
    }

    _callCallback() {
        if (this.callback === undefined) {
            return
        }
        this.callback()
    }

    _nextTokenIsClosingHtmlTag() {
        return this.message[this.messageIndex] == '<' 
            && this.message[this.messageIndex+1] == '/'
    }

    _processClosingHtmlTag() {
        var closingHtmlTag = this._getNextHtmlTag()
        var placeholderClosingHtmlTag = this._makeClosingTag(closingHtmlTag)

        this.currentText += closingHtmlTag
        this.messageIndex += closingHtmlTag.length 
        this.currentClosingTags = this.currentClosingTags.replace('/^' + placeholderClosingHtmlTag + '/')
    }

    _getNextHtmlTag() {
        var start = this.messageIndex
        var end = this.message.indexOf('>', start) 
        return this.message.substring(start, end+1)
    }

    _makeClosingTag(openingTag) {
        return '</' + this._getTagName(openingTag) + '>'
    }

    _getTagName(tag) {
        var regex = /<\/?(\w+)/
        var match = regex.exec(tag)
        return match[1]
    }

    _nextTokenIsOpeningHtmlTag() {
        return this.message[this.messageIndex] == '<' 
            && this.message[this.messageIndex + 1] != '\\'
    }

    _processOpeningHtmlTag() {
        var openingTag = this._getNextHtmlTag()
        var placeholderClosingTag = this._makeClosingTag(openingTag)

        this.currentText += openingTag
        this.messageIndex += openingTag.length 
        this.currentClosingTags = placeholderClosingTag + this.currentClosingTags
    }

    _processSingleCharacter() {
        this.currentText += this.message[this.messageIndex]
        this.messageIndex++
    }

    _updateElement() {
        this.elem.innerHTML = this.currentText + this.currentClosingTags
    }
}
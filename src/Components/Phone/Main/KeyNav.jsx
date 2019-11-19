class KeyNav {
    constructor(elements, cb) {
        this.position = {
            vertical: 0,
            horizontal: 0,
        }
        this.elements = elements.map((element, i) => {
            let pos = "[" + element.dataset.pos + "]"
            element.pos = JSON.parse(pos)
            return element
        })
        this.current = null
        this.cb = cb
        this.validateDirection = () => {
            let output = false
            this.elements.forEach((element) => {
                if (this.position.vertical === element.pos[0] && this.position.horizontal === element.pos[1]) {
                    output = true
                }
            })
            return output
        }
    }

    isPosition = (position) => {
        let output = false
        this.elements.forEach(({ pos }) => {
            if (JSON.stringify(position) === JSON.stringify(pos)) output = true
        })
        return output
    }

    handleSelected = () => {
        if (!this.elements) return
        this.elements.forEach(element => {
            if (this.position.vertical === element.pos[0] && this.position.horizontal === element.pos[1]) {
                element.classList.add(element.dataset.class ? element.dataset.class : "selected")
                element.focus()
                this.current = element
                this.cb("focus", element)
            } else {
                element.blur()
                element.classList.remove(element.dataset.class ? element.dataset.class : "selected")
            }
        })
    }


    navigate = (direction) => {
        switch (direction) {
            case "UP":
                this.position.vertical--
                if (this.validateDirection()) {
                    this.handleSelected()
                } else {
                    this.position.vertical++
                }
                break;
            case "DOWN":
                this.position.vertical++
                if (this.validateDirection()) {
                    this.handleSelected()
                } else {
                    this.position.vertical--
                }
                break;
            case "LEFT":
                this.position.horizontal--
                if (this.validateDirection()) {
                    this.handleSelected()
                } else {
                    this.position.horizontal++
                }
                break;
            case "RIGHT":
                this.position.horizontal++
                if (this.validateDirection()) {
                    this.handleSelected()
                } else {
                    this.position.horizontal--
                }
                break;
            case "ENTER":
                this.cb("enter", this.current)
                break;
            case "BACKSPACE":
                this.cb("backspace", this.current)
                break;
            default:
        }
    }
}

export default KeyNav;
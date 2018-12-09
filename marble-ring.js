/* a sort of doubly linked list */

const createMarble = (value, previous, next) => {
  return {
    value,
    previous,
    next,
    insert: function(newValue) {
      if (this.next === null) {
        const newMarble = createMarble(newValue, this, this)
        this.previous = newMarble
        this.next = newMarble
        return newMarble  
      } else {
        const newMarble = createMarble(newValue, this.previous, this)
        this.previous = newMarble
        newMarble.previous.next = newMarble
        return newMarble
      }
    },
    rotate: function(amount) {
      if (this.next === null) return this
      if (amount < 0) {
        return this.previous.rotate(amount + 1)
      } else if (amount > 0) {
        return this.next.rotate(amount -1)
      } else {
        return this
      }
    },
    removeCurrent: function() {
      this.previous.next = this.next
      this.next.previous = this.previous
      return this.next
    }
  }
}

module.exports = createMarble
const marble = (value, previous, next) => {
  return {
    value, 
    previous, 
    next
  }
}

/* a sort of doubly linked list */
module.exports = () => {
  return {
    current: null,
    insert: function(value) {
      if (this.current === null) {
        this.current = marble(value, null, null)
      } else if (this.current.next === null) {
        const tmp = marble(value, this.current, this.current)
        this.current.next = tmp
        this.current.previous = tmp
        this.current = tmp
      } else {
        const tmp = marble(value, this.current.previous, this.current)
        this.current.previous = tmp
        this.current.previous.next = tmp
        this.current = tmp
      }
      return this
    },
    rotate: function(amount) {
      if (this.current === null 
          || this.current.next === null 
          || amount === 0) return this
      if (amount < 0) {
        this.current = this.current.previous
      } else {
        this.current = this.current.next
      }
      return this.rotate((amount < 0) ? amount + 1 : amount - 1)
    },
    pop: function() {
      if (this.current === null) return null
      const popped = this.current
      if (this.current.next === null) {
        this.current = null
      } else {
        this.current.next.previous = this.current.previous
        this.current.previous.next = this.current.next
        this.current = this.current.next
      }
      return popped
    }
  }
}
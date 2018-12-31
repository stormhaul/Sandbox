"using strict";

class Node {
  constructor (value, previous, priority) {
    this.value = value;
    this.previous = previous;
    this.next = null;
    this.priority = priority;
  }
}

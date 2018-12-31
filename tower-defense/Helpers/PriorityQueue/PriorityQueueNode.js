"using strict";

class PriorityQueueNode {
  constructor (value, priority, next = null) {
    this.value = value;
    this.priority = priority;
    this.next = next;
  }
}

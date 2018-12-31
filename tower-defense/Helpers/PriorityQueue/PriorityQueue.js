"using strict";

class PriorityQueue {
  constructor () {
    this.head = null;
  }

  enqueue (value, priority) {
    if (this.head == null) {
      this.head = new PriorityQueueNode(value, priority);
    } else if (priority < this.head.priority) {
      let node = new PriorityQueueNode(value, priority, this.head);
      this.head = node;
    } else {
      let cur = this.head;
      while (cur.next != null && cur.next.priority <= priority) {
        cur = cur.next;
      }
      let node = new PriorityQueueNode(value, priority, cur.next);
      cur.next = node;
    }
  }

  dequeue () {
    if (this.head == null) {
      return null;
    }
    let node = this.head;
    this.head = this.head.next;
    return node.value;
  }

  contains (val) {
    let cur = this.head;
    while (cur != null) {
      if (cur.value == val) {
        return true;
      }
      cur = cur.next;
    }
    return false;
  }
}

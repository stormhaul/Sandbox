"using strict";

class PriorityQueue {
  constructor () {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  enqueue (value, priority = 0) {
    if (this.count == 0) { // no nodes
      this.head = new Node(value, null, priority);
      this.tail = this.head;
    } else if (this.count == 1 && priority < this.head.priority) { // one node new node lower priority
      let node = new Node(value, null, priority);
      node.next = this.head;
      this.head = node;
      this.tail.previous = node;
    } else if (this.count == 1 && priority >= this.head.priority) { // one node and new node higher priority
      let node = new Node(value, this.head, priority);
      this.tail = node;
      this.head.next = node;
    } else if (priority < this.head.priority) { // lower priority than front of list
      let node = new Node(value, null, priority);
      node.next = this.head;
      this.head.previous = node;
      this.head = node;
    } else if (priority >= this.tail.priority) { // higher priority than end of list
      let node = new Node(value, this.tail, priority);
      this.tail.next = node;
      this.tail = node;
    } else { // priority is somewhere in between so let's pick the shortest side (priority distance wise)
        let distLeft = priority - this.head.priority;
        let distRight = this.tail.priority - priority;
        if (distLeft <= distRight) { // search from head
          let cur = this.head;
          while (cur.priority <= priority) {
            cur = cur.next;
          }//arrived at node with next lowest priority so insert node before cur
          cur.previous = new Node(value, cur.previous, priority);
          cur.previous.previous.next = cur.previous;
          cur.previous.next = cur;
        } else { // search from tail
          let cur = this.tail;
          while (cur.priority > priority) {
            cur = cur.previous;
          }//arrived at node with priority >= new priority so insert after
          let node = new Node(value, cur, priority);
          node.next = cur.next;
          if (node.next == null) {
            console.log(this);
            throw new Error("fuck me");
          }
          node.next.previous = node;
          cur.next = node;
        }
    }

    this.count++;
  }

  dequeue (renderer = null, batch = false, max = 1000) {
		if (this.head == null) {
			return null;
		}
		if (!batch) {
			let prev_head = this.head;
			this.head = prev_head.next;
			if (this.head == null) {
				this.tail = null;
			}
			this.count --;
			return prev_head.value;
		} else {
      let values = [];
      let priority = this.head.priority;
      let cur = this.head;
      while (cur != null && cur.priority == priority || values.length == max) {
        values.push(cur.value);
        renderer.drawLine(cur.value);
        cur = cur.next;
      }
      this.head = cur;
      if (this.head != null) {
        this.head.previous = null;
      } else {
        this.tail = null;
      }
      this.count -= values.length;
      return values;
		}
	}
}

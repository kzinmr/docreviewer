export class Dequeue<T> {
  private items: T[] = [];

  // キュー末尾に要素を追加
  enqueue(item: T): void {
    this.items.push(item);
  }

  // キュー先頭の要素を取り出し (FIFO)
  dequeue(): T | undefined {
    return this.items.shift();
  }

  // キュー末尾の要素を取り出し (LIFO / Undo)
  pop(): T | undefined {
    return this.items.pop();
  }

  // キュー先頭に要素を追加 (Dequeue操作)
  enqueueLeft(item: T): void {
    this.items.unshift(item);
  }

  asArray(): Array<T> {
    return this.items;
  }

  // キューの先頭の要素を参照
  peek(): T | undefined {
    return this.items[0];
  }

  // キューが空かどうかを確認
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // キューの長さを取得
  size(): number {
    return this.items.length;
  }
}

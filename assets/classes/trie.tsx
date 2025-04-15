export class TrieNode {
  children: Map<string, TrieNode>;
  isWord: boolean;

  constructor() {
    this.children = new Map();
    this.isWord = false;
  }

  toJSON() {
    const serializedChildren: Record<string, any> = {};
    for (const [char, node] of this.children.entries()) {
      serializedChildren[char] = node.toJSON();
    }

    return {
      isWord: this.isWord,
      children: serializedChildren,
    };
  }

  static fromJSON(json: any): TrieNode {
    const node = new TrieNode();
    node.isWord = json.isWord;
    for (const char in json.children) {
        node.children.set(char, TrieNode.fromJSON(json.children[char]));
    }
    return node;
  }
}

export class Trie {
  root = new TrieNode();

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string) {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.isWord = true;
  }

  hasPrefix(prefix: string) {
    let node = this.root;
    for (const char of prefix) {
      const child = node.children.get(char);
      if (!child) return false;
      node = child;
    }
    return true;
  }

  hasWord(word: string) {
    let node = this.root;
    for (const char of word) {
      const child = node.children.get(char);
      if (!child) return false;
      node = child;
    }
    return node.isWord;
  }

  toJSON() {
    return this.root.toJSON();
  }

  static fromJSON(json: any): Trie {
    const trie = new Trie();
    trie.root = TrieNode.fromJSON(json);
    return trie;
  }
}

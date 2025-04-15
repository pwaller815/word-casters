import { Trie } from "./trie";

let trieInstance: Trie | null = null;

export function setTrie(t: Trie) {
  trieInstance = t;
}

export function getTrie(): Trie | null {
  return trieInstance;
}
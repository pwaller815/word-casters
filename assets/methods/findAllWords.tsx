import { getTrie } from "../classes/trieStore";

function DFS(
  index: number,
  word: string,
  visited: boolean[],
  letters: string[],
  wordsFound: Set<string>,
  trie: any
) {
  if (!trie.hasPrefix(word)) return;
  const newVisited = [...visited];
  newVisited[index] = true;

  const row = Math.floor(index / 4);
  const col = index % 4;

  if (word.length >= 3 && trie.hasWord(word)) {
    wordsFound.add(word);
  }

  const directions = [
    [-1, 0], // Left
    [1, 0], // Right
    [0, -1], // Up
    [0, 1], // Down
    [-1, -1], // Upper Left
    [1, -1], // Upper Right
    [-1, 1], // Lower Left
    [1, 1], // Lower Right
  ];

  for (const [dx, dy] of directions) {
    const newRow = row + dy;
    const newCol = col + dx;

    if (newRow >= 0 && newRow < 4 && newCol >= 0 && newCol < 4) {
      const newIndex = newRow * 4 + newCol;
      if (!newVisited[newIndex]) {
        DFS(
          newIndex,
          word + letters[newIndex],
          newVisited,
          letters,
          wordsFound,
          trie
        );
      }
    }
  }
}

export default async function findAllWords(letters: string[]) {
  const trie = getTrie();
  const wordsFound = new Set<string>();
  const visited = Array(16).fill(false);
  const lowercaseLetters = letters.map((char) => char.toLowerCase());

  for (let i = 0; i < 16; i++) {
    DFS(i, lowercaseLetters[i], visited, lowercaseLetters, wordsFound, trie);
  }

  const sortedWords = Array.from(wordsFound).sort((a, b) => {
    return a.length !== b.length ? b.length - a.length : a.localeCompare(b);
  });

  return sortedWords;
}

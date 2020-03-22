
let arr = [
  'dig', 'dark', 'bro', 'at', 'did', 'dune', 'duck', 'duke',
  'app', 'deck', 'doom', 'apple', 'dog', 'done', 'demo', 'due'
];

function Node(pref) {
   this.pref = pref;
   this.children = {};
   this.isWord = false;
 }
const autocomplete = (dictionary, prefix) => {
  let result = [];
  const trie = new Node('');
  initTrie(trie, dictionary, prefix);
  result = findPrefixNode(trie, prefix);
  return result;
}

const initTrie = (trie, dictionary) => {
  for (let word of dictionary) {
    let root = trie;
    for (let j = 0; j < word.length; j++) {
      if (!root.children[word.charAt(j)]) {
        root.children[word.charAt(j)] = new Node(word.substring(0, j + 1));
      }
      root = root.children[word.charAt(j)];
      if (j === (word.length - 1)) {
        root.isWord = true;
      }
    }
  }
}

const findPrefixNode = (trie, prefix) => {
  const allWords = [];
  let current = trie;

  for (let char of prefix.split('')) {
    if (current.children[char]) {
      current = current.children[char];
    } else {
      return allWords;
    }
  }

  findChildrenWords(current, allWords);
  return allWords;
}

const findChildrenWords = (node, results) => {
  if (node.isWord) {
    results.push(node.pref);
  }

  for (let char of Object.keys(node.children)) {
    findChildrenWords(node.children[char], results);
  }
}
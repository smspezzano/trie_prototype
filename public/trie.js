Trie = function(){
  this.characters = {};
  this.isWord = false;
};

Trie.prototype.learn = function(word, index){
  // This function should add the given word,
  // starting from the given index,
  // to this Trie.
  // It will be recursive.  It will tell
  // the correct child of this Trie to learn the word
  // starting from a later index.
  // Consider what the learn function should do
  // when it reaches the end of the word?
  // A word does not necessarily end at a leaf.
  // You must mark nodes which are the ends of words,
  // so that the words can be reconstructed later.
  index = index || 0;
  var character = word[index];

  if(index >= word.length){
    this.isWord = true;
    return;
  }
  if(this.characters[character] === undefined){
    this.characters[character] = new Trie();
    this.characters[character].learn(word, index + 1);
  } else {
    this.characters[character].learn(word, index + 1);
  }
  return true;
};

Trie.prototype.getWords = function(words, currentWord){
  // This function will return all the words which are
  // contained in this Trie.
  // it will use currentWord as a prefix,
  // since a Trie doesn't know about its parents.
  words = words || [];
  var results = this.find(currentWord);
  for (var i = 0; i < results.length; i++){
    var word = results[i];
    words.push(word);
  }
  return words;
};

Trie.prototype.find = function(word, index){
  // This function will return the node in the trie
  // which corresponds to the end of the passed in word.

  // don't see why this doesn't work:
  //  if(this.characters[word[word.length - 1]]){
  //   return this;
  // }

  // Be sure to consider what happens if the word is not in this Trie.
  index = index || 0;
  word = word || "";
  //var character = word[index];

  if(index >= word.length){
    return this;
  }

  if(this.characters[word[index]] === undefined){
    return false;
  } else {
    return this.characters[word[index]].find(word, index + 1);
  }

};

Trie.prototype.autoComplete = function(prefix){
  // This function will return all completions 
  // for a given prefix.
  // It should use find and getWords.
};
let article1 = "ethereum.org is your portal into the world of Ethereum.  is The tech is new and ever-evolving  it helps to";

let article2 = "in disarray is , many have strapped is  is  is themselves in for a wild ride over the next few months to a year. If this prayer circle has any chance of working, we’ll happily re-tweet.";

list = [[1, article1], [2, article2]]

keywords = {

};

for (let index = 0; index < list.length; index++) {
    let articleID = list[index][0];
    let words = list[index][1].split(" ")
    //console.log(words);

    //word exist
    // words.length
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        // word exist
        if (keywords[word]) {
            // if articleID exist in this word
            if (keywords[word][articleID]) {
                keywords[word][articleID] += 1;
            } else {
                // if articleID not exist in this word
                keywords[word][articleID] = 1;
            }
        } else {
            // word not exist
            keywords[word] = {}
            keywords[word][articleID] = 1;
        }
    }

}
//console.log(keywords);


let inputWord = document.querySelector(".inputWord");
let meaning = document.querySelector('.meaning');

async function searchMean() {
    try {
        const word = inputWord.value.trim();
        if (word === '') {
            throw new Error('Please enter a word.');
        }

        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await res.json();

        if (data.length === 0) {
            meaning.innerHTML = '<p class="red">No meaning found. The word may be misspelled.</p>';
            return;
        }

        let list = document.createElement('ul');
        for (let partOfSpeech of data[0].meanings) {
            let listItem = document.createElement('li');
            listItem.innerHTML = `<b class="red">Part Of Speech: ${partOfSpeech.partOfSpeech}</b>`;
            let subList = document.createElement('ol');
            for (let definition of partOfSpeech.definitions) {
                let subListItem = document.createElement('li');
                subListItem.innerHTML = `${definition.definition}`;
                subList.appendChild(subListItem);
            }
            listItem.appendChild(subList);
            list.appendChild(listItem);
        }

        meaning.innerHTML = '';
        meaning.appendChild(list);

    } catch (error) {
        console.error('Error fetching the meaning:', error);
        meaning.innerHTML = '<p class="red">Try to spell the word correctly.</p>';
    }
}

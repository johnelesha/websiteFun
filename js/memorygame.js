document.querySelector(".strat-game span").onclick = function () {
    let yourName = prompt("what is your name?");
    if (yourName === null || yourName === "") {
        document.querySelector(".name span").innerHTML = 'Unknow';
    } else {
        document.querySelector(".name span").innerHTML = yourName;
    }
    document.querySelector(".strat-game").remove();
    document.getElementById('entering-audio').play();
}

let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];


blocks.forEach((block) => {
    block.style.order = orderRange[Math.floor(Math.random() * orderRange.length)];
    block.addEventListener('click', function () {
        flipBlock(block);
    });
});

function flipBlock(selectedBlock) {
    selectedBlock.classList.add('is-flipped');
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
    if (allFlippedBlocks.length === 2) {
        stopClicking();
        checkMatchedBlooks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }

}

function stopClicking() {
    blocksContainer.classList.add("no-clicking");
    setTimeout(() => {
        blocksContainer.classList.remove("no-clicking");
    }, duration);
}

function checkMatchedBlooks(firstBlock, secondBlock) {
    let triesElement = document.querySelector('.tries span');
    if (firstBlock.dataset.socialmedia === secondBlock.dataset.socialmedia) {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-matched');
        secondBlock.classList.add('has-matched');
        document.getElementById('fail').pause();
        document.getElementById('success').play();
    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
            document.getElementById('success').pause();
            document.getElementById('fail').play();
        }, duration);
    }
}
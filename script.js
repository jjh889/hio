let players = [];

function addPlayers() {
    const playerNamesTextarea = document.getElementById('playerNames');
    const names = playerNamesTextarea.value.trim().split('\n')
        .map(name => name.trim())
        .filter(name => name.length > 0);
    
    if (names.length > 0) {
        players = [...new Set([...players, ...names])]; // 중복 제거
        updatePlayerList();
        playerNamesTextarea.value = '';
    }
}

function updatePlayerList() {
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = '';
    
    players.forEach((player, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${player}</span>
            <button onclick="removePlayer(${index})">삭제</button>
        `;
        playerList.appendChild(li);
    });
}

function removePlayer(index) {
    players.splice(index, 1);
    updatePlayerList();
}

function shufflePlayers() {
    for (let i = players.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [players[i], players[j]] = [players[j], players[i]];
    }
    updatePlayerList();
}

function assignGroups() {
    if (players.length === 0) {
        alert('플레이어를 추가해주세요.');
        return;
    }

    // 플레이어를 랜덤하게 섞기
    const shuffledPlayers = [...players];
    for (let i = shuffledPlayers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledPlayers[i], shuffledPlayers[j]] = [shuffledPlayers[j], shuffledPlayers[i]];
    }

    // 3명씩 그룹으로 나누기
    const groups = [];
    for (let i = 0; i < shuffledPlayers.length; i += 3) {
        groups.push(shuffledPlayers.slice(i, i + 3));
    }

    // 결과 표시
    displayGroupResult(groups);
}

function displayGroupResult(groups) {
    const roomResult = document.getElementById('roomResult');
    roomResult.innerHTML = '';
    
    groups.forEach((group, index) => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'group';
        groupDiv.innerHTML = `
            <h3>조 ${index + 1} (${group.length}명)</h3>
            <ul>
                ${group.map(player => `<li>${player}</li>`).join('')}
            </ul>
        `;
        roomResult.appendChild(groupDiv);
    });
}

function resetAll() {
    players = [];
    document.getElementById('playerNames').value = '';
    document.getElementById('playerList').innerHTML = '';
    document.getElementById('roomResult').innerHTML = '';
} 
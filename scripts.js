// 1. Seleção de Elementos DOM
const result = document.querySelector(".result");
const humanScoreElement = document.querySelector("#human-score"); 
const cpuScoreElement = document.querySelector("#cpu-score"); 

const playerShakingFist = document.getElementById('player-shaking-fist');
const cpuShakingFist = document.getElementById('cpu-shaking-fist');
const playerChoiceDisplay = document.getElementById('player-choice-display');
const cpuChoiceDisplay = document.getElementById('cpu-choice-display');

const buttons = document.querySelectorAll('.buttons button'); 
const resetButton = document.getElementById('reset-button'); // NOVO: Seleciona o botão de reiniciar

// 2. Variáveis de Pontuação
let humanPoints = 0;
let cpuPoints = 0;

// NOVO: Limite de pontos para vencer a partida
const SCORE_LIMIT = 15; // Defina quantos pontos são necessários para vencer a partida

// 3. Constantes de Opções de Jogo
const GAME_OPTIONS = {
    ROCK: 'rock',
    PAPER: 'paper',
    SCISSORS: 'scissors'
};

// Mapeamento das opções para os emojis
const emojiPaths = { 
    rock: '&#x270A;',    // Punho
    paper: '&#x1F590;',  // Mão aberta
    scissors: '&#x270C;' // Tesoura
};

// 4. Função `playHuman` (Modificada para incluir a animação com emojis)
const playHuman = (humanChoice) => {
    // Se o jogo já terminou, não permite jogar novamente
    if (humanPoints >= SCORE_LIMIT || cpuPoints >= SCORE_LIMIT) {
        return; 
    }

    // Esconde tudo e mostra os punhos sacudindo
    result.classList.add('hidden');
    playerChoiceDisplay.classList.add('hidden');
    cpuChoiceDisplay.classList.add('hidden');
    
    playerShakingFist.classList.remove('hidden');
    cpuShakingFist.classList.remove('hidden');
    playerShakingFist.classList.add('is-shaking');
    cpuShakingFist.classList.add('is-shaking');

    buttons.forEach(button => button.disabled = true);

    const cpuChoice = playMachine();

    setTimeout(() => {
        // Esconder punhos sacudindo, remover animação, mostrar escolhas finais
        playerShakingFist.classList.add('hidden');
        cpuShakingFist.classList.add('hidden');
        playerShakingFist.classList.remove('is-shaking');
        cpuShakingFist.classList.remove('is-shaking');

        playerChoiceDisplay.innerHTML = emojiPaths[humanChoice];
        cpuChoiceDisplay.innerHTML = emojiPaths[cpuChoice];
        
        playerChoiceDisplay.classList.remove('hidden');
        cpuChoiceDisplay.classList.remove('hidden');

        setTimeout(() => {
            playTheGame(humanChoice, cpuChoice); // Sua lógica de jogo
            result.classList.remove('hidden');

            // Verifica se o jogo deve terminar após esta rodada
            if (humanPoints < SCORE_LIMIT && cpuPoints < SCORE_LIMIT) {
                buttons.forEach(button => button.disabled = false); // Habilita botões se o jogo não terminou
            } else {
                endGame(); // NOVO: Chama a função para finalizar o jogo
            }
        }, 1000); 
        
    }, 1500);
};

// 5. Função `playMachine` (Sem alterações)
const playMachine = () => {
    const choices = [GAME_OPTIONS.ROCK, GAME_OPTIONS.PAPER, GAME_OPTIONS.SCISSORS];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
};

// 6. Função `playTheGame` (Lógica principal - Atualizada para verificar o limite de pontos)
const playTheGame = (human, machine) => {
    if (human === machine) {
        result.innerHTML = "O Jogo Empatou!";
    }
    else if ((human === GAME_OPTIONS.PAPER && machine === GAME_OPTIONS.ROCK) ||
        (human === GAME_OPTIONS.ROCK && machine === GAME_OPTIONS.SCISSORS) ||
        (human === GAME_OPTIONS.SCISSORS && machine === GAME_OPTIONS.PAPER)) {
        
        humanPoints++;
        humanScoreElement.innerHTML = humanPoints;
        result.innerHTML = "Você Venceu a Rodada!!"; // Mensagem mais clara
    }
    else {
        cpuPoints++;
        cpuScoreElement.innerHTML = cpuPoints;
        result.innerHTML = "Você perdeu a Rodada para a CPU!"; // Mensagem mais clara
    }
};

// NOVO: Função para finalizar o jogo
const endGame = () => {
    buttons.forEach(button => button.disabled = true); // Desabilita todos os botões de escolha
    resetButton.classList.remove('hidden'); // Mostra o botão de reiniciar

    let finalMessage = "";
    if (humanPoints >= SCORE_LIMIT) {
        finalMessage = `Parabéns! Você venceu a partida por ${humanPoints} a ${cpuPoints}!!`;
        result.style.color = 'green'; // Opcional: muda a cor do resultado final
    } else {
        finalMessage = `Que pena! A CPU venceu a partida por ${cpuPoints} a ${humanPoints}!!`;
        result.style.color = 'red'; // Opcional: muda a cor do resultado final
    }
    result.innerHTML = finalMessage;
};

// NOVO: Função para reiniciar o jogo
const resetGame = () => {
    humanPoints = 0;
    cpuPoints = 0;
    humanScoreElement.innerHTML = humanPoints;
    cpuScoreElement.innerHTML = cpuPoints;
    
    result.innerHTML = ""; // Limpa a mensagem de resultado
    result.classList.add('hidden'); // Esconde o resultado
    result.style.color = ''; // Volta a cor padrão do resultado

    playerShakingFist.classList.add('hidden');
    cpuShakingFist.classList.add('hidden');
    playerChoiceDisplay.classList.add('hidden');
    cpuChoiceDisplay.classList.add('hidden');

    buttons.forEach(button => button.disabled = false); // Habilita os botões de escolha
    resetButton.classList.add('hidden'); // Esconde o botão de reiniciar
};

// 7. Adicionando Event Listeners aos botões
document.getElementById('rock').addEventListener('click', () => playHuman(GAME_OPTIONS.ROCK));
document.getElementById('paper').addEventListener('click', () => playHuman(GAME_OPTIONS.PAPER));
document.getElementById('scissors').addEventListener('click', () => playHuman(GAME_OPTIONS.SCISSORS));

// NOVO: Event Listener para o botão de reiniciar
resetButton.addEventListener('click', resetGame);
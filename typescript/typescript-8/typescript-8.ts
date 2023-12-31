// 어디를 분류해야 적절하게 요점을 짚을 수 있을까요?
type Props = {
  [key: string]: string;
};

function createElement(tagName: string, Props, ...children: string[]): string {
  const propEntries = Object.entries(props);
  let propString = '';

  for (let [key, value] of propEntries) {
    propString += `${key}="{value}"`;
  }

  return `<${tagName} ${propString.trim()}>${children.join('')}</${tagName}>`;
}

type Pokemon = {
  name: string;
  id: number;
};

const PokemonList: Pokemon[] = [
  { name: '피카츄', id: 1 },
  { name: '이상해씨', id: 2 },
  { name: '파이리', id: 3 },
  { name: '꼬부기', id: 4 },
  { name: '버터플', id: 5 },
];

let battles: number = 0;

function renderPokemons(pokemons: Pokemon[]): string {
  let pokemonButtonsHtml = '';

  for (let pokemon of pokemons) {
    pokemonButtonsHtml += createElement('button', { id: `pokemon-${pokemon.id}`, 'data-pokemon': pokemon.name }, `${pokemon.name}와 배틀하기`);
  }
  return createElement('div', {}, `배틀 횟수: ${battles}`, pokemonButtonsHtml);
}

function setupEventListeners(rootId: string, pokemons: Pokemon[]): vold {
  const rootElement = document.getElementById(rootId);

  if (rootElement === null) {
    return;
  }

  for (let pokemon of pokemons) {
    const button = document.getElementById(`pokemon-${pokemon.id}`);

    if (button === null) {
      continue;
    }
    button.addEventListener('click', () => handleBattle(pokemon.name));
  }
}

function handleBattle(pokemonName: string): vold {
  console.log(`${pokemonName}와의 배틀이 시작 되었습니다.`);
  battles += 1;
  updateUI('root');
}

function updateUI(rootId: string): void {
  const root = document.getElementById(rootId);

  if (root === null) {
    return;
  }

  root.innerHTML = renderPokemons(PokemonList);
  setupEventListeners(rootId, PokemonList);
}

//초기 랜더링 및 이벤트 리스너 설정
updateUI('root');

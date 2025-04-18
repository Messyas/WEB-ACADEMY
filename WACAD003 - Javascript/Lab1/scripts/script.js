const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

randomize.addEventListener('click', () => {
    let storyText = "Estava 94 fahrenheit lá fora, então :insertx: saiu para passear. Quando chegamos no :inserty:, ficaram boquiabertos por alguns instantes, até que :insertz:. Bob viu tudo, mas não se surpreendeu — afinal, :insertx: pesa 300 pounds e era um dia escaldante.";
    
    let insertX = ["Laura, la safrada", "Joven tranquilao, o Tranquilo", "Bia, a orca"];
    let insertY = ["quarto escuro", "parque ensolarado", "banheiro do parque"];
    let insertZ = ["soltou uma risadinha", "apareceu um macaco", "olhou de forma meio sus"];
  

  let xItem = randomValueFromArray(insertX);
  let yItem = randomValueFromArray(insertY);
  let zItem = randomValueFromArray(insertZ);

  let newStory = storyText
                    .replace(":insertx:", xItem)
                    .replace(":inserty:", yItem)
                    .replace(":insertz:", zItem)
                    .replace(":insertx:", xItem);
    
  if (customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replace("Bob", name);
  }
    
  if (document.getElementById("uk").checked) {
    const temperature =  Math.round(94);
    const weight = Math.round(300);

    const centigrade = Math.round((temperature - 32) * (5/9));
    const stone = Math.round(weight * 0.0714286);

    newStory = newStory
                    .replace("94 fahrenheit", `${centigrade} centigrades`)
                    .replace("300 pounds",     `${stone} stones`);        
  }
    
  story.textContent = newStory;
  story.style.visibility = 'visible';
});
const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

//starts the game
function startGame() {
//empty
  state = {}
  //starts the first text
  showTextNode(1)
}

//shows the options
function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}
//takes which option we select
function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You woke up with your sleeping boyfriend next to you. Aplha Remus. You dont wanna leave him ' 
    + ' But you see his boxer. Mabye you can use it as your lukcy charm? Do you steal them?',
    options: [
      {
        text: 'Of course! Daddy Alpha Remus will reward you afterwards!',
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'You ditch him and his nasty ass boxers.',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'Now that you have woken up, you have to sneak around the castle! You are still a wanted man.' 
    + 'You see a bush you can hide behind, and a broom you can fly with! What will you choose? ', 
    options: [
      {
        text: 'Take the bush! It might be slow, but it will hide you.. Mabye. ',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: 'Take the broom and get quickly out of there!',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3
      },
      {
        text: 'Just casually walk through the castle. Who cares honestly. ',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'Now that you have managed to get this far without being found, ' 
    + ' You are now bored. What shall you do, and where shall you go? ',
    options: [
      {
        text: 'Sneak into the great hall to give them a big scare! ',
        nextText: 4
      },
      {
        text: 'Turn into a dog, and bite the students!',
        nextText: 5
      },
      {
        text: 'Get into Mcgonegalls closet and try out her clothes.',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'You got too excited and skipped down the stairs, '
    + ' hit your head against the stone step and died.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'A kid had rabies, so you got the infection too, and died shortly after.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'You stand there in the mirror. Looking hella sexy. Your Alpha boyfriend should see you know! .',
    options: [
      {
        text: 'BUT, suddenly you hear a loud thud! ',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'You hear someone unlocking the door, and opening it. ',
    options: [
      {
        text: 'Try to run!',
        nextText: 8
      },
      {
        text: 'You turn into a dog, and jumps at the person who comes in.',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'You hide in the closet!',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'You close your eyes and stand completley still!',
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'There was no where to run but the window. You jumped through it and died.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'You jumped at the person. Your dog instict took over and you killed them. '
    + 'what you didnt see, is that it was Remus. You killed your boyfriend.',
    options: [
      {
        text: 'Restart Looser',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'Out of fear your heart beat so fast it stopped. You died.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You slowley opened your eyes. There he was. Your Alpha boyfriend on one knee.' 
    +  'He asked you to be his Beta Bitch for the rest of your lifes.  ',
    options: [
      {
        text: 'Congratulations, You married to the greatest aplha in the world. Play Again?',
        nextText: -1
      }
    ]
  }
]

startGame()
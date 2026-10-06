# MIRA — Aim Trainer (React + Vite)

    npm install
    npm run dev      # desenvolvimento
    npm run build    # build de produção em /dist

## Estrutura

    src/
      main.jsx               ponto de entrada
      App.jsx                controla a navegação entre telas e o estado global
      constants.js           dificuldades, escalas, durações e ranks
      utils/scoring.js       pontos, precisão e rank
      hooks/useGame.js       lógica do jogo (spawn, timer, estatísticas)
      hooks/useCountUp.js    contagem animada dos números
      components/            Button, SegmentedControl, Ball
      screens/               HomeScreen, GameScreen, ResultScreen
      styles/global.css      tokens de design e base


const slangDataValues = [
  {
    id: 'jdmcs',
    acronym: 'JDMCS',
    term: 'Jato de Merda Com Sangue',
    definition:
      'Refere-se a uma diarreia explosiva e particularmente desagradável, com vestígios de sangue, geralmente após o consumo excessivo de fast food ou álcool.',
    examples: [
      'Depois daquela noite na tasca, tive um JDMCS que me deixou de rastos.',
    ],
    context:
      'Surgiu após uma desastrosa noite de bebedeira do grupo, quando um dos membros passou por esta situação traumática no banheiro de um bar.',
    category: 'Escatológica',
  },
  {
    id: 'cnm',
    acronym: 'CNM',
    term: 'Cagar No Mar',
    definition:
      'Ato de defecar diretamente no oceano, geralmente durante um mergulho ou banho, por conveniência ou desafio.',
    examples: [
      'Estava tão apertado na praia que tive de CNM, ninguém reparou.',
    ],
    context:
      'Criada durante um verão particularmente quente, quando os banheiros da praia estavam lotados e um dos rapazes decidiu resolver seu problema de forma alternativa.',
    category: 'Escatológica',
  },
  {
    id: 'ps',
    acronym: 'PS',
    term: 'Pau Sangrento',
    definition:
      'Expressão usada para descrever uma ereção dolorosa ou uma situação em que o órgão genital masculino é ferido ou irritado.',
    examples: [
      'Levei uma bolada nos tomates e fiquei com um PS que não passava.',
    ],
    context:
      'Originada após um acidente infeliz durante uma partida de futebol, envolvendo uma bola e um short demasiado justo.',
    category: 'Corporal',
  },
  {
    id: 'rcdm',
    acronym: 'RCDM',
    term: 'Rabo Cheio de Merda',
    definition:
      'Expressão vulgar para descrever uma pessoa que está em apuros, numa situação extremamente complicada ou embaraçosa, cheia de problemas. Também pode ser usada para alguém que está sujo ou com azar.',
    examples: [
      'Depois daquela confusão com a polícia, o Zé ficou com o RCDM.',
      'Esqueci-me da data de entrega do projeto, agora estou com o RCDM.',
    ],
    context:
      'Surgiu num dia em que tudo corria mal para um dos membros do grupo, desde problemas pessoais a contratempos inesperados, culminando numa série de situações embaraçosas.',
    category: 'Problemas/Azar',
  },
  {
    id: 'ppp',
    acronym: 'PPP',
    term: 'Punheta Para o Papa',
    definition:
      'Expressão de desdém ou desrespeito máximo por algo ou alguém, indicando que não se dá a mínima importância ou que se considera a situação ridícula.',
    examples: [
      "Ele veio com as desculpas dele, mas eu disse 'PPP' e não liguei.",
      'Que se lixe o exame, PPP para a nota!',
    ],
    context:
      'Criada num momento de rebeldia extrema contra regras ou figuras de autoridade, simbolizando o desprezo por convenções sociais ou expectativas.',
    category: 'Desprezo/Rebeldia',
  },
  {
    id: 'cfb',
    acronym: 'CFB',
    term: 'Cagar Fino e Bater',
    definition:
      "Referência a uma diarreia tão líquida e rápida que parece 'bater' no fundo da sanita. Usada também para descrever algo que acontece de forma inesperada e violenta.",
    examples: [
      'A comida do restaurante chinês fez-me CFB a noite toda.',
      'O carro veio a deslizar e quase CFB na parede.',
    ],
    context:
      'Originada de uma experiência coletiva com intoxicação alimentar, onde a diarreia foi particularmente explosiva e barulhenta. Rapidamente adaptada para outras situações de impacto súbito.',
    category: 'Escatológica/Impacto',
  },
  {
    id: 'gcm',
    acronym: 'GCM',
    term: 'Gaita Com Mijo',
    definition:
      'Termo pejorativo para descrever um pénis com mau cheiro, urinado ou mal higienizado, geralmente após a micção e sem a devida limpeza.',
    examples: ['Aquele gajo do ginásio deve ter uma GCM, o balneário fede.'],
    context:
      'Surgiu após a observação de falta de higiene em balneários públicos, onde o cheiro a urina persistia de forma incomodativa.',
    category: 'Corporal/Higiene',
  },
  {
    id: 'cct',
    acronym: 'CCT',
    term: 'Cuspo Com Tomate',
    definition:
      'Uma expectoração densa e avermelhada, que se assemelha a molho de tomate, geralmente resultado de uma tosse forte ou catarro acumulado.',
    examples: ['O Zé está doente, a tossir CCT para todo o lado.'],
    context:
      'Surgiu quando um dos rapazes estava com uma infecção respiratória grave e produziu este tipo peculiar de expectoração durante uma refeição.',
    category: 'Corporal',
  },
  {
    id: 'mdf',
    acronym: 'MDF',
    term: 'Merda de Frango',
    definition:
      'Fezes de consistência mole e esverdeada, que lembram as de aves, indicando um problema digestivo.',
    examples: ['Comi aquele kebab duvidoso e agora só faço MDF.'],
    context:
      'Criada após uma experiência desastrosa com comida de rua de qualidade duvidosa, que resultou em problemas intestinais para todo o grupo.',
    category: 'Escatológica',
  },
  {
    id: 'pbj',
    acronym: 'PBJ',
    term: 'Peido Bué Jákis',
    definition:
      'Um flatulência extremamente ruidosa e com um odor particularmente forte e desagradável.',
    examples: [
      'O gajo mandou um PBJ que cheirava a esgoto, tive de abrir a janela.',
    ],
    context:
      'Nasceu durante uma viagem de carro longa, quando o ar condicionado quebrou e as janelas tiveram que ficar fechadas devido à chuva.',
    category: 'Flatulência',
  },
  {
    id: 'rcs',
    acronym: 'RCS',
    term: 'Rola Com Sarampo',
    definition:
      'Termo jocoso para descrever uma irritação cutânea ou pequenas borbulhas na pele do pénis, geralmente inofensivas, mas que causam comichão.',
    examples: ['Acho que apanhei uma RCS daquela piscina pública.'],
    context:
      'Inventada após um dos rapazes desenvolver uma reação alérgica a um novo sabonete íntimo.',
    category: 'Corporal',
  },
  {
    id: 'ctp',
    acronym: 'CTP',
    term: 'Cuspo Tipo Pasta',
    definition:
      'Uma saliva espessa e viscosa, difícil de engolir ou expelir, muitas vezes associada à desidratação ou boca seca.',
    examples: ['Depois de correr, fiquei com CTP na boca.'],
    context:
      'Surgiu durante um treino intenso de futebol em um dia particularmente quente, quando todos estavam desidratados.',
    category: 'Corporal',
  },
  {
    id: 'mtp',
    acronym: 'MTP',
    term: 'Mijo Tipo Pepsi',
    definition:
      'Urina escura e com pouca espuma, que se assemelha à cor de refrigerante de cola, indicando desidratação severa.',
    examples: ['Não bebi água o dia todo e o meu mijo está MTP.'],
    context:
      'Criada durante um festival de música onde o acesso à água era limitado e caro, levando a casos graves de desidratação.',
    category: 'Escatológica',
  },
  {
    id: 'mdc',
    acronym: 'MDC',
    term: 'Mão no Cagalhão',
    definition:
      'Situação embaraçosa ou desagradável em que alguém acidentalmente toca ou pisa em fezes, geralmente em público, causando repulsa.',
    examples: ['Fui apanhar a bola e dei MDC, que nojo!'],
    context:
      "Inventada após um dos rapazes ter tido um encontro indesejado com um 'presente' canino enquanto caminhava distraidamente na rua.",
    category: 'Escatológica',
  },
  {
    id: 'pdm',
    acronym: 'PDM',
    term: 'Pito de Múmia',
    definition:
      'Termo pejorativo para descrever um órgão genital feminino com uma aparência pouco atraente, envelhecida ou ressecada.',
    examples: ['Aquela gaja parecia fixe, mas quando vi o PDM, desisti.'],
    context:
      'Surgiu após uma conversa entre amigos sobre experiências menos felizes em encontros, descrevendo uma deceção visual inesperada.',
    category: 'Sexual',
  },
  {
    id: 'cdo',
    acronym: 'CDO',
    term: 'Cuspo de Ostra',
    definition:
      'Uma expectoração extremamente espessa, pegajosa e esbranquiçada, difícil de expelir, que lembra a textura de uma ostra.',
    examples: ['Acordei com uma CDO na garganta que quase me engasguei.'],
    context:
      'Nascida após uma noite de excessos, quando um dos membros sentiu a boca e garganta extremamente secas e com uma saliva de consistência invulgarmente espessa.',
    category: 'Corporal',
  },
  {
    id: 'rpo',
    acronym: 'RPO',
    term: 'Rabo a Pão de Ouro',
    definition:
      'Expressão para descrever um ânus extremamente sujo ou mal limpo, com resíduos fecais visíveis, após a defecação.',
    examples: [
      'O gajo saiu da casa de banho com um RPO que dava para fazer zoom.',
    ],
    context:
      "Inventada num acampamento sem condições de higiene ideais, onde a limpeza pessoal se tornou um desafio e um dos amigos foi 'apanhado em flagrante'.",
    category: 'Escatológica',
  },
  {
    id: 'mdc2',
    acronym: 'MDC',
    term: 'Merdinha no Canto',
    definition:
      'Pequena quantidade de fezes que fica presa na cueca ou nas nádegas, muitas vezes sem que a pessoa perceba, causando desconforto e mau cheiro.',
    examples: [
      'Estava a sentir um desconforto esquisito e afinal tinha uma MDC.',
    ],
    context:
      "Criada após uma situação constrangedora onde um dos rapazes percebeu, tarde demais, um 'acidente' menor após uma ida rápida à casa de banho fora de casa.",
    category: 'Escatológica',
  },
  {
    id: 'cnbdp',
    acronym: 'CNBDP',
    term: 'Cagar Na Boca Do Padre',
    definition:
      'Expressão máxima de desprezo, desrespeito ou repulsa por alguém ou alguma coisa; desejo de ultrajar profundamente.',
    examples: [
      "Aquele gajo tentou roubar o meu lugar, mas eu disse 'CNBDP' e ignorei-o.",
      'Que filme de merda, CNBDP para quem o fez!',
    ],
    context:
      'Surgiu num contexto de revolta extrema contra uma figura de autoridade, transformando um ato de desobediência num ultraje simbólico e máximo.',
    category: 'Ultraje',
  },
  {
    id: 'cs',
    acronym: 'CS',
    term: 'Cú Sangrento',
    definition:
      'Termo usado para descrever uma situação extremamente dolorosa, irritante ou uma tarefa absurdamente difícil e desagradável de realizar.',
    examples: [
      'Este trabalho de matemática é um CS, não consigo acabar.',
      'Depois daquele mergulho, fiquei com o CS a doer.',
    ],
    context:
      "Nascida após uma experiência coletiva de esforço físico intenso e doloroso, onde a metáfora do 'cú a sangrar' representava o nível de sofrimento e dificuldade.",
    category: 'Sofrimento/Dificuldade',
  },
  {
    id: 'pcm',
    acronym: 'PCM',
    term: 'Pito Com Mofo',
    definition:
      'Termo pejorativo para descrever um órgão genital feminino com mau cheiro, aspeto negligenciado ou sinais de falta de higiene.',
    examples: ['Fui sair com uma gaja, mas o PCM dela estragou-me a noite.'],
    context:
      'Criada durante uma conversa sobre encontros desastrosos, focando-se na deceção causada por uma higiene íntima questionável.',
    category: 'Sexual/Higiene',
  },
  {
    id: 'mng',
    acronym: 'MNG',
    term: 'Mamar Na Gaita',
    definition:
      "Expressão vulgar para se referir a fazer sexo oral masculino. Usada de forma direta ou para indicar que alguém está a 'bajular' excessivamente, num sentido figurado de submissão.",
    examples: ['Aquele colega está a MNG ao chefe só para ser promovido.'],
    context:
      "Uma variação mais crua de 'chupar a pich*ta', usada tanto no sentido literal quanto no figurado, para descrever subserviência exagerada.",
    category: 'Sexual/Submissão',
  },
  {
    id: 'cbn',
    acronym: 'CBN',
    term: 'Cagar Bacalhau à Noite',
    definition:
      'Descreve uma diarreia noturna severa e explosiva, com fezes fragmentadas e de cheiro intenso, que causa grande desconforto e sujidade. Usada para algo muito desagradável e incontrolável.',
    examples: [
      'Depois daquela feijoada, passei a noite a CBN.',
      'A apresentação foi um CBN total, ninguém percebeu nada.',
    ],
    context:
      "Nascida de uma experiência noturna traumática com má digestão após uma refeição pesada, onde o resultado foi uma 'explosão' sanitária. A gíria estendeu-se para situações caóticas e imprevisíveis.",
    category: 'Escatológica',
  },
  {
    id: 'bus',
    acronym: 'BUS',
    term: 'Bater Uma Sangrenta',
    definition:
      'Expressão extremamente vulgar e chocante para se referir à masturbação masculina, implicando um ato excessivo, violento ou que resulta em lesão. Usado em tom de humor negro para algo intensamente viciante ou doloroso.',
    examples: [
      'Depois de cinco dias sem sexo, o gajo só pensava em BUS.',
      'Estou tão viciado neste jogo que podia passar a noite toda a BUS.',
    ],
    context:
      'Surgiu como uma hipérbole para o ato de masturbação, enfatizando a intensidade e, por vezes, as consequências menos agradáveis de um vício ou desejo extremo.',
    category: 'Sexual/Obsessão',
  },
  {
    id: 'fmp',
    acronym: 'FMP',
    term: 'Foder a Mãe do Pobre',
    definition:
      "Expressão de revolta e frustração perante uma situação de injustiça extrema, exploração ou roubo de alguém que já tem pouco. Significa 'ferrar com tudo' a vida de alguém sem recursos.",
    examples: [
      'Aquela nova lei é mesmo para FMP, como é que o pessoal vai sobreviver?',
      'O patrão cortou os salários, está a FMP os trabalhadores.',
    ],
    context:
      'Nascida da indignação com a exploração social e económica, a gíria usa a imagem mais sagrada (a mãe) e a vulnerabilidade (o pobre) para expressar o cúmulo da maldade ou injustiça.',
    category: 'Revolta/Injustiça',
  },
  {
    id: 'ccb',
    acronym: 'CCB',
    term: 'Cuspir na Cara do Crente',
    definition:
      'Ato de desrespeito ou profanação extrema contra algo ou alguém considerado sagrado, intocável ou ingénuo. Significa desafiar e humilhar abertamente.',
    examples: [
      'Ele fez um comentário tão blasfemo que foi como CCB na igreja.',
      'Aquele puto só quer CCB em quem acredita em tudo.',
    ],
    context:
      'Surgiu num contexto de desafio a normas ou crenças estabelecidas, usando um ato físico de desrespeito para simbolizar a afronta total.',
    category: 'Desrespeito/Profanação',
  },
]

export const getRandomSlang = () => {
    return slangData[Math.floor(Math.random() * slangData.length)];
};

export const getSlangById = (id) => {
    return slangData.find((slang) => slang.id === id);
};

export const slangData = slangDataValues;
export const categories = [...new Set(slangData.map((slang) => slang.category))];
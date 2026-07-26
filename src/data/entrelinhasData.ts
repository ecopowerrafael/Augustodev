import { Article, CategoryInfo, ArchiveYear, AuthorProfile } from "../types/entrelinhas";

export const BLOG_INFO = {
  name: "Entrelinhas",
  subtitle: "Ideias, experiências e reflexões para ler com calma.",
  description: "Um blog pessoal autoral focado em ensaios sobre trabalho, criatividade, tecnologia, comportamento e a busca por um ritmo de vida consciente.",
  authorName: "Daniel Almeida",
  authorRole: "Escritor & Estrategista Digital",
  copyright: "© 2026 Daniel Almeida. Todos os direitos reservados.",
};

export const AUTHOR_PROFILE: AuthorProfile = {
  name: "Daniel Almeida",
  subtitle: "Escritor, observador curioso do comportamento humano e profissional da área de tecnologia e comunicação.",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  bioParagraphs: [
    "Meu nome é Daniel Almeida. Trabalho com comunicação e tecnologia há mais de dez anos, mas este blog nasceu da necessidade de criar um refúgio digital silencioso — um espaço para organizar ideias que nem sempre cabem em reuniões, apresentações executivas ou posts efêmeros nas redes sociais.",
    "Aqui você encontrará ensaios sobre cultura de trabalho, a relação humana com ferramentas tecnológicas, processos criativos, resenhas literárias e reflexões sobre as pequenas escolhas cotidianas que definem quem nos tornamos.",
    "Acredito no valor da leitura demorada, na clareza do texto bem lapidado e na importância de manter espaços virtuais que respeitem a atenção e a sanidade do leitor."
  ],
  city: "Belo Horizonte / São Paulo, Brasil",
  role: "Comunicação & Tecnologia",
  interests: [
    "Filosofia da tecnologia",
    "Escrita ensaística",
    "Design editorial",
    "Produtividade consciente",
    "Literatura de ficção e ensaios"
  ],
  favoriteBooks: [
    { title: "A Sociedade do Cansaço", author: "Byung-Chul Han", year: "2010" },
    { title: "Quatro Mil Semanas", author: "Oliver Burkeman", year: "2021" },
    { title: "Trabalho Focado", author: "Cal Newport", year: "2016" },
    { title: "Essencialismo", author: "Greg McKeown", year: "2014" },
    { title: "O Homem em Busca de Sentido", author: "Viktor Frankl", year: "1946" }
  ],
  currentProjects: [
    "Publicação quinzenal de ensaios no blog Entrelinhas",
    "Pesquisa autoral sobre o impacto do excesso de telas na atenção profunda",
    "Mentoria de escrita clara para profissionais de tecnologia"
  ],
  socials: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    email: "daniel@entrelinhasblog.com"
  }
};

export const CATEGORIES: CategoryInfo[] = [
  { name: "Reflexões", description: "Ensaios breves sobre percepção, tempo e escolhas de vida.", count: 18 },
  { name: "Criatividade", description: "Processos de criação, repertório e o desafio de transformar ideias em arte.", count: 12 },
  { name: "Trabalho", description: "Cultura profissional, foco, autonomia e novas formas de colaborar.", count: 15 },
  { name: "Tecnologia", description: "O impacto das ferramentas digitais no comportamento e na atenção humana.", count: 9 },
  { name: "Comportamento", description: "Análise de hábitos contemporâneos, relações e dinâmicas sociais.", count: 14 },
  { name: "Livros", description: "Impressões de leitura, citações e obras que transformam perspectivas.", count: 11 },
  { name: "Vida pessoal", description: "Relatos íntimos, memória, cotidiano e descobertas do caminho.", count: 16 }
];

export const ARTICLES: Article[] = [
  {
    id: "art-1",
    slug: "nem-toda-pausa-e-perda-de-tempo",
    title: "Nem toda pausa é perda de tempo",
    subtitle: "Talvez o problema não esteja em parar, mas na culpa que aprendemos a sentir quando não estamos produzindo.",
    category: "Reflexões",
    excerpt: "Vivemos cercados por estímulos que transformam descanso em culpa. Talvez seja necessário reaprender a diferença entre estar parado e estar verdadeiramente presente.",
    coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    coverImageCaption: "Foto por Daniel Almeida — Tarde silenciosa na serra, julho de 2026.",
    publishedAt: "22 de julho de 2026",
    updatedAt: "23 de julho de 2026",
    readingTimeMinutes: 7,
    featured: true,
    author: {
      name: AUTHOR_PROFILE.name,
      role: AUTHOR_PROFILE.role,
      avatar: AUTHOR_PROFILE.avatarUrl,
    },
    toc: [
      { id: "quando-descansar-se-transforma-em-culpa", title: "1. Quando descansar se transforma em culpa", level: 2 },
      { id: "a-diferenca-entre-pausa-e-desistencia", title: "2. A diferença entre pausa e desistência", level: 2 },
      { id: "o-valor-do-tempo-nao-produtivo", title: "3. O valor do tempo não produtivo", level: 2 },
      { id: "reaprender-a-estar-presente", title: "4. Reaprender a estar presente", level: 2 },
      { id: "consideracoes-finais", title: "5. Considerações finais", level: 2 },
    ],
    contentParagraphs: [
      {
        type: "paragraph",
        text: "Existe uma pressão silenciosa para transformar cada minuto em alguma forma de resultado. Mesmo os momentos de descanso parecem precisar de uma justificativa: descansar para voltar mais produtivo, caminhar para melhorar a saúde, ler para aprender algo útil."
      },
      {
        type: "paragraph",
        text: "Pouco a pouco, deixamos de fazer coisas simplesmente porque elas nos fazem bem. Tudo passa a precisar de uma função, de um indicador de progresso ou de um registro público. Se um passeio de domingo não for compartilhado ou contabilizado em um aplicativo de passos, fica no ar a falsa impressão de que o tempo foi desperdiçado."
      },
      {
        type: "heading2",
        id: "quando-descansar-se-transforma-em-culpa",
        text: "Quando descansar se transforma em culpa"
      },
      {
        type: "paragraph",
        text: "Em seu clássico estudo sobre a sociedade moderna, o filósofo Byung-Chul Han aponta que não somos mais coagidos por chefes externos, mas por uma exigência interna de autodesempenho. Tornamo-nos exploradores de nós mesmos, alimentando uma rotina em que a inatividade gera ansiedade imediata."
      },
      {
        type: "paragraph",
        text: "Quando sentamos na poltrona sem um celular na mão, em poucos segundos surge a coceira mental de checar e-mails, responder mensagens ou procurar alguma tarefa acumulada. A incapacidade de suportar o vazio tornou-se uma das marcas mais nítidas do nosso tempo."
      },
      {
        type: "blockquote",
        text: "O descanso não precisa provar seu valor por meio da produtividade que produzirá depois."
      },
      {
        type: "heading2",
        id: "a-diferenca-entre-pausa-e-desistencia",
        text: "A diferença entre pausa e desistência"
      },
      {
        type: "paragraph",
        text: "Há uma confusão frequente entre pausar e abandonar um projeto. Pausar é um ato de preservação estratégica; desistir é a ruptura definitiva. Quando nos recusamos a pausar por medo de parecer preguiçosos, acabamos atingindo o ponto de exaustão em que a desistência se torna inevitável."
      },
      {
        type: "paragraph",
        text: "Artistas, escritores e pensadores ao longo da história sempre souberam que os insights mais valiosos não surgem durante o esforço bruto contra a página em branco, mas nos momentos em que a mente relaxa em uma caminhada sem destino."
      },
      {
        type: "image",
        imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=80",
        caption: "O espaço de reflexão nasce do silêncio e da ausência de notificações constantes."
      },
      {
        type: "heading2",
        id: "o-valor-do-tempo-nao-produtivo",
        text: "O valor do tempo não produtivo"
      },
      {
        type: "paragraph",
        text: "Atribuir valor apenas ao tempo mensurável é empobrecer a experiência humana. As memórias mais afetuosas da nossa infância e vida adulta raramente envolvem relatórios concluídos ou planilhas enviadas antes do prazo."
      },
      {
        type: "list",
        items: [
          "Conversas sem pressa ao redor da mesa depois do almoço;",
          "Observar a chuva pela janela sem olhar as horas no relógio;",
          "Reler um livro antigo pelo simples prazer da prosa;",
          "Caminhar sem traçar a rota mais rápida no GPS."
        ]
      },
      {
        type: "heading2",
        id: "reaprender-a-estar-presente",
        text: "Reaprender a estar presente"
      },
      {
        type: "paragraph",
        text: "Voltar a habitar o próprio tempo exige treino e coragem. Começa pequenas escolhas: deixar o smartphone em outro cômodo durante as refeições, não preencher cada intervalo de espera no elevador com conteúdos aleatórios e aprender a aceitar o silêncio sem pressa."
      },
      {
        type: "callout",
        text: "Experimente reservar 15 minutos hoje para simplesmente não fazer nada. Nem ler, nem ouvir podcast, nem planejar o dia seguinte. Apenas observar e respirar."
      },
      {
        type: "heading2",
        id: "consideracoes-finais",
        text: "Considerações finais"
      },
      {
        type: "paragraph",
        text: "Nem toda pausa é perda de tempo. Na verdade, as pausas intencionais são o que mantém nossa humanidade e discernimento vivos em um mundo obsessivamente acelerado. Da próxima vez que se pegar descansando, lembre-se: viver bem também inclui o direito de parar."
      },
      {
        type: "authorNote",
        text: "Nota do autor: Este ensaio foi escrito ao longo de três tardes frias de julho, entre cafés e conversas com amigos que também buscavam desacelerar a rotina."
      }
    ],
    relatedSlugs: [
      "criar-tambem-e-saber-o-que-deixar-de-fora",
      "a-produtividade-que-ninguem-ve",
      "a-coragem-de-mudar-de-opiniao"
    ]
  },
  {
    id: "art-2",
    slug: "criar-tambem-e-saber-o-que-deixar-de-fora",
    title: "Criar também é saber o que deixar de fora",
    subtitle: "A qualidade de uma ideia muitas vezes aparece quando removemos o excesso e mantemos apenas o essencial.",
    category: "Criatividade",
    excerpt: "A qualidade de uma ideia muitas vezes aparece quando removemos o excesso. O ato de subtracção é a verdadeira essência do bom design e da escrita marcante.",
    coverImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=80",
    publishedAt: "18 de julho de 2026",
    readingTimeMinutes: 5,
    author: {
      name: AUTHOR_PROFILE.name,
      role: AUTHOR_PROFILE.role,
      avatar: AUTHOR_PROFILE.avatarUrl,
    },
    toc: [
      { id: "o-vicio-da-adicao", title: "O vício da adição", level: 2 },
      { id: "subtrair-exige-coragem", title: "Subtrair exige coragem", level: 2 },
      { id: "o-resultado-do-essencial", title: "O resultado do essencial", level: 2 }
    ],
    contentParagraphs: [
      {
        type: "paragraph",
        text: "Na escrita, no design, na arquitetura e até na gestão de projetos, nossa tendência natural ao enfrentar um problema é adicionar: mais parágrafos, mais recursos, mais reuniões, mais explicações."
      },
      {
        type: "paragraph",
        text: "No entanto, os trabalhos mais memoráveis que consumimos destacam-se justamente pelo que deixaram de fora. Uma frase enxuta, um layout com espaço em branco generoso e uma obra de arte sem exageros visuais transmitem respeito pela inteligência do público."
      },
      {
        type: "heading2",
        id: "o-vicio-da-adicao",
        text: "O vício da adição"
      },
      {
        type: "paragraph",
        text: "Estudos de psicologia comportamental mostram que, ao resolverem enigmas ou reestruturar processos, as pessoas raramente cogitam remover elementos. A adição dá a sensação falsa de que trabalhamos mais duro, enquanto cortar exige julgamento crítico."
      },
      {
        type: "blockquote",
        text: "A perfeição não é alcançada quando não há mais nada a adicionar, mas quando não há mais nada a retirar."
      },
      {
        type: "heading2",
        id: "subtrair-exige-coragem",
        text: "Subtrair exige coragem"
      },
      {
        type: "paragraph",
        text: "Para cortar um trecho do qual você se orgulha, mas que não serve ao argumento central do texto, é preciso superar o apego do ego. Na tradição literária, isso é conhecido como 'kill your darlings' (mante os seus queridinhos)."
      },
      {
        type: "paragraph",
        text: "Quando você remove o supérfluo, a estrutura restante ganha peso, clareza e elegância natural."
      }
    ],
    relatedSlugs: [
      "nem-toda-pausa-e-perda-de-tempo",
      "cinco-livros-que-mudaram-minha-forma-de-trabalhar"
    ]
  },
  {
    id: "art-3",
    slug: "a-produtividade-que-ninguem-ve",
    title: "A produtividade que ninguém vê",
    subtitle: "Nem todo resultado importante pode ser medido por quantidade de tarefas concluídas em uma lista no fim do dia.",
    category: "Trabalho",
    excerpt: "Nem todo resultado importante pode ser medido por quantidade de tarefas concluídas. O trabalho mental invisível é o pilar da inovação real.",
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80",
    publishedAt: "12 de julho de 2026",
    readingTimeMinutes: 8,
    author: {
      name: AUTHOR_PROFILE.name,
      role: AUTHOR_PROFILE.role,
      avatar: AUTHOR_PROFILE.avatarUrl,
    },
    toc: [
      { id: "o-teatro-da-ocupacao", title: "O teatro da ocupação", level: 2 },
      { id: "trabalho-de-profundidade", title: "Trabalho de profundidade", level: 2 }
    ],
    contentParagraphs: [
      {
        type: "paragraph",
        text: "Em muitas empresas e rotinas autônomas, criou-se a cultura do 'teatro da produtividade': responder e-mails em segundos, participar de dez chamadas por dia e manter o status de mensagens sempre como 'online'."
      },
      {
        type: "paragraph",
        text: "No entanto, as decisões estratégicas que salvam empresas, as ideias criativas marcantes e a escrita refinada acontecem em momentos de silêncio e reflexão não mensurável."
      },
      {
        type: "blockquote",
        text: "Estar constantemente ocupado é, muitas vezes, uma forma disfarçada de preguiça mental."
      },
      {
        type: "paragraph",
        text: "Pensar criticamente sobre um problema antes de sair executando consome energia e tempo, mas evita refações desastrosas. Essa é a produtividade invisível que sustenta o sucesso a longo prazo."
      }
    ],
    relatedSlugs: [
      "quando-a-ferramenta-comeca-a-decidir-por-nos",
      "nem-toda-pausa-e-perda-de-tempo"
    ]
  },
  {
    id: "art-4",
    slug: "quando-a-ferramenta-comeca-a-decidir-por-nos",
    title: "Quando a ferramenta começa a decidir por nós",
    subtitle: "Uma reflexão sobre conveniência, automação e a perda gradual da autonomia nas decisões diárias.",
    category: "Tecnologia",
    excerpt: "Uma reflexão sobre conveniência, automação e perda gradual de autonomia. Quando a recomendação substitui a escolha pessoal consciente.",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
    publishedAt: "6 de julho de 2026",
    readingTimeMinutes: 10,
    author: {
      name: AUTHOR_PROFILE.name,
      role: AUTHOR_PROFILE.role,
      avatar: AUTHOR_PROFILE.avatarUrl,
    },
    toc: [
      { id: "o-preco-da-conveniencia", title: "O preço da conveniência", level: 2 },
      { id: "resgatando-o-julgamento", title: "Resgatando o julgamento", level: 2 }
    ],
    contentParagraphs: [
      {
        type: "paragraph",
        text: "Atualmente, algoritmos nos dizem qual rota pegar no trânsito, qual música ouvir a seguir, qual livro comprar e até o tom de voz das respostas profissionais que enviamos."
      },
      {
        type: "paragraph",
        text: "A conveniência é irresistível. Porém, à medida que terceirizamos pequenos julgamentos diários para os sistemas, corremos o risco de atrofiar nossa capacidade de escolha autônoma e intuição."
      },
      {
        type: "blockquote",
        text: "A tecnologia deve ampliar nossas faculdades mentais, não substituí-las por automatismos passivos."
      }
    ],
    relatedSlugs: [
      "a-produtividade-que-ninguem-ve",
      "por-que-voltei-a-escrever-em-cadernos-de-papel"
    ]
  },
  {
    id: "art-5",
    slug: "cinco-livros-que-mudaram-minha-forma-de-trabalhar",
    title: "Cinco livros que mudaram minha forma de trabalhar",
    subtitle: "Leituras fundamentais que influenciaram minha relação com tempo, criação, foco e propósito de carreira.",
    category: "Livros",
    excerpt: "Leituras que influenciaram minha relação com tempo, criação e carreira. Cinco obras indispensáveis para ler com atenção.",
    coverImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1000&q=80",
    publishedAt: "29 de junho de 2026",
    readingTimeMinutes: 6,
    author: {
      name: AUTHOR_PROFILE.name,
      role: AUTHOR_PROFILE.role,
      avatar: AUTHOR_PROFILE.avatarUrl,
    },
    toc: [
      { id: "as-obras-selecionadas", title: "As obras selecionadas", level: 2 }
    ],
    contentParagraphs: [
      {
        type: "paragraph",
        text: "Livros não servem apenas para acumular informação. As melhores leituras alteram o modelo mental com o qual percebemos o mundo e organizamos nosso dia a dia."
      },
      {
        type: "list",
        items: [
          "Quatro Mil Semanas (Oliver Burkeman) — Uma perspectiva realista e reconfortante sobre a finitude do tempo humano.",
          "Trabalho Focado (Cal Newport) — O manual definitivo para cultivar atenção profunda em um mundo hiperdistraído.",
          "A Sociedade do Cansaço (Byung-Chul Han) — Um raio-X filosófico da autoexploração contemporânea.",
          "Essencialismo (Greg McKeown) — A arte disciplinada de perseguir menos coisas com mais intensidade.",
          "O Homem em Busca de Sentido (Viktor Frankl) — Lições imortais sobre resiliência e propósito."
        ]
      }
    ],
    relatedSlugs: [
      "nem-toda-pausa-e-perda-de-tempo",
      "criar-tambem-e-saber-o-que-deixar-de-fora"
    ]
  },
  {
    id: "art-6",
    slug: "a-coragem-de-mudar-de-opiniao",
    title: "A coragem de mudar de opinião",
    subtitle: "Mudar de ideia não deveria ser tratado como fraqueza ou incoerência, mas como o resultado natural do aprendizado.",
    category: "Vida pessoal",
    excerpt: "Mudar de ideia não deveria ser tratado como fraqueza, mas como resultado de aprendizado, maturidade e atualização de repertório.",
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
    publishedAt: "20 de junho de 2026",
    readingTimeMinutes: 4,
    author: {
      name: AUTHOR_PROFILE.name,
      role: AUTHOR_PROFILE.role,
      avatar: AUTHOR_PROFILE.avatarUrl,
    },
    toc: [
      { id: "a-armadilha-da-coerencia-publica", title: "A armadilha da coerência pública", level: 2 }
    ],
    contentParagraphs: [
      {
        type: "paragraph",
        text: "Num ambiente hiperconectado onde declarações antigas podem ser recuperadas em segundos, as pessoas sentem o receio permanente de admitir que erraram ou simplesmente alteraram seu ponto de vista."
      },
      {
        type: "paragraph",
        text: "Contudo, manter rigidamente uma opinião superada diante de novas evidências é o oposto da sabedoria. Mudar de postura é a prova viva de que continuamos vivos e em evolução."
      }
    ],
    relatedSlugs: [
      "nem-toda-pausa-e-perda-de-tempo"
    ]
  },
  {
    id: "art-7",
    slug: "o-ritmo-das-estacoes-e-o-trabalho-criativo",
    title: "O ritmo das estações e o trabalho criativo",
    subtitle: "Por que tentar manter a mesma produtividade linear durante o ano inteiro vai contra nossa própria biologia.",
    category: "Comportamento",
    excerpt: "A natureza funciona por ciclos de abundância, colheita, recolhimento e renovação. Aceitar esses ciclos no trabalho evita o esgotamento.",
    publishedAt: "10 de junho de 2026",
    readingTimeMinutes: 7,
    author: {
      name: AUTHOR_PROFILE.name,
      role: AUTHOR_PROFILE.role,
      avatar: AUTHOR_PROFILE.avatarUrl,
    }
  },
  {
    id: "art-8",
    slug: "por-que-voltei-a-escrever-em-cadernos-de-papel",
    title: "Por que voltei a escrever em cadernos de papel",
    subtitle: "A fricção física da caneta no papel oferece um tipo de desaceleração que nenhum aplicativo de notas consegue reproduzir.",
    category: "Criatividade",
    excerpt: "Sem notificações, sem cursor piscando e sem tentar formatar nada. A folha em branco analógica resgata a pureza do pensamento espontâneo.",
    publishedAt: "2 de junho de 2026",
    readingTimeMinutes: 6,
    author: {
      name: AUTHOR_PROFILE.name,
      role: AUTHOR_PROFILE.role,
      avatar: AUTHOR_PROFILE.avatarUrl,
    }
  },
  {
    id: "art-9",
    slug: "a-armadilha-das-otimizacoes-infinitas",
    title: "A armadilha das otimizações infinitas",
    subtitle: "Quando passamos mais tempo configurando sistemas de produtividade do que realmente executando o trabalho relevante.",
    category: "Tecnologia",
    excerpt: "Procurar a ferramenta perfeita de tarefas ou o fluxo de automação impecável é um ótimo álibi para adiar o confronto direto com as tarefas difíceis.",
    publishedAt: "20 de maio de 2026",
    readingTimeMinutes: 9,
    author: {
      name: AUTHOR_PROFILE.name,
      role: AUTHOR_PROFILE.role,
      avatar: AUTHOR_PROFILE.avatarUrl,
    }
  },
  {
    id: "art-10",
    slug: "o-valor-de-fazer-menos",
    title: "O valor de fazer menos",
    subtitle: "Elegância e profundidade nascem do compromisso inegociável com poucas metas bem escolhidas.",
    category: "Reflexões",
    excerpt: "Dizer não para 90% das oportunidades atraentes é o único caminho para fazer algo verdadeiramente singular nos 10% restantes.",
    publishedAt: "11 de maio de 2026",
    readingTimeMinutes: 5,
    author: {
      name: AUTHOR_PROFILE.name,
      role: AUTHOR_PROFILE.role,
      avatar: AUTHOR_PROFILE.avatarUrl,
    }
  }
];

export const ARCHIVE_DATA: ArchiveYear[] = [
  {
    year: 2026,
    months: [
      {
        monthName: "Julho",
        articles: [
          { title: "Nem toda pausa é perda de tempo", slug: "nem-toda-pausa-e-perda-de-tempo", date: "22 de julho", readingTimeMinutes: 7, category: "Reflexões" },
          { title: "Criar também é saber o que deixar de fora", slug: "criar-tambem-e-saber-o-que-deixar-de-fora", date: "18 de julho", readingTimeMinutes: 5, category: "Criatividade" },
          { title: "A produtividade que ninguém vê", slug: "a-produtividade-que-ninguem-ve", date: "12 de julho", readingTimeMinutes: 8, category: "Trabalho" },
          { title: "Quando a ferramenta começa a decidir por nós", slug: "quando-a-ferramenta-comeca-a-decidir-por-nos", date: "6 de julho", readingTimeMinutes: 10, category: "Tecnologia" }
        ]
      },
      {
        monthName: "Junho",
        articles: [
          { title: "Cinco livros que mudaram minha forma de trabalhar", slug: "cinco-livros-que-mudaram-minha-forma-de-trabalhar", date: "29 de junho", readingTimeMinutes: 6, category: "Livros" },
          { title: "A coragem de mudar de opinião", slug: "a-coragem-de-mudar-de-opiniao", date: "20 de junho", readingTimeMinutes: 4, category: "Vida pessoal" },
          { title: "O ritmo das estações e o trabalho criativo", slug: "o-ritmo-das-estacoes-e-o-trabalho-criativo", date: "10 de junho", readingTimeMinutes: 7, category: "Comportamento" },
          { title: "Por que voltei a escrever em cadernos de papel", slug: "por-que-voltei-a-escrever-em-cadernos-de-papel", date: "2 de junho", readingTimeMinutes: 6, category: "Criatividade" }
        ]
      },
      {
        monthName: "Maio",
        articles: [
          { title: "A armadilha das otimizações infinitas", slug: "a-armadilha-das-otimizacoes-infinitas", date: "20 de maio", readingTimeMinutes: 9, category: "Tecnologia" },
          { title: "O valor de fazer menos", slug: "o-valor-de-fazer-menos", date: "11 de maio", readingTimeMinutes: 5, category: "Reflexões" }
        ]
      }
    ]
  },
  {
    year: 2025,
    months: [
      {
        monthName: "Dezembro",
        articles: [
          { title: "Silêncio urbano e higiene mental", slug: "nem-toda-pausa-e-perda-de-tempo", date: "15 de dezembro", readingTimeMinutes: 6, category: "Reflexões" },
          { title: "O ano das leituras não terminadas", slug: "cinco-livros-que-mudaram-minha-forma-de-trabalhar", date: "4 de dezembro", readingTimeMinutes: 7, category: "Livros" }
        ]
      },
      {
        monthName: "Novembro",
        articles: [
          { title: "Design de vida sem algoritmos", slug: "quando-a-ferramenta-comeca-a-decidir-por-nos", date: "18 de novembro", readingTimeMinutes: 8, category: "Tecnologia" }
        ]
      }
    ]
  }
];

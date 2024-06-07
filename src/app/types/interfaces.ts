export interface materia {
  materiaId: number;
  materiaName: string;
}

export interface contExtra {
  ContExtraId: string;
  titulo: string;
  tipoConteudo: string;
  Descricao: string;
  videoUrl: string
  materia: string
  professor: string
}
export interface UpdateConteudoExtra {
  conteudo: string | null;
  titulo: string | null;
  videoUrl: string | null;
  descricao: string | null;
}

export interface Atividade {
  idAtividade: string;
  titulo: string;
  tipoAtividade: number;
  enunciado: string;
  questoes: string | null;
  resposta: string | null;
  professor: string;
  materia: string;
  data: string
}
export interface AtividadeCadastro {
  titulo: string;
  tipoAtividade: string;
  enunciado: string | null;
  questoes: string | null;
  resposta: string | null;
  professor: string;
  materia: string;
}

export interface AtividadeUpdate {
  idAtividade: string;
  titulo: string | null;
  enunciado: string | null;
  questoes: string | null;
  resposta: string | null
}
export interface atividadeResponse {
  resposta: string;
  usuario: number;
}

export interface userLogin {
  login: string;
  senha: string;
}

export interface UserResponse {
  sub: string;
  iss: string;
  role: number
  id: number;
  exp: number;
}

export interface Usuario {
  id: number;
  login: string;
  role: string;
  materia: string | null;
  disponibilidade: boolean;
}

export interface CadastroUserAnalise {
  login: string;
  senha: string;
  motivo: string;
  tipoUsuario: string;
  materia: string | null;
}

export interface UserAnalise {
  id: number;
  login: string;
  tipoUsuario: string;
  materia: string | null;
  motivo: string;
}
export interface Feedback {
  atividade: string;
  experiencia: string;
  opiniao: string;
  user: number;
}

export interface FeedBackResponse {
  idFeedback: string;
  opiniao: string;
  experiencia: string;
  usuario: string;
}

export interface UpdateFeedBack {
  opiniao: string | null;
  experiencia: string | null;
}

export interface NotaPostUpdate {
  nota: number;
  avaliador: number;
}

export interface NotaBusca {
  idNota: number;
  titulo: string;
  materia: string;
  enunciado: string;
  questoes: string | null;
  respostaDoAluno: string;
  respostaCerta: string | null;
  aluno: string;
  professor: string;
  nota: number
}

export interface RespostaAtividadeResolvida {
  idResposta: string,
  atividade: string,
  tipoDeAtividade: string
  materia: string,
  enunciado: string,
  questoes: string;
  resposta: string,
  respostaCerta: string,
  usuario: string,
}

export interface DatasAtividades {
  data: string;
  dia: number;
  mes: number;
  ano: number;
}

export interface DatasAtividadesSender {
  diaInit: number;
  diaFim: number;
  mesInicial: number;
  mesFinal: number;
  anoBusca: number;
}


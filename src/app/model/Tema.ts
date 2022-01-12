import { Postagem } from "./Postagem"

export class Tema {
  public id: number
  public tipo: string
  public descricao: string
  public segmento: string
  public postagem: Postagem[]
}

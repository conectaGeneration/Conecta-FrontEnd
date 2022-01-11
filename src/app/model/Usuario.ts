import { Postagem } from './Postagem';

export class Usuario {
  public id: number;
  public nome: string;
  public email: string;
  public senha: string;
  public foto: string;
  public tipo: string;
  public contato: string;
  public sobre: string;
  public cargo: string;
  public postagem: Postagem[];
}

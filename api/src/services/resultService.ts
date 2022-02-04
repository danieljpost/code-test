import { startConnection } from '../lib/mysql';
import { RowDataPacket } from "mysql2"
export interface UnrankedResult extends RowDataPacket {
  bib: string
  name: string
  time: number
}

export type RankedResult = UnrankedResult & {
  rank: number
}

export interface IResultService {
  addResult(result: UnrankedResult): Promise<void>
  getRanked(): Promise<RankedResult[]>
}

const UNRANKED_RESULTS = Array.from(
  new Array(
    Math.round(Math.random() * 10) + 1
  )
    .keys()
).map<any>((_, index) => ({
  bib: `B${index + 100}`,
  name: `Person #${index}`,
  time: Math.round(Math.random() * 1000000),
}))

export default class ResultService implements IResultService {

  async addResult(result: UnrankedResult): Promise<void> {
    UNRANKED_RESULTS.push(result);
    const connection = await startConnection();
    await connection.query(`INSERT INTO results (bib, name, time) VALUES (${result.bib}, ${result.name}, ${result.time})`);
  }

  async getRanked(): Promise<RankedResult[]> {
    let ranked = [];

    const connection = await startConnection();
    const [results] = await connection.query<UnrankedResult[]>("SELECT * FROM results");
    
    ranked.push(...results);

    ranked.sort((a, b) => a.time < b.time
      ? -1
      : a.time > b.time
        ? 1
        : 0
    );

    return ranked.map<RankedResult>((x, i) => ({
      ...x,
      rank: i + 1
    }));
  }

}
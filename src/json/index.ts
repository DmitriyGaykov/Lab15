import {readFile, writeFile} from 'fs/promises';
import Contact from "../models/contact";

export const FILENAME: string = 'src/json/data.json';

export async function readData(): Promise<Contact[]> {
  try {
    return JSON.parse(await readFile(FILENAME, {encoding: 'utf-8'}));
  } catch (e) {
    console.log(e)
    return [];
  }
}

export async function setData(data: Contact[]): Promise<void> {
  return writeFile(FILENAME, JSON.stringify(data));
}
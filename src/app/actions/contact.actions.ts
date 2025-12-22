'use server';
import fs from 'fs';
import path from 'path';

const CONTACT_PATH = path.join(process.cwd(), 'public/contact/contact.json');
// READ
export async function getContacts() {
  try {
    if (!fs.existsSync(CONTACT_PATH)) return [];
    const data = fs.readFileSync(CONTACT_PATH, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (error) {
    console.error(error);
    return [];
  }
}
// CREATE
export async function createContact(payload: any) {
  try {
    let contacts = [];
    if (fs.existsSync(CONTACT_PATH)) {
      contacts = JSON.parse(fs.readFileSync(CONTACT_PATH, 'utf-8') || '[]');
    }
    contacts.push(payload);

    fs.mkdirSync(path.dirname(CONTACT_PATH), { recursive: true });
    fs.writeFileSync(CONTACT_PATH, JSON.stringify(contacts, null, 2));
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
// DELETE
export async function deleteContact(id: number) {
  try {
    const contacts = JSON.parse(fs.readFileSync(CONTACT_PATH, 'utf-8') || '[]');
    const updated = contacts.filter((item: any) => item.id !== id);

    fs.writeFileSync(CONTACT_PATH, JSON.stringify(updated, null, 2));
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

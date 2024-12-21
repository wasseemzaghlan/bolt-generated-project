import { ROUTES } from './routes';

export function getQuestionEditPath(questionId: string): string {
  return ROUTES.SETUP.QUESTIONS.EDIT(questionId);
}

export function isDefaultQuestionId(id: string): boolean {
  return id === 'default';
}

export function isValidQuestionPath(path: string[]): boolean {
  if (path.length !== 2) return false;
  const [action] = path;
  return action === 'edit' || action === 'new';
}

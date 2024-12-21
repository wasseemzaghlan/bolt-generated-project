"use client";

export const ROUTES = {
  HOME: "/",
  CALENDAR: "/calendar",
  EXAM: {
    ROOT: "/exam",
    INTRODUCTION: "/exam/introduction",
    HISTORY: "/exam/history",
  },
  SETUP: {
    ROOT: "/setup",
    EXAMS: {
      ROOT: "/setup/exams",
      NEW: "/setup/exams/new",
      EDIT: (id: string) => `/setup/exams/edit/${id}`,
      PREVIEW: (id: string) => `/setup/exams/preview/${id}`
    },
    QUESTIONS: {
      ROOT: "/setup/questions",
      NEW: "/setup/questions/new",
      EDIT: (id: string) => `/setup/questions/edit/${id}`,
      PREVIEW: (id: string) => `/setup/questions/preview/${id}`
    },
    REGIONS: {
      ROOT: "/setup/regions",
      NEW: "/setup/regions/new",
      EDIT: (id: string) => `/setup/regions/edit/${id}`
    },
    SUBJECTS: {
      ROOT: "/setup/subjects",
      NEW: "/setup/subjects/new",
      EDIT: (id: string) => `/setup/subjects/edit/${id}`
    }
  },
  SETTINGS: "/settings",
  HELP: "/help"
} as const;

// Helper function to get route with params
export function getRoute(route: string | ((id: string) => string), id?: string): string {
  if (typeof route === "function" && id) {
    return route(id);
  }
  return route;
}

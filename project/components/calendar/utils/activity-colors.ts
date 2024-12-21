"use client";

export const activityTypeConfig = {
  study: {
    gradient: "bg-gradient-to-br from-blue-50/80 to-blue-100/50 dark:from-blue-900/30 dark:to-blue-800/20",
    hoverGradient: "hover:from-blue-100/80 hover:to-blue-200/50 dark:hover:from-blue-800/40 dark:hover:to-blue-700/30",
    text: "text-blue-800 dark:text-blue-200",
    border: "border-blue-200/50 dark:border-blue-700/50",
    icon: "text-blue-600 dark:text-blue-400",
    badge: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    title: "Study Session",
    headerBg: "bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-900/40 dark:to-blue-800/30",
    cellBg: "bg-gradient-to-br from-blue-50/40 to-blue-100/30 dark:from-blue-900/20 dark:to-blue-800/10"
  },
  exam: {
    gradient: "bg-gradient-to-br from-purple-50/80 to-purple-100/50 dark:from-purple-900/30 dark:to-purple-800/20",
    hoverGradient: "hover:from-purple-100/80 hover:to-purple-200/50 dark:hover:from-purple-800/40 dark:hover:to-purple-700/30",
    text: "text-purple-800 dark:text-purple-200",
    border: "border-purple-200/50 dark:border-purple-700/50",
    icon: "text-purple-600 dark:text-purple-400",
    badge: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    title: "Exam",
    headerBg: "bg-gradient-to-r from-purple-50 to-purple-100/50 dark:from-purple-900/40 dark:to-purple-800/30",
    cellBg: "bg-gradient-to-br from-purple-50/40 to-purple-100/30 dark:from-purple-900/20 dark:to-purple-800/10"
  },
  practice: {
    gradient: "bg-gradient-to-br from-green-50/80 to-green-100/50 dark:from-green-900/30 dark:to-green-800/20",
    hoverGradient: "hover:from-green-100/80 hover:to-green-200/50 dark:hover:from-green-800/40 dark:hover:to-green-700/30",
    text: "text-green-800 dark:text-green-200",
    border: "border-green-200/50 dark:border-green-700/50",
    icon: "text-green-600 dark:text-green-400",
    badge: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    title: "Practice",
    headerBg: "bg-gradient-to-r from-green-50 to-green-100/50 dark:from-green-900/40 dark:to-green-800/30",
    cellBg: "bg-gradient-to-br from-green-50/40 to-green-100/30 dark:from-green-900/20 dark:to-green-800/10"
  },
  other: {
    gradient: "bg-gradient-to-br from-orange-50/80 to-orange-100/50 dark:from-orange-900/30 dark:to-orange-800/20",
    hoverGradient: "hover:from-orange-100/80 hover:to-orange-200/50 dark:hover:from-orange-800/40 dark:hover:to-orange-700/30",
    text: "text-orange-800 dark:text-orange-200",
    border: "border-orange-200/50 dark:border-orange-700/50",
    icon: "text-orange-600 dark:text-orange-400",
    badge: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    title: "Other",
    headerBg: "bg-gradient-to-r from-orange-50 to-orange-100/50 dark:from-orange-900/40 dark:to-orange-800/30",
    cellBg: "bg-gradient-to-br from-orange-50/40 to-orange-100/30 dark:from-orange-900/20 dark:to-orange-800/10"
  }
} as const;

export function getActivityColors(type: keyof typeof activityTypeConfig) {
  return activityTypeConfig[type] || activityTypeConfig.other;
}

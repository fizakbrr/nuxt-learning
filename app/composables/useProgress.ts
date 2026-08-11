// Lesson 1-12 used useState() for in-memory progress.
// Lesson 1-13 swaps to VueUse's useLocalStorage so progress survives reloads.
export const useProgress = () => {
  const completed = useLocalStorage<string[]>('nuxt-course-progress', [])

  const isComplete = (lessonSlug: string) => completed.value.includes(lessonSlug)

  const toggleComplete = (lessonSlug: string) => {
    if (isComplete(lessonSlug)) {
      completed.value = completed.value.filter((slug) => slug !== lessonSlug)
    } else {
      completed.value = [...completed.value, lessonSlug]
    }
  }

  return { completed, isComplete, toggleComplete }
}

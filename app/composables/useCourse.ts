import course from '~/data/course.json'

export interface Lesson {
  slug: string
  title: string
  description: string
  videoId: number
}

export interface Chapter {
  slug: string
  title: string
  lessons: Lesson[]
}

export const useCourse = () => {
  const chapters = course as Chapter[]

  const getChapter = (chapterSlug: string) =>
    chapters.find((c) => c.slug === chapterSlug)

  const getLesson = (chapterSlug: string, lessonSlug: string) =>
    getChapter(chapterSlug)?.lessons.find((l) => l.slug === lessonSlug)

  return { chapters, getChapter, getLesson }
}

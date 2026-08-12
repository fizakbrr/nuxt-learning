export const useCategories = () => useFetchWithCache<CategoryMeta[]>('/api/categories')

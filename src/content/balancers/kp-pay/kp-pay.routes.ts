export const KiniopoiskTgRoutes = {
  movie: (kinopoiskId: number) => `v1.4/movie/${kinopoiskId}`,
  staffInfo: (staffId: number) => `v1.4/person/${staffId}`,
  movieStaff: (kinopoiskId: number) => `v1.4/movie/${kinopoiskId}`,
}

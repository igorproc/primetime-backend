export const KinopoiskUnnoficialRoutes = {
  movie: (kinopoiskId: number) => `v2.2/films/${kinopoiskId}`,
  staffInfo: (staffId: number) => `v1/staff/${staffId}`,
  movieStaff: (kinopoiskId: number) => `v1/staff?filmId=${kinopoiskId}`
}

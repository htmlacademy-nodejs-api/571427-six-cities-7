export type TUndefined<T> = T | undefined;

// TODO: для моков добавляю tuple, потом по идее с реальными данными уйдет
// TCoords оставляю для парсинга
export type TCoordsTuple = [number, number];

export type TCoords = {
  latitude: number;
  longitude: number;
};

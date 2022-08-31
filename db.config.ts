export const config = {
  type: 'sqlite',
  database: 'sqlite-data',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: true
};

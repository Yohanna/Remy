export interface Metrics {
  user_id: number,
  prefered_price: number,
  prefered_transportation_method: string,
  history: any[],
  favorite_restaurants: any[],
  favorite_food: string[]
}

export interface SearchResult {
  user_id: number,
  restaurants_list: object,
  timestamp: string
}

export interface UserAction {
  user_id: number,
  timestamp: string
}
export interface Metrics {
  user_id: number,
  prefered_price: number,
  prefered_transportation_method: string,
  history: any[],
  favorite_restaurants: any[],
  favorite_food: string[]
}

export interface RecentSearch {
  user_id: number,
  restaurants: { [index: number]: { restaurant_id: number, restaurant_rank: number } },
  timestamp: string
}

export interface UserAction {
  user_id: number,
  timestamp: string
}
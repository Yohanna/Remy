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
  restaurants: { [index: number]: { restaurant_id: number, restaurant_rank: number } }
}

export interface UserActions {
  user_id: number,
  restaurant_id: number,
  action: "click" | "directions" | "more_info",
  timestamp: Date
}

export interface UserResults {
  user_id: number,
  restaurant_id: number,
  restaurant_rank: number,
  timestamp: Date
}
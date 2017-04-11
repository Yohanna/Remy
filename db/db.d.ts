export interface LoginInfo {
  email: string,
  password: string
}

export interface User extends LoginInfo {
  name: string,
  gender: string,
  student: boolean
}


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
  search_results: { [index: number]: { restaurant_details: Object, restaurant_rank: number } },
  timestamp: Date
}

export interface UserAction {
  user_id: number,
  restaurant_id: string,
  action: "click" | "directions" | "more_info",
  timestamp: Date
}

export interface UserResult {
  user_id: number,
  restaurant_id: number,
  restaurant_rank: number,
  timestamp: Date
}

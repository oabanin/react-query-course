import InfiniteScroll from "react-infinite-scroller";
import { Person } from "./Person";
import {useInfiniteQuery} from "react-query";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const {data, fetchNextPage, hasNextPage, isLoading, isError, error} = useInfiniteQuery("sw-people",
      ({pageParam = initialUrl})=> fetchUrl(pageParam), {getNextPageParam: (lastPageData, allPages) => {
        return lastPageData.next || undefined;
        }})
  // TODO: get data for InfiniteScroll via React Query
    if(isLoading) return "Loading";
    if(isError) return <div>Error{error.toString()}</div>

    return <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage} >{data && data.pages.map(pageData=>pageData.results.map(person =>
        <Person key={person.name} name={person.name} hairColor={person.hair_color} eyeColor={person.eye_color}/> ))}</InfiniteScroll>;
}

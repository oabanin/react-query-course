import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import {useInfiniteQuery} from "react-query";
import {Person} from "../people/Person";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {data, fetchNextPage, hasNextPage, isLoading, isError, error} = useInfiniteQuery("sw-species",
      ({pageParam = initialUrl})=> fetchUrl(pageParam), {getNextPageParam: (lastPageData, allPages) => {
          return lastPageData.next || undefined;
        }})
  if(isLoading) return "Loading";
  if(isError) return <div>Error{error.toString()}</div>

  return <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage} >
      {data && data.pages.map(pageData=>pageData.results.map(person =>
      <Species key={person.name} name={person.name} language={person.language} averageLifespan={person.average_lifespan}/> ))}
  </InfiniteScroll>;
}

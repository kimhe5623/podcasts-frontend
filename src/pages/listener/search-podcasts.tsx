import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { Podcast } from '../../components/podcast';
import { PODCAST_FRAGMENT } from '../../fragments';
import { searchPodcastsQuery, searchPodcastsQueryVariables } from '../../__generated__/searchPodcastsQuery';
import { Pagination } from '../../components/pagination';
import { SearchFor } from '../../__generated__/globalTypes';
import { TITLE } from '../../constants';
import { GetAllPodcasts } from '../../hooks/getAllPodcasts';
import { GetCategories } from '../../hooks/getCategories';

const SEARCH_PODCASTS_QUERY = gql`
  query searchPodcastsQuery(
    $input: SearchPodcastsInput!
  ) {
    searchPodcasts(input: $input) {
      ok
      error
      totalPages
      totalCount
      podcasts {
        ...PodcastParts
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;

interface IFormProps {
  searchTerm: string;
}

interface ISuggestion {
  id: number;
  title: string;
}

interface IStateProps {
  value: string;
  data: ISuggestion[];
}

export const SearchPodcasts = () => {
  const { register, handleSubmit, getValues, setValue } = useForm<IFormProps>()
  const categoriesData = GetCategories();
  const podcastsData = GetAllPodcasts();
  const podcasts: ISuggestion[] = podcastsData.data?.getAllPodcasts.podcasts ? podcastsData.data?.getAllPodcasts.podcasts : [];

  const initState: IStateProps = { value: '', data: [] };
  const [suggestions, setSuggestions] = useState(initState);
  const [isFocusSearchInput, setIsFocusSearchInput] = useState(false);
  const [categorySlug, setCategorySlug] = useState("");

  const getSuggestionData = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : podcasts?.filter(
      podcast => podcast.title.toLowerCase().slice(0, inputLength) === inputValue
    );
  }

  document.addEventListener("click", (ev) => {
    let isFocusedOut = true;
    document.getElementsByName("suggestion").forEach((element) => {
      isFocusedOut = isFocusedOut && element !== ev.target
    })
    isFocusedOut = isFocusedOut && ev.target !== document.getElementById("searchInput")
    if (isFocusedOut) {
      setIsFocusSearchInput(false);
    }
  })

  const onChange = () => {
    const newValue = getValues("searchTerm");
    setSuggestions({
      value: newValue,
      data: getSuggestionData(newValue)
    });
  }

  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    setPage(1);
    loadPage(searchTerm, 1, categorySlug);
    history.push({
      pathname: "/search",
      search: `?term=${searchTerm}${categorySlug && "&cat="+ categorySlug}`
    });
  }

  const onCategoryClick = (catSlug: string) => {
    const { searchTerm } = getValues();
    setCategorySlug(catSlug);
    setPage(1);
    loadPage(searchTerm, 1, catSlug);
    history.push({
      pathname: "/search",
      search: `?term=${searchTerm}&cat=${catSlug}`
    });
  }

  const [page, setPage] = useState(1);
  const onNextPageClick = () => {
    loadPage(getValues().searchTerm, page + 1, categorySlug);
    setPage(current => current + 1);
  }
  const onPrevPageClick = () => {
    loadPage(getValues().searchTerm, page - 1, categorySlug);
    setPage(current => current - 1);
  }

  const location = useLocation();
  const history = useHistory();
  const [callQuery, { loading, data }] = useLazyQuery<
    searchPodcastsQuery,
    searchPodcastsQueryVariables
  >(SEARCH_PODCASTS_QUERY);

  const loadPage = (searchTerm: string, queryPage: number, categorySlug: string) => {
    if (!searchTerm || searchTerm === "") {
      searchTerm = "";
    }
    setValue("searchTerm", searchTerm);
    callQuery({
      variables: {
        input: {
          searchFor: SearchFor.Any,
          page: queryPage,
          titleQuery: searchTerm,
          ...(categorySlug !== "" && categorySlug !== "all" && { categorySlug })
        }
      }
    });
  }

  useEffect(() => {
    const params = location.search.split("?term=")[1].split("&cat=");
    const categorySlug = params.length === 2 ? params[1] : "";
    loadPage(params[0], page, categorySlug);
  }, [history, loading]);

  return (
    <div>
      <Helmet>
        <title>Search | {`${TITLE}`}</title>
      </Helmet>
      <div className="flex sm:flex-row flex-col w-full px-5 2xl:px-0 max-w-screen-xl mx-auto justify-between">
        <aside className="flex flex-col justify-between w-full md:w-4/12 min-w-min">
          <div className=" sticky top-0">
            <div className="w-full py-4 flex flex-col">
              <div className="text-lg font-bold mx-4">"{getValues().searchTerm}"</div>
              <div className="text-sm font-light mx-4">{data?.searchPodcasts.totalCount} Podcasts</div>
            </div>
            <form
              onSubmit={handleSubmit(onSearchSubmit)}
              className="w-full pt-3 pb-6 flex justify-center items-center">
              <input
                id="searchInput"
                ref={register()}
                name="searchTerm"
                type="Search"
                onChange={onChange}
                onClick={() => { setIsFocusSearchInput(true) }}
                autoComplete="off"
                className="input border-2 border-gray-200 focus:border-gray-400 rounded-md w-full mx-4"
                placeholder="Search Podcasts..."
              />
              {
                isFocusSearchInput &&
                suggestions.value &&
                suggestions.data && (
                  <div className="absolute top-36 w-10/12 text-lg max-h-96 overflow-y-auto">
                    {
                      suggestions.data.map((suggestion) => (
                        <div
                          id="suggestion"
                          key={suggestion.id}
                          onClick={(e) => {
                            setValue("searchTerm", suggestion.title);
                            setSuggestions({
                              value: "",
                              data: []
                            });
                            onSearchSubmit();
                          }}
                          className=" p-2 cursor-pointer bg-white border-2 border-t-0 border-gray-300 hover:bg-violet-100">
                          {suggestion.title}
                        </div>
                      ))
                    }
                  </div>
                )
              }
            </form>
            <div className="py-4 mx-4 border-t border-gray-300">
              <div className="text-xl font-medium mb-2">
                Categories
              </div>
              <div className="grid grid-flow-row gap-2">
                <div
                  className={`text-md cursor-pointer hover:text-violet-700 ${categorySlug === "all" && "font-semibold"}`}
                  onClick={()=> {onCategoryClick("all")}}
                >
                  &gt; All
                </div>
                {
                  categoriesData.data?.getCategories.categories?.map((category) => (
                    <div
                      className={`text-md cursor-pointer hover:text-violet-700 ${categorySlug === category.slug && "font-semibold"}`}
                      key={category.id}
                      onClick={() => {onCategoryClick(category.slug)}}
                    >
                      &gt; {category.name}
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </aside>
        <div className="w-full p-4">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-5 gap-y-10">
            {data?.searchPodcasts.podcasts?.map((podcast) => (
              <Podcast
                key={podcast.id}
                id={podcast.id + ''}
                coverImage={podcast.coverImage}
                title={podcast.title}
                hostId={podcast.host?.id}
                categoryName={podcast.category?.name}
              />
            ))}
          </div>
          <Pagination
            className="mt-10 pb-20"
            onPrevPageClick={onPrevPageClick}
            onNextPageClick={onNextPageClick}
            currentPage={page}
            totalPages={data?.searchPodcasts.totalPages}
          />
        </div>
      </div>
    </div>
  );
}
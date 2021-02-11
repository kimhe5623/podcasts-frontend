import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { GetAllPodcasts } from '../hooks/getAllPodcasts';



interface ISearchBarProps {
  className?: string;
  placeholder?: string;
}

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

export const SearchBar: React.FC<ISearchBarProps> = () => {
  const { register, handleSubmit, getValues, setValue } = useForm<IFormProps>();
  const history = useHistory();
  const podcastsData = GetAllPodcasts();
  const podcasts: ISuggestion[] = podcastsData.data?.getAllPodcasts.podcasts ? podcastsData.data?.getAllPodcasts.podcasts : [];

  const initState: IStateProps = { value: '', data: [] };
  const [suggestions, setSuggestions] = useState(initState);
  const [isFocusSearchInput, setIsFocusSearchInput] = useState(false);

  const getSuggestionData = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : podcasts?.filter(
      podcast => podcast.title.toLowerCase().slice(0, inputLength) === inputValue
    );
  }

  document.addEventListener("click", (ev) => {
    let isFocusedOut  = true;
    document.getElementsByName("suggestion").forEach((element) => {
      isFocusedOut = isFocusedOut && element !== ev.target
    })
    isFocusedOut = isFocusedOut && ev.target !== document.getElementById("searchInput")
    if(isFocusedOut) {
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
    if (searchTerm !== "") {
      history.push({
        pathname: "/search",
        search: `?term=${searchTerm}`
      });
    }
  };

  return (
    <form
      className="w-full py-10 flex justify-center items-center"
      onSubmit={handleSubmit(onSearchSubmit)}>
      <div className="flex flex-col w-2/3 md:w-5/12">
        <input
          id="searchInput"
          ref={register({ required: true })}
          name="searchTerm"
          type="Search"
          className="input border-0 rounded-md"
          placeholder="Search Podcasts..."
          onChange={onChange}
          onClick={() => {setIsFocusSearchInput(true)}}
          autoComplete="off"
        />
        {
          isFocusSearchInput &&
          suggestions.value &&
          suggestions.data && (
            <div className="absolute top-1/4 w-2/3 md:w-5/12 text-lg max-h-96 overflow-y-auto">
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
      </div>
      <button
        className="text-white text-3xl ml-4 focus:outline-none focus:text-opacity-70"
        type="submit">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
};
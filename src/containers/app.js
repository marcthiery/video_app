import React from 'react';
import SearchBar from '../components/search-bar';
import VideoList from './video-list';
import VideoDetail from '../components/video-detail';
import Video from '../components/video';
import axios from 'axios';

const API_END_POINT = 'https://api.themoviedb.org/3/discover/movie';
const POPULAR_MOVIES_URL =
  'language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images';
const API_KEY = 'api_key=d0962e7f726882d5f0ad70a1953215f7';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList: {},
      currentMovie: {}
    };
  }
  componentWillMount() {
    this.initMovies();
  }

  initMovies() {
    axios.get(`${API_END_POINT}?${API_KEY}&${POPULAR_MOVIES_URL}`).then(
      function(response) {
        this.setState(
          {
            movieList: response.data.results.slice(1, 6),
            currentMovie: response.data.results[0]
          },
          function() {
            this.applyVideoToCurrentMovie();
          }
        );
      }.bind(this)
    );
  }

  applyVideoToCurrentMovie() {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${
          this.state.currentMovie.id
        }?${API_KEY}&append_to_response=videos&include_adult=false`
      )
      .then(
        function(response) {
          const youtubeKey = response.data.videos.results[0].key;
          let newCurrentMovieState = this.state.currentMovie;
          newCurrentMovieState.videoId = youtubeKey;
          this.setState({ currentMovie: newCurrentMovieState });
          console.log(newCurrentMovieState);
        }.bind(this)
      );
  }

  onClickListItem(movie) {
    this.setState({ currentMovie: movie }, function() {
      this.applyVideoToCurrentMovie();
    });
  }

  onClickSearch(searchText) {
    console.log(searchText);
  }
  render() {
    const renderVideoList = () => {
      if (this.state.movieList.length >= 5) {
        return (
          <VideoList
            movieList={this.state.movieList}
            callback={this.onClickListItem.bind(this)}
          />
        );
      }
    };
    return (
      <div>
        <div className="search_bar" />
        <div className="row">
          <div className="col-md-8">
            <Video videoId={this.state.currentMovie.videoId} />
            <VideoDetail
              title={this.state.currentMovie.title}
              description={this.state.currentMovie.overview}
            />
          </div>
          <div className="col-md-4">{renderVideoList()};</div>
        </div>
      </div>
    );
  }
}

export default App;

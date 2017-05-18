var NativeInput = React.createClass({
  getInitialState: function() {
    return {
      value: null
    };
  },

  render: function() {
    return (
      <input type="text" value={this.state.value} onChange={this.handleChange} />
    );
  },

  handleChange: function(e) {
    this.setState({
      value: e.target.value
    });

    if (this.props.hasOwnProperty('onChange')) {
      this.props.onChange(e.target.value);
    }
  }
});

var SearchInput = React.createClass({
  render: function() {
    return (
      <div className="search-input">
        <NativeInput onChange={this.handleChange} />
        <button onClick={this.handleResult}>Search Movie</button>
      </div>
    );
  },
  getInitialState: function() {
    return {
      term: null
    }
  },
  handleChange: function(term) {
    this.setState({
      term: term
    });
  },
  handleResult: function() {
    this.props.onClick(this.state.term);
  }


});

var SearchResultList = React.createClass({
  render: function() {
    return (
      <div className="search-output">
        {this.props.results.map(function(result) {
          if(result.totalResults ==0 || result.totalResults ==undefined) {
              return (
                  <div key={result.imdbID} className="result">
                    <img src={result.Poster !=null ? result.Poster: result.Poster.thumbnail}></img>
                    <div className="content">
                      <h4>Movie Name: {result.Title}</h4>
                      <p >Short Description:{result.Plot}</p>
                      <p>Actors:{result.Actors}</p>
                      <p>Release Date:{result.Released}</p>
                    </div>
                  </div>
              );
          }
          else
          {
              return(
             <div > {(()=>{
                 let container =[];
                 for(var i = 0; i < result.Search.length; ++i){
                     container.push(<img src={result.Search[i].Poster !=null ? result.Search[i].Poster: result.Search[i].Poster.thumbnail}></img>)
                     container.push(<h4 key={i}>Movie Name: {result.Search[i].Title}</h4>)
                     container.push(<p>Year:{result.Search[i].Year}</p>)
                     container.push(<div className="content"></div>)
                   };
                 return container;
             })()}
             </div>
          )
          }
        })}
      </div>
    );
  }
});

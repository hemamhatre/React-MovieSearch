class NativeInput extends React.Component{
    constructor(props, context) {
        super(props, context);

        this.state = {
            value: null
        };
    };

  render() {
    return (
      <input type="text" value={this.state.value} onChange={() => this.handleChange()} />
    );
  }

  handleChange (e) {
    this.setState({ value: e.target.value });

    if (this.props.hasOwnProperty('onChange')) {
      this.props.onChange(e.target.value);
    }
  }
}

class SearchInput extends React.Component{
  render() {
    return (
      <div className="search-input">
        <NativeInput onChange={this.handleChange} />
        <button onClick={this.handleResult}>Search Movie</button>
      </div>
    );
  }
    constructor(props, context) {
        super(props, context);

        this.state = {
            term: null
        };
    };

  handleChange(term) {
    this.setState({
      term: term
    });
  }
  handleResult() {
    this.props.onClick(this.state.term);
  }


}

class SearchResultList extends React.Component{
  render() {
    return (
      <div className="search-output">
        {this.props.results.map(function(result) {
          if(result.totalResults ==0 || result.totalResults ==undefined) {
              return (
                  <div key={result.imdbID} className="result">
                    <img src={result.Poster !=null ? result.Poster: null}></img>
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
                     container.push(<img src={result.Search[i].Poster !=null ? result.Search[i].Poster: null}></img>)
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
}


var App = React.createClass({
  getInitialState: function() {
    return {
      result: []
    };
  },
  render: function() {
    return (
      <div>
        <SearchInput onClick={this.handleResult} />
        <SearchResultList results={this.state.result} />
      </div>
    );
  },
  /** searchInput-component */
  handleResult: function(term) {


      var updateResult = function (response, textStatus, jqXHR) {

          this.setState({
              result: (response instanceof Array) ? response : [response]
          });
      }.bind(this);

       var typeRequestURL ;
      if (term != null) {
          if (hasNumbers(term))
                  typeRequestURL ='https://www.omdbapi.com/?i=' + term + '&plot=full&r=json&tomatoes=true'
          else
                  typeRequestURL= 'https://www.omdbapi.com/?s='+term/** direct api call to fetch list */
      }
      else
          typeRequestURL = 'https://www.omdbapi.com/?s=transformer'
          /** direct api call to fetch list */

      console.log(typeRequestURL);
      $.ajax({
          method: 'GET',
          url: typeRequestURL,
          success: updateResult
      });

  }

});

function hasNumbers(t)
{
    return /\d/.test(t);
}

React.render(<App />, document.getElementById('main-container'));

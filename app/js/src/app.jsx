
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

      if (term != null) {
          if (hasNumbers(term)) {
              $.ajax({
                  method: 'GET',
                  url: 'https://www.omdbapi.com/?i=' + term + '&plot=full&r=json&tomatoes=true',
                  success: updateResult
              });
          }
          else {
              $.ajax({
                  method: 'GET',
                  url: 'https://www.omdbapi.com/?s='+term,/** direct api call to fetch list */
                  success: updateResult
              });
          }
      }
      else
      {
          $.ajax({
              method: 'GET',
          url: 'https://www.omdbapi.com/?s=transformer',/** direct api call to fetch list */
          success: updateResult
          });
      }

  }

});

function hasNumbers(t)
{
    return /\d/.test(t);
}

React.render(<App />, document.getElementById('main-container'));

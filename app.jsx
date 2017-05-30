class  App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {result: []};
    }
    render() {
        return (
            <div>
                <SearchInput onClick={this.handleResult} />
                <SearchResultList results={this.state.result} />
            </div>
        );

    }
    /** searchInput-component */
    handleResult(term) {

        var updateResult = function (response, textStatus, jqXHR) {

            if(response.Response == "False")
                alert(response.Error + "  Please select appropriate movie...");

            this.setState({
                result: (response instanceof Array) ? response : [response]
            });
        }.bind(this);

        var typeRequestURL = null;
        if (term != null) {
            if (hasNumbers(term))
                typeRequestURL ='https://www.omdbapi.com/?i=' + term + '&plot=full&r=json'
            else
                typeRequestURL= 'https://www.omdbapi.com/?s='+term/** api call to fetch list */
        }
        else
            typeRequestURL = 'https://www.omdbapi.com/?i=tt0139654'
        /** by default  api call to fetch one specific  movie details on ComponentDidMount */

        $.ajax({
            method: 'GET',
            url: typeRequestURL,
            success: updateResult
        });

    }
    componentDidMount() {
        this.handleResult();
    }

}

function hasNumbers(t)
{
    return /\d/.test(t);
}

React.render(<App />, document.getElementById('main-container'));
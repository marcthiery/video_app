import React from 'react';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            placeHolder: "Tapez votre film"
        }
        this.handleChange = this.handleChange.bind(this);
    }
    render() {
        return( 
            <div className="row">
                <div className="input-group col-md-8">
                    <input type="text" className="form-control input-lg" onChange={ this.handleChange } placeholder={ this.state.placeHolder }/>
                    <span className="input-group-btn">
                        <button className="btn btn-secondary" onClick={this.handleOnClick.bind(this)}>Search</button>
                    </span>
                </div>
                
            </div>
        )
    }   

    handleChange(event) {
        this.setState({searchText: event.target.value});
    }

    handleOnClick(event) {
        console.log('click');
    }
};

export default SearchBar;
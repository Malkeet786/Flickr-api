import React, { Component } from 'react';
import './App.css';


class App extends Component {
  constructor(){
    super();
    this.state = {
      pictures: [],
      indexValue:0,
      textInput:'dog',
    };
  }

  componentDidMount(){
    this.ReloadImages();
  }
  ReloadImages=()=>{
    // alert(process.env.REACT_APP_API_KEY);
    fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+process.env.REACT_APP_API_KEY+'&tags='+this.state.textInput+'nyc&per_page=10&page=1&format=json&nojsoncallback=1')
    .then(function(response){
      return response.json();
    })
    .then(function(j){
      // alert(JSON.stringify(j));
      let picArray = j.photos.photo.map((pic) => {
        
        var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
        return(
          <img alt="dogs" className='pictureClass' src={srcPath}></img>
        )
      })
      this.setState({pictures: picArray});
    }.bind(this))
  }
  
  HandleChange=(e)=>{
    this.setState({textInput:e.target.value})
  }

  Delay=(function(){
    var timer=0;
    return function(callback,ms){
      clearTimeout(timer);
      timer=setTimeout(callback,ms);
    }
  })();

  render() {
    return (
      <div className="App">
      <div className='back'>
      <img src="data:image/png;base64,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" alt="" />
        <p><input className='textInput' 
        placeholder='🔍 Search free high Resolution Photos'
        onChange={this.HandleChange}
        onKeyUp={()=>this.Delay(function(){
          this.ReloadImages();
        }.bind(this),1000)}></input></p>
        <p className="App-intro">
        {/* <div>
          Picture #{this.state.indexValue}
        </div> */}
        <div>
        
        </div>

        </p>
        <div className='cont'>{this.state.pictures}</div>
        </div>
      </div>
    );
  }
}

export default App;

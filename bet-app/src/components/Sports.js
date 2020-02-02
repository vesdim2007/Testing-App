import React  from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getSports} from "../actions/sports"
import Spinner from "./Spinner/Spinner"


class Sports extends React.Component {

    state = {
        sports: [],
        sport_id: null,
        loading: false
    }

    componentDidMount() {
        this.setState({loading: true})
        this.props.getSports()
    }

    componentDidUpdate(prevProps) {
        if (this.props.sports !== prevProps.sports) {
          this.setState({sports: this.props.sports, loading: false})
        }
      }

    renderContent = () => {
        if (this.state.loading) {
            return (
                <div>
                    <Spinner/>
                </div>
            )
        }

        if (this.state.sports.length > 0) {
            return (
                <div>
                    <h3>Select a sport to see all the its events</h3>
                {this.state.sports.map(sport => (
                  <div key={sport.id} className="sport">
                    <div className="sport_column">
                      <p>Sport Name: {sport.desc}</p>
                    </div>
                    <div className="sport_column">
                        <p>Events: {sport.comp.length}</p>
                    </div>
                    <Link to={`/sports/${sport.id}`} className="btn">Select</Link>
                  
                  </div>))}
                </div>
            )
        }

        if (this.state.sports.length == 0) {
            return (
                <div>
                    <h3>There are no sports to display</h3>
                </div>
            )
        }
    }

    render() {
        const {sports} = this.state
        console.log(sports)
        return (
            <div className="sports">
              <h1> All Sports</h1>
              {this.renderContent()}
            </div>
          );
    }
}


const mapStateToProps = state => {
    return {
        sports: state.sports.sports
    }
}
  
export default connect (mapStateToProps, 
    {getSports})(Sports);
import React, { Component } from 'react';
import TripTile from '../components/TripTile';

class TripsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: []
    }
  }

  componentDidMount() {
    fetch('/api/v1/trips')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({ trips: body.trips });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let trips = this.state.trips.map(trip => {
      return(
        <TripTile
          key={trip.id}
          id={trip.id}
          name={trip.name}
          description={trip.description}
        />
      )
    })
  
    return(
      <div>
        <h1>Trips</h1>
        {trips}
      </div>
    )
  }
}

export default TripsContainer;